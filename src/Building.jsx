// Building.jsx
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

function Building({ position, project, rotation = [0, 0, 0] }) {
  const cinema = useGLTF("/models/Shop.glb");
  const cinema2 = useGLTF("/models/Cinema2.glb");
  const coliseum = useGLTF("/models/Coliseum.glb");
  const gym = useGLTF("/models/Gym.glb");

  const modelMap = {
    Stuff: { scene: coliseum.scene, scale: 0.01 }, // 🛑 Super small coliseum
    HyroxTrack: { scene: gym.scene, scale: 0.05 }, // 🏋️‍♂️ Smaller gym
    Party: { scene: cinema.scene, scale: 7 }, // 🎥 Medium cinema
    Cool: { scene: cinema2.scene, scale: 0.2 }, // 🎬 Medium cinema 2
  };

  const modelInfo = modelMap[project.name] || null;

  return (
    <RigidBody type="fixed" colliders={false}>
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
    </RigidBody>
  );
}

export default Building;
