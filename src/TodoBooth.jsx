// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { Text } from "@react-three/drei";

// export default function TodoBooth({ playerRef, onEnter }) {
//   return (
//     <>
//       {/* Group to rotate entire booth */}
//       <group position={[-20, 0, 70]} rotation={[0, Math.PI / 2, 0]}>
//         <RigidBody type="fixed" colliders={false}>
//           {/* Back wall */}
//           <mesh position={[0, 1.7, -1]}>
//             <boxGeometry args={[6, 8, 0.2]} />
//             <meshStandardMaterial color="#8B4513" />
//           </mesh>
//           {/* Back wall collider */}
//           <CuboidCollider args={[3, 4, 0.1]} position={[0, 4, -1]} />

//           {/* Left wall */}
//           <mesh position={[-3, 2, 0]}>
//             <boxGeometry args={[0.2, 7, 2]} />
//             <meshStandardMaterial color="#5a3220" />
//           </mesh>
//           <CuboidCollider args={[0.1, 3.5, 1]} position={[-3, 2, 0]} />

//           {/* Right wall */}
//           <mesh position={[3, 2, 0]}>
//             <boxGeometry args={[0.2, 7, 2]} />
//             <meshStandardMaterial color="#5a3220" />
//           </mesh>
//           <CuboidCollider args={[0.1, 3.5, 1]} position={[3, 2, 0]} />

//           {/* Roof */}
//           <mesh position={[0, 5.6, 0]}>
//             <boxGeometry args={[6.2, 0.2, 2]} />
//             <meshStandardMaterial color="#654321" />
//           </mesh>

//           {/* Glowing screen */}
//           <mesh position={[0, 3.5, -0.5]}>
//             <planeGeometry args={[4.5, 2.5]} />
//             <meshStandardMaterial
//               color="#222"
//               emissive="#00ffff"
//               emissiveIntensity={0.5}
//             />
//           </mesh>

//           {/* Floating label */}
//           <Text
//             position={[0, 9.5, 0]}
//             fontSize={1.2}
//             color="white"
//             anchorX="center"
//             anchorY="middle"
//           >
//             TO DO
//           </Text>

//           {/* 👉 Trigger zone now placed inside booth */}
//           <CuboidCollider
//             sensor
//             args={[2.5, 2.5, 1]}
//             position={[0, 2.5, 0]}
//             onIntersectionEnter={({ other }) => {
//               if (other.rigidBodyObject?.name === "player") {
//                 onEnter();
//               }
//             }}
//           />
//         </RigidBody>
//       </group>
//     </>
//   );
// }

// src/TodoBooth.jsx
import React from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import WelcomeMat from "./WelcomeMat";

export default function TodoBooth({
  playerRef,
  onEnter,
  // you can override where the booth sits:
  position = [-20, 0, 70],
  rotation = [0, Math.PI / 2, 0],
  matWidth = 5,
  matHeight = 4,
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* ─── Booth Structure ──────────────────────────── */}
      <RigidBody type="fixed" colliders={false}>
        {/* Back wall */}
        <mesh position={[0, 1.7, -1]}>
          <boxGeometry args={[6, 8, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Side walls */}
        <mesh position={[-3, 2, 0]}>
          <boxGeometry args={[0.2, 7, 2]} />
          <meshStandardMaterial color="#5a3220" />
        </mesh>
        <mesh position={[3, 2, 0]}>
          <boxGeometry args={[0.2, 7, 2]} />
          <meshStandardMaterial color="#5a3220" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 5.6, 0]}>
          <boxGeometry args={[6.2, 0.2, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Glowing “TO DO” screen */}
        <mesh position={[0, 3.5, -0.5]}>
          <planeGeometry args={[4.5, 2.5]} />
          <meshStandardMaterial
            color="#222"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Floating label */}
        <Text
          position={[0, 9.5, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          TO DO
        </Text>
      </RigidBody>

      {/* ─── Welcome Mat ─────────────────────────────── */}
      <WelcomeMat
        position={[0, 0.01, 1]}
        width={matWidth}
        height={matHeight}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.15}
      />

      {/* ─── Invisible Sensor Over The Mat ──────────── */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          sensor
          args={[matWidth / 2, 0.1, matHeight / 2]}
          position={[0, 0.05, 0]}
          onIntersectionEnter={({ other }) => {
            if (other.rigidBodyObject?.name === "player") {
              onEnter();
            }
          }}
        />
      </RigidBody>
    </group>
  );
}
