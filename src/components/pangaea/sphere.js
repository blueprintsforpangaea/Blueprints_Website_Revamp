// ============================================================
// Fast orthographic drawing for the globe.
//
// d3's geoPath turns every point from longitude/latitude into 3D,
// rotates it, and back again, all with trig, then runs a
// point-in-polygon test on each shape: that was nearly all the cost
// of a frame. Here each shape is kept as 3D unit vectors from the
// start, a continent's drift and the view are folded into one 3x3
// matrix, and a point lands on screen with nine multiplies.
//
// Shapes that run over the edge of the globe follow the edge round
// to where they come back, the same as d3 draws them.
// ============================================================

const RAD = Math.PI / 180;
const TAU = Math.PI * 2;

function unit(lon, lat) {
  const l = lon * RAD, p = lat * RAD, c = Math.cos(p);
  return [c * Math.cos(l), c * Math.sin(l), Math.sin(p)];
}

// Longest gap between two points, in radians. Each gap is drawn as a
// straight line, so long ones (the grid's lines are stored as a few
// far-apart points) get points added along the great circle, as d3
// would trace them. At 2° a gap bows less than a tenth of a pixel.
const MAX_GAP = 2 * RAD;

// GeoJSON-style lines ([[lon, lat], ...]) or unit vectors into unit
// vectors no more than MAX_GAP apart.
export function toVectors(line) {
  const src = line instanceof Float64Array ? line : Float64Array.from(line.flatMap(([lon, lat]) => unit(lon, lat)));
  const out = [];
  for (let i = 0; i < src.length; i += 3) {
    const bx = src[i], by = src[i + 1], bz = src[i + 2];
    if (i > 0) {
      const ax = src[i - 3], ay = src[i - 2], az = src[i - 1];
      const w = Math.acos(Math.max(-1, Math.min(1, ax * bx + ay * by + az * bz)));
      const steps = Math.ceil(w / MAX_GAP);
      const sw = Math.sin(w);
      for (let k = 1; k < steps; k++) {
        const t = k / steps, p = Math.sin((1 - t) * w) / sw, q = Math.sin(t * w) / sw;
        out.push(p * ax + q * bx, p * ay + q * by, p * az + q * bz);
      }
    }
    out.push(bx, by, bz);
  }
  return Float64Array.from(out);
}

// The view as a matrix: row 0 is screen right, row 1 is screen up,
// row 2 points at the viewer. Same as d3's rotate([-lon, -lat]).
export function viewMatrix(lon, lat) {
  const l = lon * RAD, p = lat * RAD;
  const sl = Math.sin(l), cl = Math.cos(l), sp = Math.sin(p), cp = Math.cos(p);
  return [-sl, cl, 0, -sp * cl, -sp * sl, cp, cp * cl, cp * sl, sp];
}

// a (3x3) times b (3x3, or null for none).
export function compose(a, b) {
  if (!b) return a;
  const o = new Array(9);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      o[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    }
  }
  return o;
}

// Scratch space for one projected line or ring.
let X = new Float64Array(1024), Y = new Float64Array(1024), Z = new Float64Array(1024);
function project(buf, m) {
  const n = buf.length / 3;
  if (n > X.length) {
    X = new Float64Array(n * 2); Y = new Float64Array(n * 2); Z = new Float64Array(n * 2);
  }
  let seen = false;
  for (let i = 0, j = 0; j < n; i += 3, j++) {
    const x = buf[i], y = buf[i + 1], z = buf[i + 2];
    X[j] = m[0] * x + m[1] * y + m[2] * z;
    Y[j] = m[3] * x + m[4] * y + m[5] * z;
    const d = m[6] * x + m[7] * y + m[8] * z;
    Z[j] = d;
    if (d > 0) seen = true;
  }
  return seen ? n : 0;
}

// Angle on screen (y down) of the globe's edge point under (x, y).
const edgeAngle = (x, y) => Math.atan2(-y, x);

// Follow the globe's edge from angle a0 the short way to a1.
function edgeTo(p, v, a0, a1) {
  let d = a1 - a0;
  if (d > Math.PI) d -= TAU;
  else if (d < -Math.PI) d += TAU;
  if (Math.abs(d) > 1e-4) p.arc(v.cx, v.cy, v.r, a0, a0 + d, d < 0);
}

// Where the segment from point i to point j crosses the edge.
function crossing(i, j) {
  const t = Z[i] / (Z[i] - Z[j]);
  const x = X[i] + (X[j] - X[i]) * t, y = Y[i] + (Y[j] - Y[i]) * t;
  const k = 1 / (Math.hypot(x, y) || 1);
  return [x * k, y * k];
}

/**
 * A closed shape (ring of unit vectors) into Path2D `p`, under matrix
 * `m` (plate drift times view), on the view `v` = { cx, cy, r }.
 * `ring` also carries what's needed to tell if the shape wraps round
 * the back of the globe (see prepareRing). Returns false if it's
 * entirely out of sight.
 */
