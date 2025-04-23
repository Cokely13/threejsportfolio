// // // src/WelcomeMat.jsx
// // import React, { useRef, useMemo } from "react";
// // import { useFrame } from "@react-three/fiber";
// // import * as THREE from "three";

// // export default function WelcomeMat({
// //   position = [0, 0.01, -20],
// //   width = 10,
// //   height = 4,
// //   color = "#ffeb3b",
// //   ringColor = "#ffee58",
// //   thickness = 0.2,
// // }) {
// //   const frameRef = useRef();

// //   // build a ShapeGeometry with a rectangular hole
// //   const frameGeo = useMemo(() => {
// //     const shape = new THREE.Shape();
// //     // outer rect
// //     shape.moveTo(-width / 2, -height / 2);
// //     shape.lineTo(-width / 2, height / 2);
// //     shape.lineTo(width / 2, height / 2);
// //     shape.lineTo(width / 2, -height / 2);
// //     shape.lineTo(-width / 2, -height / 2);

// //     // inner “cut‐out”
// //     const hole = new THREE.Path();
// //     const w2 = width / 2 - thickness;
// //     const h2 = height / 2 - thickness;
// //     hole.moveTo(-w2, -h2);
// //     hole.lineTo(-w2, h2);
// //     hole.lineTo(w2, h2);
// //     hole.lineTo(w2, -h2);
// //     hole.lineTo(-w2, -h2);
// //     shape.holes.push(hole);

// //     // use ShapeGeometry for flat shapes
// //     return new THREE.ShapeGeometry(shape);
// //   }, [width, height, thickness]);

// //   useFrame((state) => {
// //     if (frameRef.current) {
// //       frameRef.current.material.emissiveIntensity =
// //         0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.25;
// //     }
// //   });

// //   return (
// //     <group position={position}>
// //       {/* mat base */}
// //       <mesh rotation={[-Math.PI / 2, 0, 0]}>
// //         <planeGeometry args={[width, height]} />
// //         <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
// //       </mesh>

// //       {/* glowing rectangular frame */}
// //       <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={frameGeo} ref={frameRef}>
// //         <meshStandardMaterial
// //           color={ringColor}
// //           emissive={ringColor}
// //           emissiveIntensity={1}
// //           transparent
// //           opacity={0.8}
// //           side={THREE.DoubleSide}
// //         />
// //       </mesh>
// //     </group>
// //   );
// // }

// // src/WelcomeMat.jsx
// import React, { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function WelcomeMat({
//   position = [0, 0.01, -20],
//   width = 10,
//   height = 4,
//   color = "#ffeb3b",
//   ringColor = "#ffee58",
//   thickness = 0.2,
// }) {
//   const baseRef = useRef(); // for the flat plane
//   const frameRef = useRef(); // for the hollow frame

//   // build our hollow‐rectangle frame geometry
//   const frameGeo = useMemo(() => {
//     const shape = new THREE.Shape();
//     // outer rect
//     shape.moveTo(-width / 2, -height / 2);
//     shape.lineTo(-width / 2, height / 2);
//     shape.lineTo(width / 2, height / 2);
//     shape.lineTo(width / 2, -height / 2);
//     shape.lineTo(-width / 2, -height / 2);

//     // inner “hole”
//     const hole = new THREE.Path();
//     const w2 = width / 2 - thickness;
//     const h2 = height / 2 - thickness;
//     hole.moveTo(-w2, -h2);
//     hole.lineTo(-w2, h2);
//     hole.lineTo(w2, h2);
//     hole.lineTo(w2, -h2);
//     hole.lineTo(-w2, -h2);
//     shape.holes.push(hole);

//     return new THREE.ShapeGeometry(shape);
//   }, [width, height, thickness]);

//   // pulse both materials each frame
//   useFrame(({ clock }) => {
//     const intensity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 2;
//     if (baseRef.current) {
//       baseRef.current.material.emissiveIntensity = intensity;
//     }
//     if (frameRef.current) {
//       frameRef.current.material.emissiveIntensity = intensity;
//     }
//   });

//   return (
//     <group position={position}>
//       {/* mat base */}
//       <mesh ref={baseRef} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[width, height]} />
//         <meshStandardMaterial
//           color={color}
//           emissive={color}
//           emissiveIntensity={3}
//           roughness={0.5}
//           metalness={0.1}
//         />
//       </mesh>

//       {/* glowing rectangular frame */}
//       <mesh ref={frameRef} rotation={[-Math.PI / 2, 0, 0]} geometry={frameGeo}>
//         <meshStandardMaterial
//           color={ringColor}
//           emissive={ringColor}
//           emissiveIntensity={0.3}
//           transparent
//           opacity={0.8}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
//     </group>
//   );
// }

// src/WelcomeMat.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WelcomeMat({
  position = [0, 0.01, -20],
  width = 10,
  height = 4,
  color = "#ffeb3b",
  ringColor = "#ffee58",
  thickness = 0.2,
  pulseSpeed = 2, // how fast it pulses
  pulseAmount = 0.05, // scale variation
}) {
  const groupRef = useRef();
  const frameRef = useRef();

  // 1) Build a rectangular frame shape with a hole
  const frameGeo = useMemo(() => {
    const shape = new THREE.Shape()
      .moveTo(-width / 2, -height / 2)
      .lineTo(-width / 2, height / 2)
      .lineTo(width / 2, height / 2)
      .lineTo(width / 2, -height / 2)
      .lineTo(-width / 2, -height / 2);

    const hole = new THREE.Path();
    const w2 = width / 2 - thickness;
    const h2 = height / 2 - thickness;
    hole
      .moveTo(-w2, -h2)
      .lineTo(-w2, h2)
      .lineTo(w2, h2)
      .lineTo(w2, -h2)
      .lineTo(-w2, -h2);

    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape);
  }, [width, height, thickness]);

  // 2) On every frame, pulse both the group scale and the frame emissive
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * pulseSpeed) * pulseAmount;

    // scale the entire mat
    if (groupRef.current) {
      groupRef.current.scale.set(pulse, pulse, pulse);
    }

    // pulse the frame glow
    if (frameRef.current) {
      frameRef.current.material.emissiveIntensity =
        0.5 + Math.sin(t * pulseSpeed) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* mat base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* glowing rectangular frame */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={frameGeo} ref={frameRef}>
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
