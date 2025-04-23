// // src/PathGuide.jsx
// import React, { useMemo } from "react";
// import * as THREE from "three";
// import { CatmullRomCurve3, Vector3 } from "three";

// export default function PathGuide({
//   points = [
//     [0, 0.01, -20],
//     [0, 0.01, 0],
//     [0, 0.01, 40],
//     [0, 0.01, 80],
//   ],
//   arrowCount = 6,
//   tubeRadius = 1,
//   tubeColor = "#ffc107",
//   arrowColor = "#ff9800",
// }) {
//   // 1. build Vector3[] from array of triplets
//   const curve = useMemo(() => {
//     const vecs = points.map((p) => new Vector3(...p));
//     return new CatmullRomCurve3(vecs, false, "catmullrom", 0.2);
//   }, [points]);

//   // 2. tube geometry
//   const tubeGeometry = useMemo(
//     () => new THREE.TubeGeometry(curve, 64, tubeRadius, 8, false),
//     [curve, tubeRadius]
//   );

//   // 3. arrows at evenly spaced t values
//   const arrowTs = useMemo(
//     () =>
//       Array.from({ length: arrowCount }).map(
//         (_, i) => (i + 1) / (arrowCount + 1)
//       ),
//     [arrowCount]
//   );

//   return (
//     <group>
//       {/*  ─── Tube Path ───────────────────────────── */}
//       <mesh geometry={tubeGeometry}>
//         <meshStandardMaterial
//           color={tubeColor}
//           transparent
//           opacity={0.6}
//           side={THREE.DoubleSide}
//         />
//       </mesh>

//       {/*  ─── Arrowheads ──────────────────────────── */}
//       {arrowTs.map((t, i) => {
//         const pos = curve.getPoint(t);
//         const tan = curve.getTangent(t).normalize();
//         const angleY = Math.atan2(tan.x, tan.z);
//         return (
//           <mesh
//             key={i}
//             position={[pos.x, pos.y + 0.02, pos.z]}
//             rotation={[Math.PI / 2, angleY, 0]}
//           >
//             <coneGeometry args={[0.4, 1, 6]} />
//             <meshStandardMaterial color={arrowColor} />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// src/PathGuide.jsx
import React, { useMemo } from "react";
import * as THREE from "three";

export default function PathGuide({
  // world-space start and end points:
  start = [0, 0.01, -20],
  end = [0, 0.01, 80],
  // how far (in world units) to offset the mid control-point
  // positive = curve to the right, negative = curve to the left
  turnOffset = 0,
  // visual tweaks:
  tubeRadius = 0.5,
  tubeColor = "#ffc107",
  arrowCount = 6,
  arrowSize = 0.5,
  arrowColor = "#ff9800",
  curveTension = 0.2,
}) {
  // build our three control‐points: start → mid → end
  const points = useMemo(() => {
    const [sx, sy, sz] = start;
    const [ex, ey, ez] = end;
    const midZ = sz + (ez - sz) * 0.5;
    return [
      new THREE.Vector3(sx, sy, sz),
      new THREE.Vector3(sx + turnOffset, sy, midZ),
      new THREE.Vector3(ex, ey, ez),
    ];
  }, [start, end, turnOffset]);

  // catmull curve through those points
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points, false, "catmullrom", curveTension),
    [points, curveTension]
  );

  // pre‐build the tube geometry
  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, tubeRadius, 8, false),
    [curve, tubeRadius]
  );

  // evenly‐spaced t values for our arrowheads
  const arrowTs = useMemo(
    () =>
      Array.from({ length: arrowCount }, (_, i) => (i + 1) / (arrowCount + 1)),
    [arrowCount]
  );

  return (
    <group>
      {/* ─── Tube ─────────────────────────────── */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={tubeColor}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ─── Arrowheads ───────────────────────── */}
      {arrowTs.map((t, i) => {
        const pos = curve.getPoint(t);
        const tan = curve.getTangent(t).normalize();
        // angleY so that cone points along the curve
        const angleY = Math.atan2(tan.x, tan.z);
        return (
          <mesh
            key={i}
            position={[pos.x, pos.y + tubeRadius, pos.z]}
            rotation={[Math.PI / 2, angleY, 0]}
          >
            <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
            <meshStandardMaterial color={arrowColor} />
          </mesh>
        );
      })}
    </group>
  );
}
