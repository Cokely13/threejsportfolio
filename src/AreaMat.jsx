// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { CuboidCollider } from "@react-three/rapier";
// import * as THREE from "three";

// /**
//  * A pulsing mat area that fires onEnter when the player walks over it.
//  *
//  * Props:
//  *  - width, height: size of the mat in world units
//  *  - thickness: how thick the frame border is
//  *  - position, rotation: where to place it
//  *  - color, ringColor: mat and frame colors
//  *  - onEnter: () => void callback when the player enters
//  */
// export default function AreaMat({
//   width = 10,
//   height = 4,
//   thickness = 0.2,
//   position = [0, 0.01, 0],
//   rotation = [0, Math.PI / 2, 0],
//   color = "#ffeb3b",
//   ringColor = "#ffee58",
//   onEnter = () => {},
// }) {
//   const group = useRef();
//   const frame = useRef();

//   // simple pulse animation
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     const scale = 1 + Math.sin(t * 2) * 0.05;
//     group.current.scale.set(scale, 1, scale);
//     frame.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3;
//   });

//   // build the shape for the frame once
//   const frameGeo = React.useMemo(() => {
//     const shape = new THREE.Shape()
//       .moveTo(-width / 2, -height / 2)
//       .lineTo(-width / 2, height / 2)
//       .lineTo(width / 2, height / 2)
//       .lineTo(width / 2, -height / 2)
//       .closePath();

//     const hole = new THREE.Path()
//       .moveTo(-width / 2 + thickness, -height / 2 + thickness)
//       .lineTo(-width / 2 + thickness, height / 2 - thickness)
//       .lineTo(width / 2 - thickness, height / 2 - thickness)
//       .lineTo(width / 2 - thickness, -height / 2 + thickness)
//       .closePath();

//     shape.holes.push(hole);
//     return new THREE.ShapeGeometry(shape);
//   }, [width, height, thickness]);

//   return (
//     <group ref={group} position={position} rotation={rotation}>
//       {/* base mat */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[width, height]} />
//         <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
//       </mesh>

//       {/* glowing frame */}
//       <mesh ref={frame} rotation={[-Math.PI / 2, 0, 0]} geometry={frameGeo}>
//         <meshStandardMaterial
//           color={ringColor}
//           emissive={ringColor}
//           emissiveIntensity={1}
//           transparent
//           opacity={0.8}
//           side={THREE.DoubleSide}
//         />
//       </mesh>

//       {/* invisible trigger collider */}
//       <CuboidCollider
//         sensor
//         args={[width / 2, 0.1, height / 2]}
//         position={[0, 0.05, 0]}
//         onIntersectionEnter={({ rigidBody }) => {
//           if (rigidBody?.userData?.isPlayer) onEnter();
//         }}
//       />
//     </group>
//   );
// }

import React, { useRef } from "react";
import { CuboidCollider } from "@react-three/rapier";
import { Text } from "@react-three/drei";

/**
 * A static mat with a label that fires onEnter when the player walks over it.
 *
 * Props:
 *   - width, height: size of the mat in world units
 *   - position, rotation: where to place it
 *   - matColor: background color of the mat
 *   - textColor: color of the area name text
 *   - areaName: string to display on the mat
 *   - onEnter: () => void callback when the player steps on it
 */
export default function AreaMat({
  width = 10,
  height = 4,
  position = [0, 0.01, 0],
  rotation = [0, Math.PI / 2, 0],
  matColor = "#333333", // dark grey mat
  textColor = "red", // red label
  areaName = "Area", // default label text
  onEnter = () => {},
}) {
  const group = useRef();

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Base mat plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={matColor}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Area label */}
      <Text
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {areaName}
      </Text>

      {/* Invisible trigger for player */}
      <CuboidCollider
        sensor
        args={[width / 2, 0.1, height / 2]}
        position={[0, 0.05, 0]}
        onIntersectionEnter={({ rigidBody }) => {
          if (rigidBody?.userData?.isPlayer) onEnter();
        }}
      />
    </group>
  );
}
