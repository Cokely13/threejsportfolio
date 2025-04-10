// Hills.jsx
import { RigidBody } from "@react-three/rapier";

export default function Hills() {
  return (
    <>
      {/* Big Skills Section Hill */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh position={[-65, 0, 30]} scale={[2, 0.7, 2]}>
          <sphereGeometry args={[10, 32, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
    </>
  );
}
