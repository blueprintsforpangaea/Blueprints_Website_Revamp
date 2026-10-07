import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoGraticule10, geoInterpolate, geoDistance } from 'd3-geo';
import { plateMatrices, plateGeometry, movePoint, LOGO, PLATE_COLOR } from './plates.js';
import { STEPS, ROUTES, OTHER_ROUTES, CHAPTER_PINS } from './story.js';

const RAD = Math.PI / 180;
// Navy ink on warm drafting paper.
const INK = '0, 14, 63';
const SKY = '55, 60, 130';
const PAPER = '246, 244, 240';
const FONT = 'Lexend, system-ui, sans-serif';
const SPIN_SPEED = 5; // degrees per second on the spinning steps
const GRATICULE = geoGraticule10();
// The logo's grid: wider spacing, drawn in white over the land only.
const LAND_GRID = geoGraticule().step([20, 20])();


const ALL_ROUTES = [...ROUTES, ...OTHER_ROUTES.map((r) => ({ ...r, group: 'all' }))];

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const angleDiff = (a, b) => ((((b - a) % 360) + 540) % 360) - 180;

// Interpolate two steps. Missing arc keys count as 0.
// When the continents drift apart, run it in order: drift, then turn
// toward the next place, then zoom in. You never see a zoomed-in,
// half-drifted map or a close-up of empty ocean.
const phase = (t, from, to) => smooth(Math.max(0, Math.min(1, (t - from) / (to - from))));
function blend(a, b, t) {
  const apart = b.drift > a.drift;
  const td = apart ? phase(t, 0, 0.5) : t;
  const tv = apart ? phase(t, 0.35, 0.8) : t;
  const tz = apart ? phase(t, 0.6, 1) : t;
  const arcs = {};
  for (const k of new Set([...Object.keys(a.arcs || {}), ...Object.keys(b.arcs || {})])) {
    arcs[k] = lerp(a.arcs?.[k] || 0, b.arcs?.[k] || 0, t);
  }
  return {
    drift: lerp(a.drift, b.drift, td),
    lon: a.lon + angleDiff(a.lon, b.lon) * tv,
    lat: lerp(a.lat, b.lat, tv),
    scale: lerp(a.scale, b.scale, tz),
    pins: lerp(a.pins || 0, b.pins || 0, tv),
    spin: lerp(a.spin || 0, b.spin || 0, t),
    arcs,
    focus: t < 0.5 ? a.focus : b.focus,
  };
}

// Screen position of a lon/lat point lifted `h` (fraction of radius)
// off an orthographic globe centred on lon0/lat0.
function lift(lon, lat, h, view) {
  const l = (lon - view.lon) * RAD, p = lat * RAD, p0 = view.lat * RAD;
  const x = Math.cos(p) * Math.sin(l);
  const y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
  const z = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  const k = 1 + h;
  const visible = z > 0 || Math.hypot(x, y) * k > 1;
  return { x: view.cx + view.r * x * k, y: view.cy - view.r * y * k, visible };
}

// Text with a paper-coloured outline so it stays readable over map lines.
function haloText(ctx, text, x, y) {
  ctx.lineJoin = 'round';
  ctx.strokeStyle = `rgba(${PAPER}, 0.95)`;
  ctx.lineWidth = 5;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = `rgb(${INK})`;
  ctx.fillText(text, x, y);
}

