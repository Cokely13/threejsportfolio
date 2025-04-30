// // // // Seesaw.jsx
// // // import React, { useRef } from "react";
// // // import { RigidBody, useRevoluteJoint } from "@react-three/rapier";
// // // import * as THREE from "three";

// // // export default function Seesaw({
// // //   position = [0, 0, 0],
// // //   length = 70,
// // //   thickness = 0.2,
// // //   width = 8,
// // //   pivotHeight = 1,
// // //   initialTilt = Math.PI / 12, // positive so left end is up, right end down
// // // }) {
// // //   const pivotRef = useRef(null);
// // //   const plankRef = useRef(null);

// // //   // Now hinge about Z, with limits in the X-Y plane
// // //   useRevoluteJoint(
// // //     pivotRef,
// // //     plankRef,
// // //     [
// // //       [0, pivotHeight, 0], // top of the cylinder
// // //       [0, 0, 0], // center of the plank
// // //       [0, 0, 1], // <-- Z axis
// // //     ],
// // //     {
// // //       limits: { enabled: true, min: -Math.PI / 4, max: Math.PI / 4 },
// // //       damping: 2,
// // //       stiffness: 10,
// // //     }
// // //   );

// // //   return (
// // //     <group position={position}>
// // //       {/* Big cylinder support */}
// // //       <RigidBody type="fixed">
// // //         <mesh castShadow receiveShadow>
// // //           <cylinderGeometry args={[0.2, 0.2, pivotHeight * 2, 32]} />
// // //           <meshStandardMaterial color="#888" />
// // //         </mesh>
// // //       </RigidBody>

// // //       {/* Plank that tips front ↔ back */}
// // //       <RigidBody
// // //         ref={plankRef}
// // //         type="dynamic"
// // //         colliders="cuboid"
// // //         mass={5}
// // //         friction={1}
// // //         restitution={0}
// // //         position={[0, pivotHeight + thickness / 2, 0]}
// // //         rotation={[0, 0, initialTilt]} // <-- tilt around Z
// // //       >
// // //         <mesh castShadow receiveShadow>
// // //           <boxGeometry args={[length, thickness, width]} />
// // //           <meshStandardMaterial color="#444" />
// // //         </mesh>
// // //       </RigidBody>
// // //     </group>
// // //   );
// // // }

// // // Seesaw.jsx
// // // Seesaw.jsx
import React, { useRef } from "react";
import {
  RigidBody,
  CuboidCollider,
  useSphericalJoint,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Seesaw({
  position = [-35, 0, 50],
  width = 20, // X‐axis length
  length = 3, // Z‐axis width
  thickness = 0.5, // Y‐axis thickness
  pivotRadius = 0.25,
  pivotHeight = 1,
  maxAngle = Math.PI / 6,
  playerRef, // your <Player /> RigidBody ref
}) {
  const supportRef = useRef(null);
  const boardRef = useRef(null);

  // anchor the board to the top of the cylinder support
  useSphericalJoint(
    supportRef,
    boardRef,
    [
      [0, pivotHeight / 2, 0], // world‐space point on the cylinder
      [0, 0, 0], // local‐space point on the board
    ],
    {
      // no extra options needed; full 3-axis rotation allowed
    }
  );

  // every frame, tip the board around Z based on player X
  useFrame(() => {
    if (!playerRef.current || !playerRef.current || !boardRef.current) return;
    const px = playerRef.current.translation().x;
    // map player offset onto [-1,1]
    const t = THREE.MathUtils.clamp((px - position[0]) / (width / 2), -1, 1);
    boardRef.current.setNextKinematicRotation(
      { x: 0, y: 0, z: t * maxAngle },
      true
    );
  });

  return (
    <group position={position}>
      {/* Cylinder support (fixed) */}
      <RigidBody
        ref={supportRef}
        type="fixed"
        colliders={false}
        position={[0, pivotHeight / 2, 0]}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry
            args={[pivotRadius, pivotRadius, pivotHeight, 32]}
          />
          <meshStandardMaterial color="#888" />
        </mesh>
      </RigidBody>

      {/* Board (we drive it kinematically) */}
      <RigidBody
        ref={boardRef}
        type="kinematicPosition"
        colliders={false}
        position={[0, pivotHeight + thickness / 2, 0]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, thickness, length]} />
          <meshStandardMaterial color="#855" />
        </mesh>
        {/* walkable collider */}
        <CuboidCollider args={[width / 2, thickness / 2, length / 2]} />
      </RigidBody>
    </group>
  );
}