export function ringPath(p, ring, m, v) {
  const n = project(ring.buf, m);
  if (!n) return false;
  const { cx, cy, r } = v;
  let start = 0;
  while (Z[start] <= 0) start++;
  p.moveTo(cx + r * X[start], cy - r * Y[start]);
  let edge = 0; // edge angle we're at, while out of sight
  for (let k = 1; k <= n; k++) {
    const i = (start + k - 1) % n, j = (start + k) % n;
    const a = Z[i] > 0, b = Z[j] > 0;
    if (a && b) {
      p.lineTo(cx + r * X[j], cy - r * Y[j]);
    } else if (a) {
      const [x, y] = crossing(i, j);
      p.lineTo(cx + r * x, cy - r * y);
      edge = edgeAngle(x, y);
      const e = edgeAngle(X[j], Y[j]);
      edgeTo(p, v, edge, e);
      edge = e;
    } else if (b) {
      const [x, y] = crossing(i, j);
      edgeTo(p, v, edge, edgeAngle(x, y));
      p.lineTo(cx + r * X[j], cy - r * Y[j]);
    } else {
      const e = edgeAngle(X[j], Y[j]);
      edgeTo(p, v, edge, e);
      edge = e;
    }
  }
  p.closePath();
  // Following the edge round the back leaves a shape that holds the
  // far point of the globe (straight behind the centre) filled inside
  // out. Add the whole disc, wound the same way, to set it right.
  if (holdsFarPoint(ring, m)) {
    p.moveTo(cx + r, cy);
    p.arc(cx, cy, r, 0, ring.sign > 0 ? TAU : -TAU, ring.sign < 0);
  }
  return true;
}

// Precompute what a ring needs: its unit vectors, a cap that holds
// it (centre u, cos of its radius), its points flattened onto the
// plane touching u (gnomonic, so the in/out test is flat and exact),
// and which way it winds on screen.
export function prepareRing(line) {
  const buf = toVectors(line);
  const n = buf.length / 3;
  let u = [0, 0, 0];
  for (let i = 0; i < buf.length; i += 3) { u[0] += buf[i]; u[1] += buf[i + 1]; u[2] += buf[i + 2]; }
  const len = Math.hypot(...u);
  u = u.map((c) => c / len);
  // e1, e2: axes of the touching plane, with e1 x e2 = u.
  const ref = Math.abs(u[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  let e1 = [ref[1] * u[2] - ref[2] * u[1], ref[2] * u[0] - ref[0] * u[2], ref[0] * u[1] - ref[1] * u[0]];
  const l1 = Math.hypot(...e1);
  e1 = e1.map((c) => c / l1);
  const e2 = [u[1] * e1[2] - u[2] * e1[1], u[2] * e1[0] - u[0] * e1[2], u[0] * e1[1] - u[1] * e1[0]];
  const gx = new Float64Array(n), gy = new Float64Array(n);
  let minCos = 1, area = 0;
  for (let i = 0, j = 0; j < n; i += 3, j++) {
    const d = u[0] * buf[i] + u[1] * buf[i + 1] + u[2] * buf[i + 2];
    minCos = Math.min(minCos, d);
    gx[j] = (e1[0] * buf[i] + e1[1] * buf[i + 1] + e1[2] * buf[i + 2]) / d;
    gy[j] = (e2[0] * buf[i] + e2[1] * buf[i + 1] + e2[2] * buf[i + 2]) / d;
  }
  // Screen y runs down, so wind with -gy.
  for (let j = 0; j < n; j++) {
    const k = (j + 1) % n;
    area += gx[j] * -gy[k] - gx[k] * -gy[j];
  }
  if (minCos <= 0.02) throw new Error('globe ring wider than a hemisphere');
  return { buf, u, e1, e2, gx, gy, cosR: minCos, sign: area >= 0 ? 1 : -1 };
}

// Is the point straight behind the globe's centre inside this ring?
// That point, in the ring's own frame, is minus the third row of m.
function holdsFarPoint(ring, m) {
  const fx = -m[6], fy = -m[7], fz = -m[8];
  const { u, e1, e2, gx, gy } = ring;
  const d = u[0] * fx + u[1] * fy + u[2] * fz;
  if (d < ring.cosR) return false;
  const px = (e1[0] * fx + e1[1] * fy + e1[2] * fz) / d;
  const py = (e2[0] * fx + e2[1] * fy + e2[2] * fz) / d;
  let inside = false;
  for (let i = 0, j = gx.length - 1; i < gx.length; j = i++) {
    if ((gy[i] > py) !== (gy[j] > py) && px < ((gx[j] - gx[i]) * (py - gy[i])) / (gy[j] - gy[i]) + gx[i]) {
      inside = !inside;
    }
  }
  return inside;
}

/** An open line of unit vectors into Path2D `p`, cut where it goes out of sight. */
export function linePath(p, buf, m, v) {
  const n = project(buf, m);
  if (!n) return;
  const { cx, cy, r } = v;
  let pen = false;
  for (let j = 0; j < n; j++) {
    if (Z[j] > 0) {
      if (pen) {
        p.lineTo(cx + r * X[j], cy - r * Y[j]);
      } else {
        if (j > 0) {
          const [x, y] = crossing(j - 1, j);
          p.moveTo(cx + r * x, cy - r * y);
          p.lineTo(cx + r * X[j], cy - r * Y[j]);
        } else {
          p.moveTo(cx + r * X[j], cy - r * Y[j]);
        }
        pen = true;
      }
    } else if (pen) {
      const [x, y] = crossing(j - 1, j);
      p.lineTo(cx + r * x, cy - r * y);
      pen = false;
    }
  }
}
