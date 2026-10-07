// ============================================================
// Continental drift on a sphere.
//
// Land comes from Natural Earth (world-atlas, 110m). Each polygon
// is assigned to a plate, and each plate has one rotation that
// carries it from today's position back to roughly where it sat
// in Pangaea (~200 million years ago), with Africa held still.
// `drift` = 1 is today, `drift` = 0 is Pangaea; anything between
// is a partial rotation about the same axis, so the motion is a
// smooth single-stage drift rather than a cross-fade.
//
// The fit is approximate. It's meant to read as Pangaea, not to
// stand in for a paleogeographic reconstruction.
// ============================================================

import { feature, merge } from 'topojson-client';
import { geoCentroid } from 'd3-geo';
import world from 'world-atlas/countries-110m.json';

const RAD = Math.PI / 180;

// ---------- quaternion helpers ----------
function vec(lon, lat) {
  const l = lon * RAD, p = lat * RAD, c = Math.cos(p);
  return [c * Math.cos(l), c * Math.sin(l), Math.sin(p)];
}
function quat(lat, lon, deg) {
  const [x, y, z] = vec(lon, lat);
  const h = (deg * RAD) / 2, s = Math.sin(h);
  return [Math.cos(h), x * s, y * s, z * s];
}
function mul(a, b) {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}
// Scale a rotation's angle by t (0 = identity, 1 = full rotation).
function partial(q, t) {
  const w = Math.max(-1, Math.min(1, q[0]));
  const half = Math.acos(w);
  const s = Math.sin(half);
  if (s < 1e-9) return [1, 0, 0, 0];
  const h = half * t, k = Math.sin(h) / s;
  return [Math.cos(h), q[1] * k, q[2] * k, q[3] * k];
}
function matrix([w, x, y, z]) {
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y),
    2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x),
    2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y),
  ];
}
function apply(m, x, y, z) {
  return [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
  ];
}
function toLonLat(x, y, z) {
  return [Math.atan2(y, x) / RAD, Math.asin(Math.max(-1, Math.min(1, z))) / RAD];
}

// ---------- plate assignment ----------
const INDIA = new Set(['India', 'Sri Lanka', 'Bangladesh', 'Nepal', 'Bhutan', 'Pakistan']);
const NOT_AFRICA = new Set(['Greece', 'Cyprus', 'N. Cyprus', 'Turkey', 'Italy', 'Spain', 'Portugal']);
const CENTRAL_AMERICA = new Set(['Panama', 'Costa Rica', 'Nicaragua']);

export function plateOf(name, lon, lat) {
  if (lat < -60 || name === 'Fr. S. Antarctic Lands') return 'ant';
  if (INDIA.has(name)) return 'ind';
  if (name === 'Madagascar') return 'mad';
  if (lon < -25) {
    return lat < 12.5 && lon > -81.5 && !CENTRAL_AMERICA.has(name) ? 'sam' : 'nam';
  }
  if (lon > 110 && lat < -5) return 'aus';
  if (lon > -20 && lon < 60 && lat < 37.5 && !NOT_AFRICA.has(name)) return 'afr';
  return 'eur';
}

// ---------- Pangaea fit ----------
// Each entry rotates a plate from today into Africa's frame at ~200 Ma.
// Either an Euler pole { pole: [lat, lon, angle°] } or an anchor move
// { from: [lon, lat], to: [lon, lat], spin° } that carries one point
// to another and then turns the plate about it. `parent` composes the
// fit onto another plate's (Australia rides on Antarctica).
// South America starts from Bullard's 1965 Atlantic fit; the rest
// were placed by eye against standard Pangaea maps.
export const FIT = {
  afr: null,
  sam: { pole: [44.0, -30.6, 52.0] },
  nam: { pole: [66.95, -12.02, 75.55] },
  eur: { from: [-4, 40], to: [-4, 40], spin: 18 },
  mad: { from: [47, -19], to: [43, -8], spin: 15 },
  ind: { from: [78, 21], to: [50, -13], spin: -30 },
  ant: { from: [20, -70], to: [28, -37], spin: 60 },
  aus: { from: [135, -33], to: [138, -64], spin: 15, parent: 'ant' },
};

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function axisQuat(axis, rad) {
  const n = Math.hypot(...axis);
  if (n < 1e-12) return [1, 0, 0, 0];
  const s = Math.sin(rad / 2) / n;
  return [Math.cos(rad / 2), axis[0] * s, axis[1] * s, axis[2] * s];
}

function fitQuat(plate, seen = new Set()) {
  const def = FIT[plate];
  if (!def || seen.has(plate)) return [1, 0, 0, 0];
  seen.add(plate);
  let own;
  if (def.pole) {
    own = quat(...def.pole);
  } else {
    const a = vec(...def.from), b = vec(...def.to);
    const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    const move = axisQuat(cross(a, b), Math.acos(dot));
    own = mul(axisQuat(b, (def.spin || 0) * RAD), move);
  }
  return def.parent ? mul(fitQuat(def.parent, seen), own) : own;
}

// ---------- geometry ----------
function buildPlates() {
  const topo = world;
  const groups = {};
  for (const g of topo.objects.countries.geometries) {
    const name = g.properties?.name ?? '';
    const polys =
      g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : [];
    for (const arcs of polys) {
      const piece = { type: 'Polygon', arcs };
      const [lon, lat] = geoCentroid(feature(topo, piece));
      const p = plateOf(name, lon, lat);
      (groups[p] ||= []).push(piece);
    }
  }

  return Object.entries(groups).map(([id, pieces]) => {
    const land = merge(topo, pieces); // one MultiPolygon, no internal borders
    // Pre-convert every vertex to a unit vector for fast rotation.
    const polys = land.coordinates.map((poly) =>
      poly.map((ring) => {
        const out = new Float64Array(ring.length * 3);
        ring.forEach(([lon, lat], i) => out.set(vec(lon, lat), i * 3));
        return out;
      }),
    );
    return { id, polys, fit: fitQuat(id) };
  });
}

export const PLATES = buildPlates();
const FIT_BY_ID = Object.fromEntries(PLATES.map((p) => [p.id, p.fit]));

// Rotation matrices for every plate at a given drift (1 = today).
export function plateMatrices(drift) {
  const t = 1 - drift;
  const out = {};
  for (const p of PLATES) out[p.id] = t <= 0 ? null : matrix(partial(p.fit, t));
  return out;
}

// GeoJSON for each plate at the given matrices.
export function plateGeometry(mats) {
  return PLATES.map((p) => {
    const m = mats[p.id];
    const coordinates = p.polys.map((poly) =>
      poly.map((buf) => {
        const ring = new Array(buf.length / 3);
        for (let i = 0, j = 0; i < buf.length; i += 3, j++) {
          ring[j] = m
            ? toLonLat(...apply(m, buf[i], buf[i + 1], buf[i + 2]))
            : toLonLat(buf[i], buf[i + 1], buf[i + 2]);
        }
        return ring;
      }),
    );
    return { id: p.id, type: 'MultiPolygon', coordinates };
  });
}

// Move a present-day point along with its plate.
export function movePoint(lon, lat, plate, mats) {
  const m = mats[plate];
  if (!m) return [lon, lat];
  return toLonLat(...apply(m, ...vec(lon, lat)));
}

export { FIT_BY_ID };
