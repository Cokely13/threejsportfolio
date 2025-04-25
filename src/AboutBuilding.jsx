// import { useGLTF } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// export default function AboutBuilding({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [3, 2, 4],
//   onEnter, // fire this when player walks in
// }) {
//   const { scene } = useGLTF("/models/firstBuild.glb");

//   return (
//     <group position={position} rotation={rotation} scale={scale}>
//       <RigidBody type="fixed" colliders={false}>
//         {/* visible mesh */}
//         <primitive object={scene} castShadow />
//         {/* sensor trigger in front of the door */}
//         <CuboidCollider
//           sensor
//           args={[3, 3, 3]}
//           position={[0, 2, 1]} // tweak to sit right inside the doorway
//           onIntersectionEnter={({ other }) => {
//             if (other.rigidBodyObject?.name === "player") {
//               onEnter();
//             }
//           }}
//         />
//       </RigidBody>
//     </group>
//   );
// }

// src/ContactBuilding.jsx  (renamed to AboutBuilding.jsx)
// import { useGLTF, useTexture } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import * as THREE from "three";
// import { useEffect } from "react";

// export default function AboutBuilding({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [3, 2, 4],
//   onEnter,
// }) {
//   // 1) load your GLB
//   const { scene } = useGLTF("/models/firstBuild.glb");

//   // 2) load MixConcrete PBR maps for walls
//   const [wallColorMap, wallNormalMap, wallRoughnessMap] = useTexture([
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Color.jpg",
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_NormalDX.jpg",
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Roughness.jpg",
//   ]);

//   // 3) load mixedRoofTile PBR maps for roof
//   const [roofColorMap, roofNormalMap, roofRoughnessMap] = useTexture([
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Color.jpg",
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_NormalDX.jpg",
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Roughness.jpg",
//   ]);

//   // 4) set wrap & tiling
//   [wallColorMap, wallNormalMap, wallRoughnessMap].forEach((tex) => {
//     tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
//     tex.repeat.set(4, 4);
//   });
//   [roofColorMap, roofNormalMap, roofRoughnessMap].forEach((tex) => {
//     tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
//     tex.repeat.set(6, 6);
//   });

//   // 5) build materials
//   const wallMaterial = new THREE.MeshStandardMaterial({
//     map: wallColorMap,
//     normalMap: wallNormalMap,
//     roughnessMap: wallRoughnessMap,
//     roughness: 1,
//     metalness: 0,
//   });
//   const roofMaterial = new THREE.MeshStandardMaterial({
//     map: roofColorMap,
//     normalMap: roofNormalMap,
//     roughnessMap: roofRoughnessMap,
//     roughness: 1,
//     metalness: 0,
//   });

//   // 6) apply materials once
//   useEffect(() => {
//     scene.traverse((child) => {
//       if (!child.isMesh) return;
//       const lname = child.name.toLowerCase();
//       if (lname.includes("roof")) {
//         child.material = roofMaterial;
//       } else {
//         child.material = wallMaterial;
//       }
//       child.castShadow = child.receiveShadow = true;
//       child.material.needsUpdate = true;
//     });
//   }, [scene, wallMaterial, roofMaterial]);

//   return (
//     <group position={position} rotation={rotation} scale={scale}>
//       <RigidBody type="fixed" colliders={false}>
//         {/* visible building */}
//         <primitive object={scene} castShadow />

//         {/* trigger zone */}
//         <CuboidCollider
//           sensor
//           args={[3, 3, 3]}
//           position={[0, 2, 1]}
//           onIntersectionEnter={({ other }) => {
//             if (other.rigidBodyObject?.name === "player") {
//               onEnter();
//             }
//           }}
//         />
//       </RigidBody>
//     </group>
//   );
// }

// src/AboutBuilding.jsx
// src/AboutBuilding.jsx
// src/AboutBuilding.jsx
// import { useGLTF, useTexture } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import React, { useEffect, useRef, useState } from "react";
// import DoorFrame from "./DoorFrame";
// import Window from "./Window";
// import Lantern from "./Lantern";
// import Marquee from "./Marquee";
// import * as THREE from "three";

// export default function AboutBuilding({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [3, 2, 4],
//   onEnter,
// }) {
//   // 1) Load the glb
//   const { scene } = useGLTF("/models/firstBuild.glb");
//   const sceneRef = useRef();

//   // 2) Load your PBR wall + roof textures (same as before)
//   const [wallColorMap, wallNormalMap, wallRoughnessMap] = useTexture([
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Color.jpg",
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_NormalDX.jpg",
//     "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Roughness.jpg",
//   ]);
//   const [roofColorMap, roofNormalMap, roofRoughnessMap] = useTexture([
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Color.jpg",
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_NormalDX.jpg",
//     "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Roughness.jpg",
//   ]);

//   // wrap & tile
//   [wallColorMap, wallNormalMap, wallRoughnessMap].forEach((t) => {
//     t.wrapS = t.wrapT = THREE.RepeatWrapping;
//     t.repeat.set(4, 4);
//   });
//   [roofColorMap, roofNormalMap, roofRoughnessMap].forEach((t) => {
//     t.wrapS = t.wrapT = THREE.RepeatWrapping;
//     t.repeat.set(6, 6);
//   });

