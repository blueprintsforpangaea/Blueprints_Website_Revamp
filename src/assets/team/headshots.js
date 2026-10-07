// Headshots for the About page. To add one, drop a square photo in
// this folder named after the person, lowercase with dashes
// (e.g. "aakash-gummidela.jpg"). Anyone without a photo shows their
// initials instead.
const files = import.meta.glob('./*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

const slug = (name) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const BY_SLUG = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace(/^\.\/|\.[a-z]+$/g, ''), url]),
);

export const headshotFor = (name) => BY_SLUG[slug(name)];
