// export default Building;

// import { RigidBody, CuboidCollider } from "@react-three/rapier";

// function Building({ position, color, project }) {
//   return (
//     <RigidBody type="fixed" colliders={false}>
//       <mesh position={position} castShadow>
//         <boxGeometry args={[5, 5, 5]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       <CuboidCollider
//         name={`building-${project.name}`} // 🛠️ Set the name on the collider!
//         args={[2.5, 2.5, 2.5]}
//         position={position}
//       />
//     </RigidBody>
//   );
// }

// export default Building;

// Building.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

function Building({ position, project }) {
  const cinema = useGLTF("/models/Theatre.glb");
  const cinema2 = useGLTF("/models/Cinema2.glb");
  const coliseum = useGLTF("/models/Coliseum.glb");
  const gym = useGLTF("/models/Gym.glb");

  const modelMap = {
    Stuff: { scene: coliseum.scene, scale: 0.01 }, // 🛑 Super small coliseum
    HyroxTrack: { scene: gym.scene, scale: 0.05 }, // 🏋️‍♂️ Smaller gym
    Party: { scene: cinema.scene, scale: 0.2 }, // 🎥 Medium cinema
    Cool: { scene: cinema2.scene, scale: 0.2 }, // 🎬 Medium cinema 2
  };

  const modelInfo = modelMap[project.name] || null;

  return (
    <RigidBody type="fixed" colliders={false}>
      {modelInfo && (
        <primitive
          object={modelInfo.scene}
          position={position}
          scale={modelInfo.scale}
          castShadow
        />
      )}
      <CuboidCollider
        name={`building-${project.name}`}
        args={[2.5, 2.5, 2.5]}
        position={position}
      />
    </RigidBody>
  );
}

export default Building;
