import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text } from "@react-three/drei";

export default function TodoBooth({ playerRef, onEnter }) {
  return (
    <>
      {/* Group to rotate entire booth */}
      <group position={[-20, 0, 70]} rotation={[0, Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders={false}>
          {/* Back wall */}
          <mesh position={[0, 1.7, -1]}>
            <boxGeometry args={[6, 8, 0.2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Back wall collider */}
          <CuboidCollider args={[3, 4, 0.1]} position={[0, 4, -1]} />

          {/* Left wall */}
          <mesh position={[-3, 2, 0]}>
            <boxGeometry args={[0.2, 7, 2]} />
            <meshStandardMaterial color="#5a3220" />
          </mesh>
          <CuboidCollider args={[0.1, 3.5, 1]} position={[-3, 2, 0]} />

          {/* Right wall */}
          <mesh position={[3, 2, 0]}>
            <boxGeometry args={[0.2, 7, 2]} />
            <meshStandardMaterial color="#5a3220" />
          </mesh>
          <CuboidCollider args={[0.1, 3.5, 1]} position={[3, 2, 0]} />

          {/* Roof */}
          <mesh position={[0, 5.6, 0]}>
            <boxGeometry args={[6.2, 0.2, 2]} />
            <meshStandardMaterial color="#654321" />
          </mesh>

          {/* Glowing screen */}
          <mesh position={[0, 3.5, -0.5]}>
            <planeGeometry args={[4.5, 2.5]} />
            <meshStandardMaterial
              color="#222"
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Floating label */}
          <Text
            position={[0, 9.5, 0]}
            fontSize={1.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            TO DO
          </Text>

          {/* 👉 Trigger zone now placed inside booth */}
          <CuboidCollider
            sensor
            args={[2.5, 2.5, 1]}
            position={[0, 2.5, 0]}
            onIntersectionEnter={({ other }) => {
              if (other.rigidBodyObject?.name === "player") {
                onEnter();
              }
            }}
          />
        </RigidBody>
      </group>
    </>
  );
}
