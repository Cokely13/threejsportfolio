// import { useLoader } from "@react-three/fiber";
// import { TextureLoader, RepeatWrapping } from "three";

// export default function Wall() {
//   const wallTexture = useLoader(TextureLoader, "/textures/brickWall.jpg");
//   wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping;
//   wallTexture.repeat.set(1, 1);

//   const radius = 95; // Radius of the circle
//   const wallHeight = 10;
//   const wallWidth = 7; // Width of each wall segment

//   const circumference = 2 * Math.PI * radius;
//   const numberOfWalls = Math.floor(circumference / wallWidth); // 🧠 exact number of walls

//   const gateOpeningAngle = -Math.PI / 2; // gate at bottom
//   const gateOpeningWidth = Math.PI / 8;

//   const walls = [];

//   for (let i = 0; i < numberOfWalls; i++) {
//     const angle = (i / numberOfWalls) * Math.PI * 2;
//     const x = radius * Math.cos(angle);
//     const z = radius * Math.sin(angle);

//     // Skip walls inside gate opening
//     const isInGate =
//       angle > gateOpeningAngle - gateOpeningWidth / 2 &&
//       angle < gateOpeningAngle + gateOpeningWidth / 2;
//     if (isInGate) continue;

//     // Rotate wall to face outward
//     const rotationY = angle + Math.PI / 2;

//     walls.push(
//       <mesh
//         key={i}
//         position={[x, wallHeight / 2, z]}
//         rotation={[0, rotationY, 0]}
//       >
//         <boxGeometry args={[wallWidth, wallHeight, 1]} />
//         <meshStandardMaterial map={wallTexture} />
//       </mesh>
//     );
//   }

//   return <>{walls}</>;
// }

// import { useGLTF } from "@react-three/drei";

// export default function Wall() {
//   const { scene } = useGLTF("/models/mywall.glb");
//   return (
//     <primitive
//       object={scene}
//       rotation={[0, -Math.PI / 2.65, 0]} // 👉 rotate 90 degrees (adjust if needed)
//     />
//   );
// }

import { useGLTF, useTexture } from "@react-three/drei";

export default function Wall() {
  const { scene } = useGLTF("/models/mywall.glb");
  const brickTexture = useTexture("/textures/brickWall.jpg"); // your brick texture

  // Apply the texture once loaded
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = brickTexture;
      child.material.needsUpdate = true;
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, 7, 0]}
      rotation={[0, -Math.PI / 2.65, 0]} // your perfect rotation
    />
  );
}
