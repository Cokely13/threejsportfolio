import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function TodoBooth({ playerRef, onEnter }) {
  return (
    <>
      {/* Booth structure */}
      <RigidBody type="fixed" colliders={false}>
        <mesh position={[-25, 1, 75]}>
          <boxGeometry args={[6, 2, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </RigidBody>

      {/* Invisible trigger zone */}
      <CuboidCollider
        sensor
        args={[3, 2, 3]}
        position={[-25, 1, 75]}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === "player") {
            onEnter(); // triggers popup
          }
        }}
      />
    </>
  );
}
