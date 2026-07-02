// Shipment destinations plotted on the 3D globe (Impact page).
// NOTE: Representative placeholder set spanning 5 continents / 15+ countries —
// replace with verified shipment records as they are confirmed.

// Origin hub — University of Michigan HQ (Ann Arbor).
export const HQ = { name: 'Ann Arbor, MI · HQ', lat: 42.2808, lng: -83.7430 };

export const DESTINATIONS = [
  // North America
  { city: 'Ann Arbor, MI',   country: 'United States', region: 'USA',          lat: 42.2808,  lng: -83.7430 },
  { city: 'Los Angeles, CA', country: 'United States', region: 'USA',          lat: 34.0522,  lng: -118.2437 },
  { city: 'New York, NY',    country: 'United States', region: 'USA',          lat: 40.7128,  lng: -74.0060 },
  // The Americas (Latin America / Caribbean)
  { city: 'Port-au-Prince',  country: 'Haiti',         region: 'The Americas', lat: 18.5944,  lng: -72.3074 },
  { city: 'Guatemala City',  country: 'Guatemala',     region: 'The Americas', lat: 14.6349,  lng: -90.5069 },
  { city: 'Lima',            country: 'Peru',          region: 'The Americas', lat: -12.0464, lng: -77.0428 },
  { city: 'Santo Domingo',   country: 'Dominican Rep.', region: 'The Americas', lat: 18.4861,  lng: -69.9312 },
  // Africa
  { city: 'Accra',           country: 'Ghana',         region: 'Africa',       lat: 5.6037,   lng: -0.1870 },
  { city: 'Nairobi',         country: 'Kenya',         region: 'Africa',       lat: -1.2921,  lng: 36.8219 },
  { city: 'Lagos',           country: 'Nigeria',       region: 'Africa',       lat: 6.5244,   lng: 3.3792 },
  { city: 'Freetown',        country: 'Sierra Leone',  region: 'Africa',       lat: 8.4657,   lng: -13.2317 },
  // Asia & Middle East
  { city: 'Amman',           country: 'Jordan',        region: 'Asia',         lat: 31.9454,  lng: 35.9284 },
  { city: 'Manila',          country: 'Philippines',   region: 'Asia',         lat: 14.5995,  lng: 120.9842 },
  { city: 'Kathmandu',       country: 'Nepal',         region: 'Asia',         lat: 27.7172,  lng: 85.3240 },
  { city: 'Gaziantep',       country: 'Syria relief',  region: 'Asia',         lat: 37.0662,  lng: 37.3833 },
  // Europe
  { city: 'Kyiv',            country: 'Ukraine',       region: 'Europe',       lat: 50.4501,  lng: 30.5234 },
];

// Continent / region rollups shown beside the globe.
export const REGION_SUMMARY = [
  { region: 'The Americas', countries: 4, blurb: 'Field clinics across Latin America & the Caribbean' },
  { region: 'Africa',       countries: 4, blurb: 'Hospitals & community health centers' },
  { region: 'Asia',         countries: 4, blurb: 'Crisis relief & rural care networks' },
  { region: 'Europe',       countries: 1, blurb: 'Wartime medical relief in Ukraine' },
  { region: 'USA',          countries: 1, blurb: 'Free & student-run clinics nationwide' },
];
