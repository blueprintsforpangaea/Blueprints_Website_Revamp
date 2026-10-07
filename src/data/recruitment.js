// ============================================================
// Headquarters recruitment, one semester at a time. Update this
// file each semester; the Get Involved page renders it as is.
//
//   term     — the semester shown in the heading
//   open     — true while applications are being accepted
//   closedNote — shown in place of the apply button when open is false
//   applyUrl — the application form (shown only while open)
//   events   — in date order; `required` marks must-attend events
//
// Fall 2026 schedule is from blueprintsforpangaea.org/recruitment.
// ============================================================

export const RECRUITMENT = {
  term: 'Fall 2026',
  open: false,
  closedNote: 'Recruitment is closed for FA26. Come back during WN27.',
  applyUrl: '',
  eligibility: 'Open to University of Michigan students only.',
  events: [
    { name: 'Festifall', date: 'Sept. 2', time: '6–8 PM', place: 'Central Campus' },
    { name: 'Meet the Clubs', date: 'Sept. 8', time: '5:30–7:30 PM', place: 'Ross Winter Garden' },
    { name: 'Mass Meeting #1', date: 'Sept. 9', time: '7–8 PM', place: 'Forum Hall', note: 'Attend one mass meeting' },
    { name: 'Mass Meeting #2', date: 'Sept. 10', time: '6:30–7:30 PM', place: 'Zoom', note: 'Attend one mass meeting' },
    { name: 'Meet the Departments', date: 'Sept. 15', time: '6–8 PM', place: 'TBD', required: true },
    { name: 'Application Workshop', date: 'Sept. 17', time: '6–7 PM', place: 'Zoom' },
    { name: 'Applications due', date: 'Sept. 18', time: '11:59 PM', deadline: true },
  ],
};
