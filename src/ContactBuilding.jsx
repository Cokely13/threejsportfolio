// import { RigidBody } from "@react-three/rapier";
// import { Text } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef, useState, useEffect } from "react";

// export default function ContactBuilding({
//   position,
//   playerRef,
//   onEnter,
//   popupVisible,
// }) {
//   const buildingRef = useRef();
//   const [entered, setEntered] = useState(false);

//   useFrame(() => {
//     if (!playerRef?.current || entered) return; // don't repeat after triggered once

//     const playerPosition = playerRef.current.translation();
//     if (!playerPosition) return;

//     const dx = playerPosition.x - position[0];
//     const dz = playerPosition.z - position[2];
//     const distance = Math.sqrt(dx * dx + dz * dz);

//     if (distance < 8) {
//       // 🎯 Distance small enough
//       setEntered(true);
//       onEnter(); // 🚀 CALL THE FUNCTION to open popup
//     }
//   });

//   useEffect(() => {
//     if (!popupVisible) {
//       setEntered(false);
//     }
//   }, [popupVisible]);

//   return (
//     <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
//       <mesh position={position}>
//         <boxGeometry args={[10, 10, 10]} />
//         <meshStandardMaterial color="#d35400" />
//       </mesh>

//       <Text
//         position={[position[0], position[1] + 7, position[2] + 5]}
//         fontSize={1}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         Contact Me
//       </Text>
//     </RigidBody>
//   );
// }

// import { RigidBody } from "@react-three/rapier";
// import { Text, useGLTF } from "@react-three/drei"; // 👈 import useGLTF
// import { useFrame } from "@react-three/fiber";
// import { useRef, useState, useEffect } from "react";

// export default function ContactBuilding({
//   position,
//   playerRef,
//   onEnter,
//   popupVisible,
// }) {
//   const buildingRef = useRef();
//   const [entered, setEntered] = useState(false);

//   const { scene } = useGLTF("/models/firstBuild.glb"); // 👈 load your glb

//   useFrame(() => {
//     if (!playerRef?.current || entered) return;

//     const playerPosition = playerRef.current.translation();
//     if (!playerPosition) return;

//     const dx = playerPosition.x - position[0];
//     const dz = playerPosition.z - position[2];
//     const distance = Math.sqrt(dx * dx + dz * dz);

//     if (distance < 8) {
//       setEntered(true);
//       onEnter();
//     }
//   });

//   useEffect(() => {
//     if (!popupVisible) {
//       setEntered(false);
//     }
//   }, [popupVisible]);

//   return (
//     <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
//       {/* 🏢 Replace the box mesh with your glb model */}
//       <primitive
//         object={scene}
//         position={position}
//         scale={[2, 1.5, 2]}
//         rotation={[0, -Math.PI / 2, 0]}
//       />

//       {/* Text Floating Above the Building */}
//       <Text
//         position={[position[0], position[1] + 15, position[2] + 5]} // raised a little higher
//         fontSize={5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         Contact Me
//       </Text>
//     </RigidBody>
//   );
// }

import { RigidBody } from "@react-three/rapier";
import { Text, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import { TextureLoader } from "three";

export default function ContactBuilding({
  position = [0, 0, -90],
  playerRef,
  onEnter,
  popupVisible,
}) {
  const buildingRef = useRef();
  const [entered, setEntered] = useState(false);

  const { scene } = useGLTF("/models/firstBuild.glb");
  const blueMetalTexture = useLoader(TextureLoader, "/textures/roof.jpg");

  const texturedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material.map = blueMetalTexture;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene, blueMetalTexture]);

  useFrame(() => {
    if (!playerRef?.current || entered) return;

    const playerPosition = playerRef.current.translation();
    if (!playerPosition) return;

    const dx = playerPosition.x - position[0];
    const dz = playerPosition.z - position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 8) {
      setEntered(true);
      onEnter();
    }
  });

  useEffect(() => {
    if (!popupVisible) {
      setEntered(false);
    }
  }, [popupVisible]);

  return (
    <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
      <primitive
        object={texturedScene}
        position={position}
        scale={[2, 1.5, 2]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* <Text
        position={[position[0], position[1] + 15, position[2] + 5]}
        fontSize={5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Contact Me
      </Text> */}
    </RigidBody>
  );
}
