// Photos that belong to one shipment, chapter, or department are
// found by folder and file name, so adding one is just dropping a
// file in the right place — no code change:
//
//   images/shipments/<shipment id>.jpg     e.g. shipments/ghana.jpg
//   images/departments/<department id>.jpg e.g. departments/finance.jpg
//   images/chapters/<chapter slug>/*.jpg   any number per chapter
//
// Anything without a photo shows an empty "Photo coming soon" frame.
const files = import.meta.glob(
  [
    './images/shipments/*.{jpg,jpeg,png,webp}',
    './images/departments/*.{jpg,jpeg,png,webp}',
    './images/chapters/**/*.{jpg,jpeg,png,webp}',
    './images/recruitment/*.{jpg,jpeg,png,webp}',
  ],
  { eager: true, import: 'default' },
);

const inFolder = (folder) =>
  Object.keys(files)
    .filter((p) => p.startsWith(`./images/${folder}/`))
    .sort()
    .map((p) => files[p]);

const named = (folder, name) => {
  const key = Object.keys(files).find((p) => p.replace(/\.[a-z]+$/, '') === `./images/${folder}/${name}`);
  return key ? files[key] : undefined;
};

export const shipmentPhoto = (id) => named('shipments', id);
export const departmentPhoto = (id) => named('departments', id);
export const chapterPhotos = (slug) => inFolder(`chapters/${slug}`);
// images/recruitment/<photo>.jpg — named in src/data/recruitment.js
export const recruitmentPhoto = (name) => name && named('recruitment', name);
