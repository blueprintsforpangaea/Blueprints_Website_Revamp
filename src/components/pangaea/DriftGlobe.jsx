import { useEffect, useRef } from 'react';
import { geoGraticule, geoGraticule10, geoInterpolate, geoDistance } from 'd3-geo';
import { plateMatrices, movePoint, LAND_RINGS, LAKE_RINGS, BORDER_LINES, LOGO, CONTINENT_COLOR } from './plates.js';
import { viewMatrix, compose, ringPath, linePath, toVectors } from './sphere.js';
import { STEPS, FILM, ROUTES, OTHER_ROUTES, CHAPTER_PINS } from './story.js';

const RAD = Math.PI / 180;
// Navy ink on warm drafting paper.
const INK = '0, 14, 63';
const SKY = '55, 60, 130';
const PAPER = '246, 244, 240';
const FONT = '"Public Sans", system-ui, sans-serif';
const SPIN_SPEED = 5; // degrees per second on the spinning steps
const GRATICULE = geoGraticule10().coordinates.map(toVectors);
// The logo's grid: wider spacing, drawn in white over the land only.
const LAND_GRID = geoGraticule().step([20, 20])().coordinates.map(toVectors);
const lines = (list, m, v) => {
  const p = new Path2D();
  for (const l of list) linePath(p, l, m, v);
  return p;
};


// A plain dot where each shipment lands, the same blue as the
// destination dots on the Impact map.
function drawDot(ctx, x, y, s) {
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y, s + 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = LOGO.bright;
  ctx.beginPath();
  ctx.arc(x, y, s, 0, Math.PI * 2);
  ctx.fill();
}

// Most pixels the canvas is drawn at. Small canvases (phones) get
// full 2x sharpness; big ones are held to about this many pixels so
// fill cost stays flat however large the screen.
const PIXEL_BUDGET = 1.4e6;

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

/**
 * The Pangaea globe. Sits beside the page text and follows it: each
 * child of `stepsRef` is one step, and the globe eases toward the
 * state of whichever step you're reading. Scrolling is never
 * intercepted, and the page is only as long as its text.
 */
