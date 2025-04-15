// import { useGLTF } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// function Building({ position, project, rotation = [0, 0, 0] }) {
//   // 🏛️ Load your custom buildings
//   const build1 = useGLTF("/models/build1.glb");
//   const build2 = useGLTF("/models/build2.glb");

//   // 🧠 Map projects to the correct building model
//   const modelMap = {
//     PopcornPair: { scene: build1.scene, scale: 1 }, // 🍿 Custom Blender building
//     HyroxTrack: { scene: build2.scene, scale: 1 }, // 🏋️ Custom Blender building
//     Party: { scene: useGLTF("/models/Shop.glb").scene, scale: 20 },
//     Cool: { scene: useGLTF("/models/Cinema2.glb").scene, scale: 1 },
//   };

//   const modelInfo = modelMap[project.name];

//   return (
//     <RigidBody type="fixed" colliders={false}>
//       {modelInfo && (
//         <primitive
//           object={modelInfo.scene}
//           position={position}
//           rotation={rotation}
//           scale={modelInfo.scale}
//           castShadow
//         />
//       )}
//       <CuboidCollider
//         name={`building-${project.name}`}
//         args={[2.5, 2.5, 2.5]}
//         position={position}
//       />
//     </RigidBody>
//   );
// }

// export default Building;

// import { useGLTF } from "@react-three/drei";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber"; // 👈 Add this!
// import { useRef, useState } from "react"; // 👈 Add state

// function Building({
//   position,
//   project,
//   rotation = [0, 0, 0],
//   playerRef,
//   onEnter,
// }) {
//   const build1 = useGLTF("/models/build1.glb");
//   const build2 = useGLTF("/models/build2.glb");
//   const buildingRef = useRef();
//   const [entered, setEntered] = useState(false);

//   const modelMap = {
//     PopcornPair: { scene: build1.scene, scale: 1 },
//     HyroxTrack: { scene: build2.scene, scale: 1 },
//     Party: { scene: useGLTF("/models/Shop.glb").scene, scale: 20 },
//     Cool: { scene: useGLTF("/models/Cinema2.glb").scene, scale: 1 },
//   };

//   const modelInfo = modelMap[project.name];

//   // 👇 Add this player proximity detection
//   useFrame(() => {
//     if (!playerRef?.current || entered) return;
//     const playerPosition = playerRef.current.translation();
//     const dx = playerPosition.x - position[0];
//     const dz = playerPosition.z - position[2];
//     const distance = Math.sqrt(dx * dx + dz * dz);

//     if (distance < 5) {
//       setEntered(true);
//       onEnter?.(); // 🔥 Trigger popup or project activation
//     }
//   });

//   return (
//     <RigidBody type="fixed" colliders={false} ref={buildingRef}>
//       {modelInfo && (
//         <primitive
//           object={modelInfo.scene}
//           position={position}
//           rotation={rotation}
//           scale={modelInfo.scale}
//           castShadow
//         />
//       )}
//       <CuboidCollider
//         name={`building-${project.name}`}
//         args={[2.5, 2.5, 2.5]}
//         position={position}
//       />
//     </RigidBody>
//   );
// }

// export default Building;

import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Building({
  position,
  project,
  rotation = [0, 0, 0],
  playerRef,
  onEnter,
  showDebug = false, // Toggle to see debug sphere
}) {
  const build1 = useGLTF("/models/build1.glb");
  const build2 = useGLTF("/models/build2.glb");
  const build3 = useGLTF("/models/build3.glb");
  const build4 = useGLTF("/models/build4.glb");
  const buildingRef = useRef();
  const [entered, setEntered] = useState(false);

  const modelMap = {
    PopcornPair: { scene: build1.scene, scale: 1 },
    HyroxTrack: { scene: build2.scene, scale: 1 },
    NewHorizons: { scene: build3.scene, scale: 1 },
    PlaylistBattle: { scene: build4.scene, scale: 1 },
  };

  const modelInfo = modelMap[project.name];

  useFrame(() => {
    if (!playerRef?.current || !buildingRef.current || entered) return;

    const playerPos = playerRef.current.translation();
    const buildingPos = buildingRef.current.translation();

    if (!playerPos || !buildingPos) return;

    const dx = playerPos.x - buildingPos.x;
    const dz = playerPos.z - buildingPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 5) {
      setEntered(true);
      onEnter?.();
    }
  });

  console.log("Collider name:", `building-${project.name}`);
  console.log("Position:", position);

  return (
    <RigidBody type="fixed" colliders={false} ref={buildingRef}>
      {modelInfo && (
        <primitive
          object={modelInfo.scene}
          position={position}
          rotation={rotation}
          scale={modelInfo.scale}
          castShadow
        />
      )}

      <CuboidCollider
        name={`building-${project.name}`}
        args={[2.5, 2.5, 2.5]}
        position={position}
      />

      {showDebug && (
        <mesh position={position}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </RigidBody>
  );
}

export default Building;
