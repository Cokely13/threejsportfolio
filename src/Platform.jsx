// // components/Platform.jsx
// import { useGLTF } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";

// export default function Platform({
//   src = "/models/rampPlat2.glb", // your combined Blender GLB
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

import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MeshStandardMaterial, RepeatWrapping } from "three";

export default function Platform({
  src = "/models/rampPlat2.glb", // your combined Blender GLB
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  friction = 1,
  restitution = 0,
  tile = [1, 1], // how many times to tile the texture per unit scale
}) {
  // load the GLB scene and textures
  const { scene } = useGLTF(src);
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/brickWall.jpg",
    "/textures/brickWall-normal.png",
    "/textures/asphalt.jpg",
  ]);

  // configure texture wrapping and tiling
  [colorMap, normalMap, roughnessMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    // adjust repeat based on scale and tile settings
    tex.repeat.set(scale[0] * tile[0], scale[2] * tile[1]);
  });

  // create a shared material
  const platformMaterial = new MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    roughness: 1,
  });

  // apply material to all meshes in the scene
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = platformMaterial;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      friction={friction}
      restitution={restitution}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} scale={scale} />
    </RigidBody>
  );
}
