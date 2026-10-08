import { useMemo } from 'react';
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo';
import { plateMatrices, plateGeometry, PLATE_COLOR, LOGO } from './plates.js';

// The logo, redrawn: Pangaea in the logo's three blues with white
// latitude and longitude lines on the land, inside the outline of the
// whole sphere. Decorative.
const S = 600;
const LAND = plateGeometry(plateMatrices(0)).filter((g) => g.id !== 'ant');

export default function LogoGlobe({ className }) {
  const d = useMemo(() => {
    // Turned to face Pangaea, as in the logo.
    const proj = geoOrthographic().scale(S / 2 - 4).translate([S / 2, S / 2]).rotate([5, -6, -8]);
    const path = geoPath(proj);
    return {
      land: LAND.map((g) => ({ id: g.id, d: path(g) })),
      grid: path(geoGraticule().step([15, 15])()),
      sphere: path({ type: 'Sphere' }),
    };
  }, []);

  return (
    <svg className={className} viewBox={`0 0 ${S} ${S}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="logo-globe-land">
          {d.land.map((g) => <path key={g.id} d={g.d} />)}
        </clipPath>
      </defs>
      {/* The whole sphere: its outline and the grid across the ocean. */}
      <path d={d.sphere} fill="#fff" fillOpacity="0.5" />
      <path d={d.grid} fill="none" stroke={LOGO.navy} strokeOpacity="0.25" strokeWidth="1.5" />
      {d.land.map((g) => <path key={g.id} d={g.d} fill={PLATE_COLOR[g.id] || LOGO.navy} />)}
      <path d={d.grid} clipPath="url(#logo-globe-land)" fill="none" stroke="#fff" strokeWidth="3" />
      {d.land.map((g) => <path key={`s-${g.id}`} d={g.d} fill="none" stroke="#fff" strokeWidth="2.5" />)}
      <path d={d.sphere} fill="none" stroke={LOGO.navy} strokeOpacity="0.6" strokeWidth="2.5" />
    </svg>
  );
}