function label(ctx, x, y, text, sub, alpha, dir = 1) {
  const dx = 26 * dir, dy = -22;
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = `rgba(${INK}, 0.7)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx, y + dy);
  ctx.lineTo(x + dx + 14 * dir, y + dy);
  ctx.stroke();
  ctx.textAlign = dir > 0 ? 'left' : 'right';
  ctx.font = `700 17px ${FONT}`;
  haloText(ctx, text, x + dx + 18 * dir, y + dy + 6);
  if (sub) {
    ctx.font = `400 15px ${FONT}`;
    haloText(ctx, sub, x + dx + 18 * dir, y + dy + 24);
  }
  ctx.globalAlpha = 1;
}

/**
 * The Pangaea globe. Sits beside the page text and follows it: each
 * child of `stepsRef` is one step, and the globe eases toward the
 * state of whichever step you're reading. Scrolling is never
 * intercepted, and the page is only as long as its text.
 */
export default function DriftGlobe({ stepsRef, yearsRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const proj = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(proj, ctx);

    let w = 0, h = 0, dpr = 1, visible = true, raf = 0, last = performance.now();
    let anchors = [], spinOffset = 0, yearsShown = '';
    let geoCache = { drift: -1, geo: null, mats: null };
    const cur = blend(STEPS[0], STEPS[0], 0);

    const measure = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // A step is "reached" when its middle crosses the middle of the
      // screen. Clamp to the bottom of the page so the last step is
      // always reachable, however short it is.
      const story = stepsRef?.current?.parentElement;
      const storyBottom = story ? story.getBoundingClientRect().bottom + window.scrollY : 0;
      const maxScroll = Math.max(0, storyBottom - window.innerHeight);
      anchors = Array.from(stepsRef?.current?.children || []).map((el, i) => {
        if (i === 0) return 0;
        const r = el.getBoundingClientRect();
        return Math.min(maxScroll, r.top + window.scrollY + r.height / 2 - window.innerHeight / 2);
      });
    };

    const target = () => {
      const y = window.scrollY;
      const n = Math.min(anchors.length, STEPS.length) - 1;
      if (n < 1 || y <= anchors[0]) return blend(STEPS[0], STEPS[0], 0);
      if (y >= anchors[n]) return blend(STEPS[n], STEPS[n], 0);
      let i = 0;
      while (i < n - 1 && y >= anchors[i + 1]) i++;
      const span = Math.max(1, anchors[i + 1] - anchors[i]);
      return blend(STEPS[i], STEPS[i + 1], smooth((y - anchors[i]) / span));
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || !w) return;

      const tg = target();

      // Spin where the timeline asks; otherwise settle back to the
      // nearest full turn so the globe lands where the frame wants it.
      if (!reduce && tg.spin > 0.02) spinOffset += dt * SPIN_SPEED * tg.spin;
      else spinOffset += (Math.round(spinOffset / 360) * 360 - spinOffset) * Math.min(1, dt * 2.5);

      const k = reduce ? 1 : 1 - Math.exp(-dt * 5);
      cur.lon += angleDiff(cur.lon, tg.lon + spinOffset) * k;
      for (const key of ['drift', 'lat', 'scale', 'pins']) cur[key] += (tg[key] - cur[key]) * k;
      const arcs = {};
      for (const key of new Set([...Object.keys(cur.arcs), ...Object.keys(tg.arcs)])) {
        const a = cur.arcs[key] || 0;
        arcs[key] = a + ((tg.arcs[key] || 0) - a) * k;
      }
      cur.arcs = arcs;
      cur.focus = tg.focus;

      const years = cur.drift > 0.995 ? 'Today' : `About ${Math.round((1 - cur.drift) * 200)} million years ago`;
      if (years !== yearsShown && yearsRef?.current) {
        yearsShown = years;
        yearsRef.current.textContent = years;
      }

      // ---- layout ----
      const wide = w >= 520;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.4 * cur.scale;
      const view = { lon: cur.lon, lat: cur.lat, cx, cy, r };
      proj.translate([cx, cy]).scale(r).rotate([-cur.lon, -cur.lat]);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // ---- sphere + graticule ----
      ctx.beginPath();
      path({ type: 'Sphere' });
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      ctx.strokeStyle = `rgba(${INK}, 0.7)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      path(GRATICULE);
      ctx.strokeStyle = `rgba(${SKY}, 0.13)`;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // ---- land ----
      const driftKey = Math.round(cur.drift * 2000) / 2000;
      if (geoCache.drift !== driftKey) {
        const mats = plateMatrices(driftKey);
        geoCache = { drift: driftKey, mats, geo: plateGeometry(mats) };
      }
      const { geo, mats } = geoCache;
      for (const g of geo) {
        ctx.beginPath();
        path(g);
        ctx.fillStyle = PLATE_COLOR[g.id] || LOGO.navy;
        ctx.fill();
      }
      ctx.save();
      ctx.beginPath();
      for (const g of geo) path(g);
      ctx.clip();
      ctx.beginPath();
      path(LAND_GRID);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();
      // White seams between continents, as in the logo.
      ctx.beginPath();
      for (const g of geo) path(g);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.2;
      ctx.lineJoin = 'round';
      ctx.stroke();

      const at = (p, hgt = 0) => {
        const [lon, lat] = movePoint(p.lng, p.lat, p.plate, mats);
        return { ...lift(lon, lat, hgt, view), lon, lat };
      };

      // ---- routes ----
      for (const route of ALL_ROUTES) {
        const prog = cur.arcs[route.group || route.id] || 0;
        if (prog < 0.002) continue;
        const a = movePoint(route.from.lng, route.from.lat, route.from.plate, mats);
        const b = movePoint(route.to.lng, route.to.lat, route.to.plate, mats);
        const dist = geoDistance(a, b);
        if (dist < 1e-4) continue;
        const interp = geoInterpolate(a, b);
        const peak = Math.min(0.3, (dist / Math.PI) * 0.55);
        const focus = cur.focus?.includes(route.id);
        const n = 72;
        const lineW = focus ? 2.4 : 1.3;
        ctx.beginPath();
        let pen = false, head = null;
        for (let i = 0; i <= n; i++) {
          const t = (i / n) * prog;
          const [lon, lat] = interp(t);
          const pt = lift(lon, lat, peak * Math.sin(Math.PI * t), view);
          if (!pt.visible) { pen = false; continue; }
          if (pen) ctx.lineTo(pt.x, pt.y);
          else ctx.moveTo(pt.x, pt.y);
          pen = true;
          head = pt;
        }
        // White casing first, so the line reads over blue land and paper alike.
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = lineW + 2.5;
        ctx.stroke();
        ctx.strokeStyle = focus ? `rgb(${INK})` : `rgba(${INK}, 0.6)`;
        ctx.lineWidth = lineW;
        ctx.stroke();
        if (head) {
          const rr = prog > 0.98 ? 3 : 2.4;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(head.x, head.y, rr + 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(${INK})`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, rr, 0, Math.PI * 2);
          ctx.fill();
        }
        if (focus && prog > 0.9) {
          const end = at(route.to);
          if (end.visible) label(ctx, end.x, end.y, route.to.label, null, (prog - 0.9) * 10, end.x + 130 > w ? -1 : 1);
        }
      }

      // ---- chapter pins ----
      if (cur.pins > 0.01) {
        const pulse = reduce ? 0.5 : (Math.sin(now / 600) + 1) / 2;
        for (const pin of CHAPTER_PINS) {
          const p = at(pin);
          if (!p.visible) continue;
          ctx.globalAlpha = cur.pins;
          const pr = pin.hq ? 5 : 3.2;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, pr + 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(${INK})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
          ctx.fill();
          if (pin.hq) {
            ctx.strokeStyle = `rgba(${INK}, ${0.25 + 0.5 * (1 - pulse)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 7 + pulse * 7, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          const labelAlpha = Math.max(0, Math.min(1, (cur.scale - 1.9) / 0.5)) * Math.max(0, (cur.pins - 0.7) / 0.3);
          // Narrow screens only have room to name headquarters.
          if (labelAlpha > 0.01 && (wide || pin.hq)) {
            ctx.globalAlpha = labelAlpha;
            ctx.font = `${pin.hq ? 700 : 400} 15px ${FONT}`;
            ctx.textAlign = pin.dx < 0 ? 'right' : 'left';
            const ox = pin.dx < 0 ? -9 : 9;
            const oy = pin.dy < 0 ? -9 : pin.dy > 0 ? 17 : 5;
            haloText(ctx, pin.short, p.x + ox, p.y + oy);
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas.parentElement);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    if (stepsRef?.current) ro.observe(stepsRef.current);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas.parentElement);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stepsRef, yearsRef]);

  return <canvas ref={canvasRef} className="pg-canvas" aria-hidden="true" />;
}
