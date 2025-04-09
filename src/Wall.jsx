// import { useGLTF, useTexture } from "@react-three/drei";

// export default function Wall() {
//   const { scene } = useGLTF("/models/mywall.glb");
//   const brickTexture = useTexture("/textures/brickWall.jpg"); // your brick texture

//   // Apply the texture once loaded
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.map = brickTexture;
//       child.material.needsUpdate = true;
//     }
//   });

//   return (
//     <primitive
//       object={scene}
//       position={[0, 7, 0]}
//       rotation={[0, -Math.PI / 2.65, 0]} // your perfect rotation
//     />
//   );
// }

// import { useGLTF, useTexture } from "@react-three/drei";
// import { RepeatWrapping } from "three"; // 👈 Need this from three.js

// export default function Wall() {
//   const { scene } = useGLTF("/models/mywall.glb");
//   const brickTexture = useTexture("/textures/brickWall.jpg");

//   // Make the bricks tile nicely
//   brickTexture.wrapS = brickTexture.wrapT = RepeatWrapping;
//   brickTexture.repeat.set(10, 2); // 👈 control how many times it repeats horizontally and vertically

//   // Apply the texture once loaded
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material.map = brickTexture;
//       child.material.needsUpdate = true;
//     }
//   });

//   return (
//     <primitive
//       object={scene}
//       position={[0, 7, 0]}
//       rotation={[0, -Math.PI / 2.65, 0]}
//     />
//   );
// }

import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping, MeshStandardMaterial } from "three";

export default function Wall() {
  const { scene } = useGLTF("/models/mywall.glb");

  // Load the textures
  const [brickTexture, normalMap] = useTexture([
    "/textures/brickWall.jpg",
    "/textures/brickWall-normal.png", //
  ]);

  // Set texture wrapping and repeating
  brickTexture.wrapS = brickTexture.wrapT = RepeatWrapping;
  brickTexture.repeat.set(10, 2);
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(10, 2);

  // Create a realistic material
  const brickMaterial = new MeshStandardMaterial({
    map: brickTexture,
    normalMap: normalMap,
    roughness: 0.8,
    metalness: 0.0,
  });

  // Apply material to the wall
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = brickMaterial;
      child.material.needsUpdate = true;
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, 7, 0]}
      rotation={[0, -Math.PI / 2.65, 0]}
    />
  );
}
