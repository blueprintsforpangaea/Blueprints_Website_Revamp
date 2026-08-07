// ============================================================
// Globe points. Every destination below corresponds to a
// documented shipment in shipments.js — no decorative pins.
// Coordinates are the named city, or the country's primary
// point of delivery where the site names one.
//
// The org reports 15+ countries reached; the set below is the
// subset with published shipment records.
// ============================================================

// Origin hub — the Ann Arbor warehouse.
export const HQ = { name: 'Ann Arbor, MI · Headquarters', lat: 42.2808, lng: -83.7430 };

export const DESTINATIONS = [
  // ---------- Africa ----------
  { city: 'Lagos',           country: 'Nigeria',            region: 'Africa',        lat: 6.5244,   lng: 3.3792 },
  { city: 'Accra',           country: 'Ghana',              region: 'Africa',        lat: 5.6037,   lng: -0.1870 },

  // ---------- The Americas ----------
  { city: 'San Juan',        country: 'Puerto Rico',        region: 'The Americas',  lat: 18.4655,  lng: -66.1057 },
  { city: 'Mexico City',     country: 'Mexico',             region: 'The Americas',  lat: 19.4326,  lng: -99.1332 },
  { city: 'Guatemala City',  country: 'Guatemala',          region: 'The Americas',  lat: 14.6349,  lng: -90.5069 },
  { city: 'Santo Domingo',   country: 'Dominican Republic', region: 'The Americas',  lat: 18.4861,  lng: -69.9312 },
  { city: 'Quito',           country: 'Ecuador',            region: 'The Americas',  lat: -0.1807,  lng: -78.4678 },
  { city: 'Kingston',        country: 'Jamaica',            region: 'The Americas',  lat: 17.9714,  lng: -76.7931 },
  { city: 'Tegucigalpa',     country: 'Honduras',           region: 'The Americas',  lat: 14.0723,  lng: -87.1921 },

  // ---------- Asia ----------
  { city: 'Aleppo',          country: 'Syria',              region: 'Asia',          lat: 36.2021,  lng: 37.1343 },
  { city: 'Ahmedabad',       country: 'India',              region: 'Asia',          lat: 23.0225,  lng: 72.5714 },
  { city: 'Yangon',          country: 'Myanmar',            region: 'Asia',          lat: 16.8409,  lng: 96.1735 },

  // ---------- Europe ----------
  { city: 'Kyiv',            country: 'Ukraine',            region: 'Europe',        lat: 50.4501,  lng: 30.5234 },

  // ---------- United States ----------
  { city: 'Ann Arbor, MI',   country: 'United States',      region: 'United States', lat: 42.2808,  lng: -83.7430 },
  { city: 'Detroit, MI',     country: 'United States',      region: 'United States', lat: 42.3314,  lng: -83.0458 },
  { city: 'Los Angeles, CA', country: 'United States',      region: 'United States', lat: 34.0522,  lng: -118.2437 },
  { city: 'New York, NY',    country: 'United States',      region: 'United States', lat: 40.7128,  lng: -74.0060 },
  { city: 'Columbus, OH',    country: 'United States',      region: 'United States', lat: 39.9612,  lng: -82.9988 },
  { city: 'St. Louis, MO',   country: 'United States',      region: 'United States', lat: 38.6270,  lng: -90.1994 },
  { city: 'Miami, FL',       country: 'United States',      region: 'United States', lat: 25.7617,  lng: -80.1918 },
];

// Region rollups shown beside the globe. `countries` counts the
// distinct countries/territories above, so the two stay in sync.
export const REGION_SUMMARY = [
  {
    region: 'The Americas',
    countries: 6,
    blurb: 'Clinics and health ministries across Latin America and the Caribbean.',
  },
  {
    region: 'Africa',
    countries: 2,
    blurb: 'Hospital networks in Nigeria and Ghana, including a 60-pallet delivery.',
  },
  {
    region: 'Asia',
    countries: 3,
    blurb: 'Earthquake and pandemic relief through SAMS and regional partners.',
  },
  {
    region: 'Europe',
    countries: 1,
    blurb: 'Wartime medical aid for Ukraine.',
  },
  {
    region: 'United States',
    countries: 1,
    blurb: 'Free clinics, shelters, and street-medicine teams in our chapter cities.',
  },
];