// `film`: play FILM once on first view instead of following scroll
// (phones). Changing `playKey` replays it.
export default function DriftGlobe({ stepsRef, yearsRef, film = false, playKey = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Rendering quality. Starts at up to 2x pixel density (1.5x on
    // devices with few cores), within PIXEL_BUDGET, and steps down on
    // its own if frames take too long or come too far apart: to 1.5x,
    // to 1x, then to about 30 frames a second.
    const fewCores = (navigator.hardwareConcurrency || 8) <= 4;
    const quality = { dprCap: fewCores ? 1.5 : 2, cost: 0, gap: 16.7, lastDraw: 0, minGap: 0 };

    let w = 0, h = 0, dpr = 1, raf = 0, last = performance.now();
    // A film waits for its visibility check before starting.
    let visible = !film;
    let anchors = [], spinOffset = 0, yearsShown = '', resized = true;
    let filmStart = null;
    const cur = blend(STEPS[0], STEPS[0], 0);

    // Drag to spin. The offset stays while you're on a section and
    // eases away when you scroll to the next one, so the story's own
    // views still line up.
    const drag = { lon: 0, lat: 0, vLon: 0, vLat: 0, down: false, x: 0, y: 0, step: 0, release: false };
    const onDown = (e) => {
      drag.down = true;
      drag.release = false;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.vLon = drag.vLat = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag.down) return;
      const k = 180 / Math.max(200, Math.min(w, h) * 0.8 * cur.scale);
      const dx = (e.clientX - drag.x) * k;
      const dy = (e.clientY - drag.y) * k;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.lon -= dx;
      drag.lat = Math.max(-60, Math.min(60, drag.lat + dy));
      drag.vLon = -dx * 60;
      drag.vLat = dy * 60;
    };
    const onUp = () => { drag.down = false; };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    const measure = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const fit = Math.max(1, Math.sqrt(PIXEL_BUDGET / Math.max(1, w * h)));
      dpr = Math.min(window.devicePixelRatio || 1, quality.dprCap, fit);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      resized = true;
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

    const filmAt = (t) => {
      const end = FILM[FILM.length - 1];
      if (reduce || t >= end.at) return blend(end, end, 0);
      let i = 0;
      while (i < FILM.length - 2 && t >= FILM[i + 1].at) i++;
      const a = FILM[i], b = FILM[i + 1];
      return blend(a, b, smooth(Math.max(0, Math.min(1, (t - a.at) / (b.at - a.at)))));
    };

    const target = () => {
      const y = window.scrollY;
      const n = Math.min(anchors.length, STEPS.length) - 1;
      if (n < 1 || y <= anchors[0]) return blend(STEPS[0], STEPS[0], 0);
      if (y >= anchors[n]) return blend(STEPS[n], STEPS[n], 0);
      let i = 0;
      while (i < n - 1 && y >= anchors[i + 1]) i++;
      const span = Math.max(1, anchors[i + 1] - anchors[i]);
      const nearest = (y - anchors[i]) / span > 0.5 ? i + 1 : i;
      if (nearest !== drag.step) { drag.step = nearest; drag.release = true; }
      return blend(STEPS[i], STEPS[i + 1], smooth((y - anchors[i]) / span));
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || !w) return;

      let tg;
      if (film) {
        if (filmStart === null) filmStart = now;
        tg = filmAt((now - filmStart) / 1000);
      } else {
        tg = target();
      }

      // Spin where the timeline asks; otherwise settle back to the
      // nearest full turn so the globe lands where the frame wants it.
      if (!reduce && tg.spin > 0.02) spinOffset += dt * SPIN_SPEED * tg.spin;
      else spinOffset += (Math.round(spinOffset / 360) * 360 - spinOffset) * Math.min(1, dt * 2.5);

      // Fling, then settle; let go of the offset on a new section.
      if (!drag.down) {
        drag.lon += drag.vLon * dt;
        drag.lat = Math.max(-60, Math.min(60, drag.lat + drag.vLat * dt));
        const f = Math.exp(-dt * 4);
        drag.vLon *= f;
        drag.vLat *= f;
        if (drag.release) {
          const r = 1 - Math.exp(-dt * 3);
          drag.lon -= drag.lon * r;
          drag.lat -= drag.lat * r;
          if (Math.abs(drag.lon) < 0.05 && Math.abs(drag.lat) < 0.05) { drag.lon = drag.lat = 0; drag.release = false; }
        }
      }

      const before = cur.lon + cur.lat * 3 + cur.drift * 7 + cur.scale * 11 + cur.pins * 13;
      // Catch up faster the further behind the globe is, so a quick
      // scroll doesn't leave it lagging.
      const behind = Math.min(1, Math.abs(tg.drift - cur.drift) + Math.abs(tg.scale - cur.scale) * 0.5 + Math.abs(angleDiff(cur.lon, tg.lon + spinOffset)) / 90);
      const k = reduce ? 1 : 1 - Math.exp(-dt * (5 + 6 * behind));
      cur.lon += angleDiff(cur.lon, tg.lon + spinOffset + drag.lon) * (drag.down ? 1 : k);
      cur.lat += (tg.lat + drag.lat - cur.lat) * (drag.down ? 1 : k);
      for (const key of ['drift', 'scale', 'pins']) cur[key] += (tg[key] - cur[key]) * k;
      const arcs = {};
      for (const key of new Set([...Object.keys(cur.arcs), ...Object.keys(tg.arcs)])) {
        const a = cur.arcs[key] || 0;
        arcs[key] = a + ((tg.arcs[key] || 0) - a) * k;
      }
      let arcMove = 0;
      for (const key of Object.keys(arcs)) arcMove += Math.abs(arcs[key] - (cur.arcs[key] || 0));
      cur.arcs = arcs;
      cur.focus = tg.focus;

      // Nothing moving? Skip the frame.
      const after = cur.lon + cur.lat * 3 + cur.drift * 7 + cur.scale * 11 + cur.pins * 13;
      const still = Math.abs(after - before) < 1e-3 && arcMove < 1e-4 && !drag.down
        && Math.abs(drag.vLon) + Math.abs(drag.vLat) < 0.01 && !(tg.spin > 0.02) && !resized;
      if (still) return;
      if (now - quality.lastDraw < quality.minGap && !resized) return;
      resized = false;
      // Time since the last frame drawn, counted only while the globe
      // keeps moving (a pause in between isn't the computer's fault).
      const gap = now - quality.lastDraw;
      if (gap < 150 && !quality.minGap) quality.gap = quality.gap * 0.9 + gap * 0.1;
      quality.lastDraw = now;
      const t0 = performance.now();

      const years = cur.drift > 0.995 ? 'Today' : `About ${Math.round((1 - cur.drift) * 200)} million years ago`;
      if (years !== yearsShown && yearsRef?.current) {
        yearsShown = years;
        yearsRef.current.textContent = years;
      }

      // ---- layout ----
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.4 * cur.scale;
      const view = { lon: cur.lon, lat: cur.lat, cx, cy, r };
      const V = viewMatrix(cur.lon, cur.lat);
      const mats = plateMatrices(cur.drift);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // ---- sphere + graticule ----
      // The globe's edge is a plain circle; draw it as one.
      const sphere = new Path2D();
      sphere.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill(sphere);

      ctx.strokeStyle = `rgba(${SKY}, 0.13)`;
      ctx.lineWidth = 0.7;
      ctx.stroke(lines(GRATICULE, V, view));

      // ---- land ----
      const land = new Path2D();
      for (const plate of LAND_RINGS) {
        const m = compose(V, mats[plate.id]);
        const p = new Path2D();
        let any = false;
        for (const ring of plate.rings) any = ringPath(p, ring, m, view) || any;
        if (!any) continue;
        land.addPath(p);
        ctx.fillStyle = CONTINENT_COLOR[plate.id] || LOGO.navy;
        ctx.fill(p);
      }
      ctx.save();
      ctx.clip(land);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.1;
      ctx.stroke(lines(LAND_GRID, V, view));
      ctx.restore();
      // White seams between continents, as in the logo.
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.2;
      ctx.lineJoin = 'round';
      ctx.stroke(land);

      // Country borders everywhere, U.S. state lines, and the Great Lakes.
      // Only once the continents have settled (all together, or today's
      // map); they fade in as it settles.
      const settle = Math.max(0, 1 - Math.min(cur.drift, 1 - cur.drift) / 0.02);
      if (settle > 0) {
        const borders = new Path2D();
        for (const b of BORDER_LINES) {
          const m = compose(V, mats[b.plate]);
          for (const l of b.lines) linePath(borders, l, m, view);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.3 + 0.3 * Math.min(1, Math.max(0, cur.scale - 1))) * settle})`;
        ctx.lineWidth = 0.8;
        ctx.stroke(borders);
      }
      const lakes = new Path2D();
      const mNam = compose(V, mats.nam);
      for (const ring of LAKE_RINGS) ringPath(lakes, ring, mNam, view);
      ctx.fillStyle = '#eef3fc';
      ctx.fill(lakes);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 0.8;
      ctx.stroke(lakes);

      // The globe's outline goes on last, so the white seams along the
      // land's edge never show through it.
      ctx.strokeStyle = `rgba(${INK}, 0.7)`;
      ctx.lineWidth = 1.2;
      ctx.stroke(sphere);

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
        // The many lines from headquarters stay thin and light, so the
        // named routes read first.
        const minor = route.group === 'all';
        const lineW = focus ? 2.4 : minor ? 1 : 1.3;
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
        ctx.lineWidth = lineW + (minor ? 1.5 : 2.5);
        ctx.stroke();
        ctx.strokeStyle = focus ? `rgb(${INK})` : `rgba(${INK}, ${minor ? 0.4 : 0.6})`;
        ctx.lineWidth = lineW;
        ctx.stroke();
        if (head && prog > 0.98) {
          drawDot(ctx, head.x, head.y, minor ? 3 : 4);
        } else if (head) {
          const rr = 2.4;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(head.x, head.y, rr + 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(${INK})`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, rr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---- chapter pins ----
      if (cur.pins > 0.01) {
        for (const pin of CHAPTER_PINS) {
          const p = at(pin);
          if (!p.visible) continue;
          ctx.globalAlpha = cur.pins;
          const pr = 3.2;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, pr + 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(${INK})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          const labelAlpha = Math.max(0, Math.min(1, (cur.scale - 1.9) / 0.5)) * Math.max(0, (cur.pins - 0.7) / 0.3);
          // Only headquarters is named, so the map stays readable as
          // chapters are added; the Chapters page names the rest.
          if (labelAlpha > 0.01 && pin.hq) {
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

      // If drawing keeps taking more than ~9 ms, or frames keep coming
      // under ~25 a second (the screen can't paint the pixels in time,
      // which the drawing time doesn't show), this computer is
      // struggling: step down to 1.5x, then 1x pixel density, and stay
      // there. Still slow at 1x, draw every other frame.
      quality.cost = quality.cost * 0.9 + (performance.now() - t0) * 0.1;
      const slow = quality.cost > 9 || quality.gap > 40;
      if (slow && quality.dprCap > 1 && now > 2000) {
        quality.dprCap = quality.dprCap > 1.5 ? 1.5 : 1;
        quality.cost = 0;
        quality.gap = 16.7;
        measure();
      } else if ((quality.cost > 14 || quality.gap > 40) && quality.dprCap === 1 && !quality.minGap && now > 4000) {
        quality.minGap = 30;
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(canvas.parentElement);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    if (stepsRef?.current) ro.observe(stepsRef.current);
    // The film starts once nearly all of the globe is on screen.
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && (!film || e.intersectionRatio >= 0.8 || filmStart !== null); }, { threshold: [0, 0.8] });
    io.observe(canvas.parentElement);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stepsRef, yearsRef, film, playKey]);

  return <canvas ref={canvasRef} className="pg-canvas" aria-hidden="true" />;
}
