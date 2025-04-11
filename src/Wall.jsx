// import { useGLTF, useTexture } from "@react-three/drei";
// import { RepeatWrapping, MeshStandardMaterial } from "three";

// export default function Wall() {
//   const { scene } = useGLTF("/models/mywall.glb");

//   // Load the textures
//   const [brickTexture, normalMap] = useTexture([
//     "/textures/brickWall.jpg",
//     "/textures/brickWall-normal.png", //
//   ]);

//   // Set texture wrapping and repeating
//   brickTexture.wrapS = brickTexture.wrapT = RepeatWrapping;
//   brickTexture.repeat.set(10, 2);
//   normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
//   normalMap.repeat.set(10, 2);

//   // Create a realistic material
//   const brickMaterial = new MeshStandardMaterial({
//     map: brickTexture,
//     normalMap: normalMap,
//     roughness: 0.8,
//     metalness: 0.0,
//   });

//   // Apply material to the wall
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       child.material = brickMaterial;
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
import { RigidBody, MeshCollider } from "@react-three/rapier";
import { RepeatWrapping, MeshStandardMaterial } from "three";

export default function Wall() {
  const { scene } = useGLTF("/models/mywall.glb");

  const [brickTexture, normalMap] = useTexture([
    "/textures/brickWall.jpg",
    "/textures/brickWall-normal.png",
  ]);

  brickTexture.wrapS = brickTexture.wrapT = RepeatWrapping;
  brickTexture.repeat.set(10, 2);
  normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(10, 2);

  const brickMaterial = new MeshStandardMaterial({
    map: brickTexture,
    normalMap: normalMap,
    roughness: 0.8,
    metalness: 0.0,
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = brickMaterial;
      child.material.needsUpdate = true;
    }
  });

  console.log("here", scene);

  return (
    // <RigidBody type="fixed" colliders={false} restitution={1} friction={0.5}>
    //   {/* 🛑 Important: colliders={false} turns off automatic collider guessing */}

    //   {/* Your visible wall */}
    //   <primitive
    //     object={scene}
    //     position={[0, 7, 0]}
    //     rotation={[0, -Math.PI / 2.65, 0]}
    //   />

    //   {/* 🛑 Now add a custom collider that uses the Blender model's shape */}
    //   <mesh geometry={scene.children[0].geometry}>
    //     {/* Use invisible material */}
    //     <meshBasicMaterial transparent opacity={0} />
    //   </mesh>
    // </RigidBody>
    <RigidBody type="fixed" colliders={false} restitution={1} friction={0.5}>
      {/* Visible wall */}
      <primitive
        object={scene}
        position={[0, 7, 0]}
        rotation={[0, -Math.PI / 2.65, 0]}
      />

      {/* ✅ Real collider based on mesh geometry */}
      <MeshCollider type="trimesh">
        <mesh geometry={scene.children[0].geometry}>
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </MeshCollider>
    </RigidBody>
  );
}