//   // build materials
//   const wallMaterial = new THREE.MeshStandardMaterial({
//     map: wallColorMap,
//     normalMap: wallNormalMap,
//     roughnessMap: wallRoughnessMap,
//     roughness: 1,
//     metalness: 0,
//   });
//   const roofMaterial = new THREE.MeshStandardMaterial({
//     map: roofColorMap,
//     normalMap: roofNormalMap,
//     roughnessMap: roofRoughnessMap,
//     roughness: 1,
//     metalness: 0,
//   });

//   // apply to model on mount
//   useEffect(() => {
//     scene.traverse((c) => {
//       if (!c.isMesh) return;
//       c.castShadow = c.receiveShadow = true;
//       if (c.name.toLowerCase().includes("roof")) c.material = roofMaterial;
//       else c.material = wallMaterial;
//       c.material.needsUpdate = true;
//     });
//   }, [scene, wallMaterial, roofMaterial]);

//   return (
//     <group position={position} rotation={rotation} scale={scale}>
//       <RigidBody type="fixed" colliders={false}>
//         {/* 1) your building shell */}
//         <primitive ref={sceneRef} object={scene} castShadow />

//         {/* 5) trigger‐zone (exactly as before) */}
//         <CuboidCollider
//           sensor
//           args={[3, 3, 3]}
//           position={[0, 2, 1]}
//           onIntersectionEnter={({ other }) => {
//             if (other.rigidBodyObject?.name === "player") onEnter();
//           }}
//         />

//         {/* 6) debug wireframe showing the collider (optional) */}
//         <mesh>
//           <boxGeometry args={[3 * 2, 3 * 2, 3 * 2]} />
//           <meshBasicMaterial
//             color="hotpink"
//             wireframe
//             transparent
//             opacity={0.3}
//           />
//         </mesh>
//       </RigidBody>
//     </group>
//   );
// }

// src/AboutBuilding.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

// your new decorative pieces
import DoorFrame from "./DoorFrame";
import Window from "./Window";
import Lantern from "./Lantern";
import Marquee from "./Marquee";

export default function AboutBuilding({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [3, 2, 4],
  onEnter,
}) {
  // 1) load model
  const { scene } = useGLTF("/models/firstBuild.glb");
  const sceneRef = useRef();

  // 2) load PBR textures (unchanged)
  const [wallColorMap, wallNormalMap, wallRoughnessMap] = useTexture([
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Color.jpg",
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_NormalDX.jpg",
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Roughness.jpg",
  ]);
  const [roofColorMap, roofNormalMap, roofRoughnessMap] = useTexture([
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Color.jpg",
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_NormalDX.jpg",
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Roughness.jpg",
  ]);

  // 3) set wrapping & tiling
  [wallColorMap, wallNormalMap, wallRoughnessMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(4, 4);
  });
  [roofColorMap, roofNormalMap, roofRoughnessMap].forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 6);
  });

  // 4) build materials
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColorMap,
    normalMap: wallNormalMap,
    roughnessMap: wallRoughnessMap,
    roughness: 1,
    metalness: 0,
  });
  const roofMaterial = new THREE.MeshStandardMaterial({
    map: roofColorMap,
    normalMap: roofNormalMap,
    roughnessMap: roofRoughnessMap,
    roughness: 1,
    metalness: 0,
  });

  // 5) apply materials on mount
  useEffect(() => {
    scene.traverse((c) => {
      if (!c.isMesh) return;
      c.castShadow = c.receiveShadow = true;
      if (c.name.toLowerCase().includes("roof")) c.material = roofMaterial;
      else c.material = wallMaterial;
      c.material.needsUpdate = true;
    });
  }, [scene, wallMaterial, roofMaterial]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RigidBody type="fixed" colliders={false}>
        {/* — your building shell — */}
        <primitive ref={sceneRef} object={scene} castShadow />

        {/* — DoorFrame (tweak these numbers) — */}
        <DoorFrame
          position={[4, -0.2, -0.4]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 1]}
        />

        {/* — Two windows (left & right) — */}
        <Window
          position={[4, 5, 2.15]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 0.1]}
        />
        <Window
          position={[4, 5, -3]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 0.1]}
        />

        {/* — Marquee above the door — */}
        <Marquee
          position={[4, 4.4, -0.45]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.5, 0.3, 0.1]}
        />

        {/* — Lanterns flanking the door — */}
        <Lantern position={[4, 2.5, 1]} rotation={[0, 0, 0]} />
        <Lantern position={[4, 2.5, -1.8]} rotation={[0, 0, 0]} />

        {/* — trigger‐zone sensor — */}
        <CuboidCollider
          sensor
          args={[3, 3, 3]}
          position={[0, 2, 1]}
          onIntersectionEnter={({ other }) => {
            if (other.rigidBodyObject?.name === "player") onEnter();
          }}
        />

        {/* — debug wireframe for collider — */}
        <mesh>
          <boxGeometry args={[3 * 2, 3 * 2, 3 * 2]} />
          <meshBasicMaterial
            color="hotpink"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </RigidBody>
    </group>
  );
}
