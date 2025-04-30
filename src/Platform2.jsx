// // components/Platform.jsx
// import { useGLTF } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// export default function Platform2({
//   src = "/models/rampPlat.glb", // your combined Blender GLB
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [1, 1, 1],
//   friction = 1,
//   restitution = 0,
// }) {
//   const { scene } = useGLTF(src);

//   return (
//     <RigidBody
//       type="fixed"
//       colliders="trimesh" // precise triangle‐mesh collider
//       friction={friction}
//       restitution={restitution}
//       position={position}
//       rotation={rotation}
//     >
//       <primitive object={scene} scale={scale} castShadow receiveShadow />
//     </RigidBody>
//   );
// }

// // Platform2.jsx
// import React, { useEffect, useMemo } from "react";
// import { useGLTF } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";
// import * as THREE from "three";

// /**
//  * A simple colored platform/ramp for the Contact building.
//  */
// export default function Platform2({
//   src = "/models/rampPlat.glb",
//   color = "blue", // dim gray
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [1, 1, 1],
//   friction = 1,
//   restitution = 0,
// }) {
//   const { scene } = useGLTF(src);

//   // Flat color material
//   const mat = useMemo(
//     () =>
//       new THREE.MeshStandardMaterial({
//         color,
//         roughness: 0.8,
//         metalness: 0.2,
//       }),
//     [color]
//   );

//   useEffect(() => {
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         child.material = mat;
//         child.castShadow = child.receiveShadow = true;
//         child.material.needsUpdate = true;
//       }
//     });
//   }, [scene, mat]);

//   return (
//     <RigidBody
//       type="fixed"
//       colliders="trimesh"
//       friction={friction}
//       restitution={restitution}
//       position={position}
//       rotation={rotation}
//     >
//       <primitive object={scene} scale={scale} castShadow receiveShadow />
//     </RigidBody>
//   );
// }

// Platform2.jsx
import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

/**
 * A simple colored platform/ramp for the Contact building.
 */
export default function Platform2({
  src = "/models/rampPlat.glb",
  color = "#696969", // dim gray
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  friction = 1,
  restitution = 0,
}) {
  const { scene } = useGLTF(src);

  // Flat color material
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.8,
        metalness: 0.2,
      }),
    [color]
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = mat;
        child.castShadow = child.receiveShadow = true;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, mat]);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={friction}
      restitution={restitution}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} scale={scale} castShadow receiveShadow />
    </RigidBody>
  );
}
