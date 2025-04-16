// import { RigidBody } from "@react-three/rapier";
// import { useLoader } from "@react-three/fiber";
// import { TextureLoader, RepeatWrapping } from "three";

// export default function GroundWithHole() {
//   const grassTexture = useLoader(TextureLoader, "/textures/grass.jpg");
//   grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
//   grassTexture.repeat.set(60, 60);

//   return (
//     <>
//       {/* Left of hole */}
//       <RigidBody type="fixed" colliders="trimesh">
//         <mesh
//           position={[-60, 0, 50]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           receiveShadow
//         >
//           <planeGeometry args={[40, 120]} />
//           <meshStandardMaterial map={grassTexture} />
//         </mesh>
//       </RigidBody>

//       {/* Right of hole */}
//       <RigidBody type="fixed" colliders="trimesh">
//         <mesh
//           position={[0, 0, 50]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           receiveShadow
//         >
//           <planeGeometry args={[40, 120]} />
//           <meshStandardMaterial map={grassTexture} />
//         </mesh>
//       </RigidBody>

//       {/* In front of hole */}
//       <RigidBody type="fixed" colliders="trimesh">
//         <mesh
//           position={[-30, 0, 20]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           receiveShadow
//         >
//           <planeGeometry args={[40, 40]} />
//           <meshStandardMaterial map={grassTexture} />
//         </mesh>
//       </RigidBody>

//       {/* Behind hole */}
//       <RigidBody type="fixed" colliders="trimesh">
//         <mesh
//           position={[-30, 0, 80]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           receiveShadow
//         >
//           <planeGeometry args={[40, 40]} />
//           <meshStandardMaterial map={grassTexture} />
//         </mesh>
//       </RigidBody>
//     </>
//   );
// }

// import { useMemo } from "react";
// import * as THREE from "three";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { useLoader } from "@react-three/fiber";
// import { TextureLoader, RepeatWrapping } from "three";

// export default function GroundWithHole() {
//   const shape = useMemo(() => {
//     const s = new THREE.Shape();
//     s.absarc(0, 0, 120, 0, Math.PI * 2, false); // outer ground

//     const hole = new THREE.Path();
//     hole.absarc(45, -70, 10, 0, Math.PI * 2, true); // matches hole position
//     s.holes.push(hole);

//     return s;
//   }, []);

//   return (
//     <RigidBody type="fixed" colliders={false}>
//       <mesh rotation={[-Math.PI / 2, 0, 0]}>
//         <shapeGeometry args={[shape, 64]} />
//         <meshStandardMaterial color="#C2B280" /> {/* Match old tan ground */}
//       </mesh>
//       <CuboidCollider args={[120, 0.1, 120]} position={[0, -0.05, 0]} />
//     </RigidBody>
//   );
// }

// import { useMemo } from "react";
// import * as THREE from "three";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// export default function GroundWithHole() {
//   const shape = useMemo(() => {
//     const s = new THREE.Shape();
//     s.absarc(0, 0, 120, 0, Math.PI * 2, false); // full ground

//     const hole = new THREE.Path();
//     hole.absarc(45, -70, 10, 0, Math.PI * 2, true); // hole cutout
//     s.holes.push(hole);

//     return s;
//   }, []);

//   return (
//     <RigidBody type="fixed" colliders={false}>
//       {/* Visible mesh with the cutout */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//         <shapeGeometry args={[shape, 64]} />
//         <meshStandardMaterial color="#C2B280" />
//       </mesh>

//       {/* Four colliders forming a "ring" around the hole */}
//       <CuboidCollider args={[120, 0.1, 50]} position={[0, -0.05, 0]} />
//       <CuboidCollider args={[120, 0.1, 50]} position={[0, -0.05, -120]} />
//       <CuboidCollider args={[50, 0.1, 120]} position={[-120, -0.05, -60]} />
//       <CuboidCollider args={[50, 0.1, 120]} position={[120, -0.05, -60]} />
//     </RigidBody>
//   );
// }

import { useMemo } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export default function GroundWithHole() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 120, 0, Math.PI * 2, false);

    const hole = new THREE.Path();
    hole.absarc(45, -70, 10, 0, Math.PI * 2, true);
    s.holes.push(hole);

    return s;
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <shapeGeometry args={[shape, 64]} />
        <meshStandardMaterial color="#C2B280" />
      </mesh>
    </RigidBody>
  );
}
