// Recent shipments shown on Home + Impact, with region tags for filtering.

export const REGIONS = ['All', 'USA', 'The Americas', 'Africa', 'Asia', 'Europe'];

export const RECENT_SHIPMENTS = [
  { id: 'aaps',      partner: 'Ann Arbor Public Schools',          chapter: 'UMich', destination: 'Ann Arbor, MI',  region: 'USA', date: 'July 2024' },
  { id: 'food-gath', partner: 'Food Gatherers',                    chapter: 'UMich', destination: 'Ann Arbor, MI',  region: 'USA', date: 'March 2023' },
  { id: 'mgy',       partner: 'MGY Studio',                        chapter: 'USC',   destination: 'Los Angeles, CA', region: 'USA', date: 'Oct. 2018' },
  { id: 'umsrfc',    partner: 'UM Student-Run Free Clinic',        chapter: 'UMich', destination: 'Ann Arbor, MI',  region: 'USA', date: 'May & Dec. 2023' },
  { id: 'acsm',      partner: 'Asian Center for Southeast Michigan', chapter: 'UMich', destination: 'Southfield, MI', region: 'USA', date: 'Sept. 2023' },
  { id: 'hope',      partner: 'Hope Clinic',                       chapter: 'UMich', destination: 'Ypsilanti, MI',  region: 'USA', date: 'April 2024' },
  { id: 'packard',   partner: 'Packard Health',                    chapter: 'UMich', destination: 'Ann Arbor, MI',  region: 'USA', date: 'March 2024' },
  { id: 'wolverine', partner: 'Wolverine Street Med',              chapter: 'UMich', destination: 'Ann Arbor, MI',  region: 'USA', date: 'Aug. 2024' },
];

// Tab counts shown in the Recent Shipments filter (from the live site).
export const SHIPMENT_REGION_COUNTS = {
  'USA': 12,
  'The Americas': 5,
  'Africa': 4,
  'Asia': 2,
  'Europe': 1,
};
