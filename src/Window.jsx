// // src/components/Window.jsx
// import React from "react";

// export default function Window({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   width = 1,
//   height = 1.5,
//   thickness = 0.05,
//   color = "#88ccff",
//   opacity = 0.4,
//   roughness = 0.1,
//   metalness = 0,
// }) {
//   return (
//     <mesh position={position} rotation={rotation}>
//       <boxGeometry args={[width, height, thickness]} />
//       <meshStandardMaterial
//         color={color}
//         transparent
//         opacity={opacity}
//         roughness={roughness}
//         metalness={metalness}
//       />
//     </mesh>
//   );
// }

// src/components/Window.jsx
// import React, { useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function Window({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   width = 2,
//   height = 2.5,
//   thickness = 1,
//   frameColor = "#333333",
//   glassColor = "blue",
//   glassOpacity = 0.2,
//   glassRoughness = 0.1,
//   glassMetalness = 0.9,
//   envMapIntensity = 1, // how reflective the glass is
// }) {
//   // precompute half sizes
//   const w2 = width / 2;
//   const h2 = height / 2;
//   const t = thickness;

//   // optional subtle fresnel effect on glass
//   const glassRef = React.useRef();
//   useFrame(({ clock }) => {
//     const fresnel =
//       0.1 + 0.9 * Math.abs(Math.sin(clock.getElapsedTime() * 1.2));
//     if (glassRef.current)
//       glassRef.current.material.envMapIntensity = fresnel * envMapIntensity;
//   });

//   return (
//     <group position={position} rotation={rotation}>
//       {/* frame */}
//       {[
//         // left
//         { x: -w2 + t / 2, y: 0, w: t, h: height },
//         // right
//         { x: w2 - t / 2, y: 0, w: t, h: height },
//         // top
//         { x: 0, y: h2 - t / 2, w: width, h: t },
//         // bottom
//         { x: 0, y: -h2 + t / 2, w: width, h: t },
//       ].map(({ x, y, w, h }, i) => (
//         <mesh key={i} position={[x, y, 0]} castShadow receiveShadow>
//           <boxGeometry args={[w, h, t]} />
//           <meshStandardMaterial
//             color={frameColor}
//             metalness={0.2}
//             roughness={0.7}
//           />
//         </mesh>
//       ))}

//       {/* glass pane */}
//       <mesh
//         ref={glassRef}
//         position={[0, 0, -t / 2]}
//         castShadow={false}
//         receiveShadow={false}
//       >
//         <planeGeometry args={[width - t * 2, height - t * 2]} />
//         <meshStandardMaterial
//           color={glassColor}
//           transparent
//           opacity={glassOpacity}
//           roughness={glassRoughness}
//           metalness={glassMetalness}
//           envMapIntensity={envMapIntensity}
//         />
//       </mesh>
//     </group>
//   );
// }

// src/Window.jsx
import React from "react";

export default function Window({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 2,
  height = 2.5,
  thickness = 0.2,
  frameColor = "#333333",
  centerColor = "#ffffff",
}) {
  // half-sizes
  const w2 = width / 2;
  const h2 = height / 2;
  const t2 = thickness / 2;

  // frame panels: left, right, top, bottom
  const panels = [
    { x: -w2 + t2, y: 0, w: thickness, h: height }, // left
    { x: +w2 - t2, y: 0, w: thickness, h: height }, // right
    { x: 0, y: +h2 - t2, w: width, h: thickness }, // top
    { x: 0, y: -h2 + t2, w: width, h: thickness }, // bottom
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      {panels.map(({ x, y, w, h }, i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[w, h, thickness]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Center panel */}
      <mesh position={[0, 0, -t2]}>
        <planeGeometry args={[width - thickness, height - thickness]} />
        <meshStandardMaterial color={centerColor} metalness={0} roughness={1} />
      </mesh>
    </group>
  );
}
