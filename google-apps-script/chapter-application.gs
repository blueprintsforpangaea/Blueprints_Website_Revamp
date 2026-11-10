/**
 * Chapter founder application → Google Sheet.
 *
 * The website's /apply/chapter form posts here. Each application
 * becomes one row in the sheet this script is attached to, and the
 * resume PDF is saved to a Drive folder with its link in the row.
 *
 * SET UP (once, about five minutes):
 *  1. Make a new Google Sheet in the expansion team's Drive, e.g.
 *     "Chapter Founder Applications".
 *  2. In the sheet: Extensions → Apps Script. Delete the starter
 *     code, paste this whole file, and save.
 *  3. Optional: change NOTIFY_EMAIL below (blank = no emails).
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     Click Deploy and approve the permissions (Sheets, Drive,
 *     and Gmail if you kept NOTIFY_EMAIL).
 *  5. Copy the Web app URL (ends in /exec) and paste it into
 *     CHAPTER_APPLICATION_URL in src/data/involvement.js.
 *
 * If you edit this script later, use Deploy → Manage deployments →
 * edit (pencil) → Version: New version, so the URL stays the same.
 */

const NOTIFY_EMAIL = 'expansion@b4pglobal.org';
const SHEET_NAME = 'Applications';
const RESUME_FOLDER_NAME = 'Chapter Founder Resumes';
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

// Column order in the sheet. Keys match the website's field names.
const COLUMNS = [
  ['submittedAt', 'Timestamp'],
  ['email', 'Email'],
  ['name', 'Name'],
  ['university', 'University Name and Location'],
  ['phone', 'Phone Number'],
  ['classStanding', 'Class Standing'],
  ['whyJoin', 'Why do you want to be a part of Blueprints For Pangaea? How would your involvement contribute to your personal and professional goals?'],
  ['whySuccessful', 'Why do you believe creating a Blueprints For Pangaea chapter at your university will be successful?'],
  ['partnerships', 'Potential partnerships in your community'],
  ['resume', 'Resume'],
  ['timeCommitments', 'Time commitments for the next two academic semesters'],
  ['heardAbout', 'How did you hear about us?'],
  ['anythingElse', 'Anything else?'],
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Spam trap: the website hides this field from people.
    if (data.website) return reply({ ok: true });

    const required = ['email', 'name', 'university', 'phone', 'classStanding',
      'whyJoin', 'whySuccessful', 'partnerships', 'timeCommitments', 'heardAbout'];
    const missing = required.filter((k) => !String(data[k] || '').trim());
    if (missing.length) return reply({ ok: false, error: 'Missing: ' + missing.join(', ') });
    if (!data.resume || !data.resume.base64) return reply({ ok: false, error: 'Missing resume' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      data.resume = saveResume(data);
      data.submittedAt = new Date();
      sheet().appendRow(COLUMNS.map(([key]) => clean(data[key])));
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: String(data.email),
        subject: 'Chapter founder application: ' + data.name + ' (' + data.university + ')',
        body: COLUMNS.map(([key, label]) => label + ':\n' + clean(data[key])).join('\n\n'),
      });
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(COLUMNS.map(([, label]) => label));
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setWrap(true);
  }
  return sh;
}

function saveResume(data) {
  const bytes = Utilities.base64Decode(data.resume.base64);
  if (bytes.length > MAX_RESUME_BYTES) throw new Error('Resume is over 5 MB');
  const safeName = String(data.name).replace(/[^\w .-]/g, '').trim() || 'Applicant';
  const blob = Utilities.newBlob(bytes, 'application/pdf', safeName + ' - Resume.pdf');
  return resumeFolder().createFile(blob).getUrl();
}

function resumeFolder() {
  // Keep resumes next to the sheet.
  const file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  const parent = file.getParents().hasNext() ? file.getParents().next() : DriveApp.getRootFolder();
  const found = parent.getFoldersByName(RESUME_FOLDER_NAME);
  return found.hasNext() ? found.next() : parent.createFolder(RESUME_FOLDER_NAME);
}

// Stop answers that start with = + - @ from running as formulas.
function clean(v) {
  if (v instanceof Date) return v;
  const s = String(v == null ? '' : v).slice(0, 10000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor to check the sheet and folder set up.
function testSetup() {
  sheet();
  Logger.log('Sheet ready. Resume folder: ' + resumeFolder().getUrl());
}
