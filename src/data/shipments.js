// ============================================================
// The real shipment record, from the Impact and chapter pages.
// Values and weights are quoted only where the site publishes
// them — entries without a figure omit it rather than estimate.
// `figure` is the headline number for shipments with no dollar
// value; it restates the published detail, never a new estimate.
// ============================================================

export const SHIPMENTS = [
  // ---------- Africa ----------
  {
    id: 'nigeria',
    place: 'Nigeria',
    region: 'Africa',
    partner: 'DrugAID Africa',
    chapter: 'USC',
    date: 'April 2024',
    detail:
      '1,800 lbs of PPE, surgical instruments, and materials for maternal health, HIV/AIDS treatment, and malaria control, distributed to Massey Children’s Hospital, Alimosho General Hospital, and other facilities.',
  },
  {
    id: 'nigeria-2025',
    place: 'Nigeria',
    region: 'Africa',
    partner: 'Connect With Africa',
    chapter: 'USC & Wayne State',
    date: 'July 2025',
    value: '$573,000+',
    detail: 'More than 60 pallets of medical supplies, PPE, and sanitary products.',
  },
  {
    id: 'ghana',
    place: 'Ghana',
    region: 'Africa',
    partner: 'Ghana Ministry of Health',
    figure: 'A 20-foot container',
    detail: 'A full container of medical aid, delivered through a partnership with the Ministry of Health.',
  },

  // ---------- The Americas ----------
  {
    id: 'puerto-rico',
    place: 'Puerto Rico',
    region: 'The Americas',
    partner: 'Día de la Mujer',
    value: '$61,000+',
  },
  {
    id: 'mexico',
    place: 'Mexico',
    region: 'The Americas',
    partner: 'Colgate-Palmolive & Chiricahua Community Health',
    figure: '2,000+ lbs',
    detail: 'Supplies for Chiricahua Community Health, including deliveries to Hospital General de México.',
  },
  {
    id: 'guatemala',
    place: 'Guatemala',
    region: 'The Americas',
    partner: 'Friendship Without Borders',
    detail: 'Supplies routed to partner clinics through Friendship Without Borders.',
  },
  {
    id: 'dominican-republic',
    place: 'Dominican Republic',
    region: 'The Americas',
    partner: 'Seeds of Hope',
    date: '2016',
    detail: 'A partnership supporting Love for La Victoria.',
  },
  {
    id: 'ecuador',
    place: 'Ecuador',
    region: 'The Americas',
    partner: 'Interhealth SA',
    detail: 'PPE reallocation to Interhealth SA.',
  },
  {
    id: 'jamaica',
    place: 'Jamaica',
    region: 'The Americas',
    partner: 'Christian Dental Society',
    detail: 'A collaboration on dental care supplies.',
  },
  {
    id: 'honduras',
    place: 'Honduras',
    region: 'The Americas',
    chapter: 'Ohio State',
    detail: 'Monthly medical supply shipments run by the Ohio State chapter.',
  },

  // ---------- Asia ----------
  {
    id: 'syria',
    place: 'Syria',
    region: 'Asia',
    partner: 'Syrian American Medical Society',
    figure: '16+ pallets',
    detail: 'Three shipments, including 3,000 lbs sent after the earthquake in northern Syria.',
  },
  {
    id: 'india',
    place: 'India',
    region: 'Asia',
    date: 'COVID-19 response',
    detail: 'A 12-pallet shipment sent during the height of the pandemic.',
  },
  {
    id: 'myanmar',
    place: 'Myanmar',
    region: 'Asia',
    detail: 'Dental supplies sent to underserved facilities.',
  },

  // ---------- Europe ----------
  {
    id: 'ukraine',
    place: 'Ukraine',
    region: 'Europe',
    partner: 'U-M Ukrainian Club',
    value: '$40,000+',
    detail: 'Wartime medical aid.',
  },

  // ---------- United States ----------
  {
    id: 'food-gatherers',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'Food Gatherers',
    chapter: 'UMich',
    date: 'March 2023',
    value: '$70,000+',
    detail: 'Two shipments supporting local food and health security.',
  },
  {
    id: 'delonis',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'Delonis Center',
    chapter: 'UMich',
    date: 'April 2025',
    value: '$1,300',
    detail: '100 lbs of supplies for the shelter’s health services.',
  },
  {
    id: 'hope-clinic',
    place: 'Ypsilanti, MI',
    region: 'United States',
    partner: 'Hope Clinic',
    chapter: 'UMich',
    date: 'April 2024',
  },
  {
    id: 'packard',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'Packard Health',
    chapter: 'UMich',
    date: 'March 2024',
  },
  {
    id: 'umsrfc',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'UM Student-Run Free Clinic',
    chapter: 'UMich',
    date: 'May & Dec. 2023',
  },
  {
    id: 'wolverine',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'Wolverine Street Med',
    chapter: 'UMich',
    date: 'Aug. 2024',
  },
  {
    id: 'acsm',
    place: 'Southfield, MI',
    region: 'United States',
    partner: 'Asian Center for Southeast Michigan',
    chapter: 'UMich',
    date: 'Sept. 2023',
  },
  {
    id: 'aaps',
    place: 'Ann Arbor, MI',
    region: 'United States',
    partner: 'Ann Arbor Public Schools',
    chapter: 'UMich',
    date: 'July 2024',
  },
  {
    id: 'covid-michigan',
    place: 'Michigan',
    region: 'United States',
    date: 'COVID-19 response',
    detail: 'PPE supplied to Michigan hospitals during the pandemic.',
  },
];

const byId = (ids) => ids.map((id) => SHIPMENTS.find((s) => s.id === id));

// The home page shows three. The Impact page highlights these six.
export const RECENT_SHIPMENTS = byId(['nigeria-2025', 'ghana', 'ukraine']);
export const FEATURED_SHIPMENTS = byId([
  'nigeria-2025', 'honduras', 'ghana', 'food-gatherers', 'ukraine', 'mexico',
]);
