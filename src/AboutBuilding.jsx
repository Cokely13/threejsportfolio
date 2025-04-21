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
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useEffect } from "react";

export default function AboutBuilding({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [3, 2, 4],
  onEnter,
}) {
  // 1) load your GLB
  const { scene } = useGLTF("/models/firstBuild.glb");

  // 2) load MixConcrete PBR maps for walls
  const [wallColorMap, wallNormalMap, wallRoughnessMap] = useTexture([
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Color.jpg",
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_NormalDX.jpg",
    "/textures/MixConcrete-JPG/Concrete042A_2K-JPG_Roughness.jpg",
  ]);

  // 3) load mixedRoofTile PBR maps for roof
  const [roofColorMap, roofNormalMap, roofRoughnessMap] = useTexture([
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Color.jpg",
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_NormalDX.jpg",
    "/textures/mixedRoofTile-JPG/RoofingTiles010_2K-JPG_Roughness.jpg",
  ]);

  // 4) set wrap & tiling
  [wallColorMap, wallNormalMap, wallRoughnessMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
  });
  [roofColorMap, roofNormalMap, roofRoughnessMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 6);
  });

  // 5) build materials
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

  // 6) apply materials once
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;
      const lname = child.name.toLowerCase();
      if (lname.includes("roof")) {
        child.material = roofMaterial;
      } else {
        child.material = wallMaterial;
      }
      child.castShadow = child.receiveShadow = true;
      child.material.needsUpdate = true;
    });
  }, [scene, wallMaterial, roofMaterial]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RigidBody type="fixed" colliders={false}>
        {/* visible building */}
        <primitive object={scene} castShadow />

        {/* trigger zone */}
        <CuboidCollider
          sensor
          args={[3, 3, 3]}
          position={[0, 2, 1]}
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
