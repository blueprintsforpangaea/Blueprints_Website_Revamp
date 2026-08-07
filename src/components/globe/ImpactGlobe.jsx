import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { HQ, DESTINATIONS } from '../../data/destinations.js';

// react-globe.gl pulls in three.js — lazy-load so it never blocks first paint.
const Globe = lazy(() => import('react-globe.gl'));

// Brand palette — see src/styles/variables.css (Light Blue 1 / Medium Blue 1).
const SKY = '#cbdbff';   // Light Blue 1 — HQ marker + atmosphere
const BLUE = '#0069f3';  // Medium Blue 1 — destination clinics

// The HQ appears in DESTINATIONS too (it receives local shipments);
// exclude it when drawing arcs so we don't draw Ann Arbor → Ann Arbor.
const HQ_CITY = 'Ann Arbor, MI';

// Distinct countries/territories with a documented delivery.
const COUNTRY_COUNT = new Set(DESTINATIONS.map((d) => d.country)).size;

function GlobeCanvas({ size }) {
  const globeRef = useRef(null);

  const points = useMemo(
    () => [
      { ...HQ, isHQ: true, size: 1.1, color: SKY },
      ...DESTINATIONS.map((d) => ({
        name: `${d.city} · ${d.country}`,
        lat: d.lat,
        lng: d.lng,
        isHQ: false,
        size: 0.55,
        color: BLUE,
      })),
    ],
    [],
  );

  const arcs = useMemo(
    () =>
      DESTINATIONS.filter((d) => d.city !== HQ_CITY).map((d) => ({
        startLat: HQ.lat,
        startLng: HQ.lng,
        endLat: d.lat,
        endLng: d.lng,
      })),
    [],
  );

  useEffect(() => {
    const g = globeRef.current;
    if (!g || typeof g.controls !== 'function') return;
    try {
      // Auto-rotate + a gentle starting camera angle.
      const controls = g.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;
      controls.enableZoom = false;
      g.pointOfView({ lat: 18, lng: -55, altitude: 2.4 }, 0);
    } catch {
      /* controls not ready — globe still renders & is draggable */
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={size}
      height={size}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
      atmosphereColor={SKY}
      atmosphereAltitude={0.18}
      // Points
      pointsData={points}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointAltitude={0.012}
      pointRadius="size"
      pointLabel={(d) => (d.isHQ ? 'Ann Arbor — Headquarters' : d.name)}
      // Pulsing HQ ring
      ringsData={[HQ]}
      ringLat="lat"
      ringLng="lng"
      ringColor={() => (t) => `rgba(203,219,255,${1 - t})`}
      ringMaxRadius={5}
      ringPropagationSpeed={2.4}
      ringRepeatPeriod={900}
      // Arcs HQ -> destinations
      arcsData={arcs}
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcColor={() => [SKY, BLUE]}
      arcAltitudeAutoScale={0.45}
      arcStroke={0.5}
      arcDashLength={0.5}
      arcDashGap={0.25}
      arcDashAnimateTime={2600}
    />
  );
}

export default function ImpactGlobe() {
  const wrapRef = useRef(null);
  const [size, setSize] = useState(0);
  const [supported, setSupported] = useState(true);

  // Detect WebGL support; fall back gracefully if unavailable.
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  // Responsive square sizing based on container width.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setSize(Math.min(w, 560));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="globe-stage" ref={wrapRef}>
      {!supported ? (
        <div className="globe-fallback">
          <div>
            <strong style={{ display: 'block', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              {DESTINATIONS.length} destinations · {COUNTRY_COUNT} countries
            </strong>
            From Ann Arbor to clinics worldwide — the interactive globe requires WebGL.
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="globe-loading">
              <div>
                <div className="globe-spinner" />
                Spinning up the globe…
              </div>
            </div>
          }
        >
          {size > 0 && <GlobeCanvas size={size} />}
        </Suspense>
      )}
    </div>
  );
}
