// src/TodoBooth.jsx
import React from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import WelcomeMat from "./WelcomeMat";

export default function TodoBooth({
  playerRef,
  onEnter,
  // you can override where the booth sits:
  position = [15, 0, 90],
  rotation = [0, -0.55, 0],
  matWidth = 5,
  matHeight = 4,
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* ─── Booth Structure ──────────────────────────── */}
      <RigidBody type="fixed" colliders={false}>
        {/* Back wall */}
        <mesh position={[0, 1.7, -1]}>
          <boxGeometry args={[6, 8, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Side walls */}
        <mesh position={[-3, 2, 0]}>
          <boxGeometry args={[0.2, 7, 2]} />
          <meshStandardMaterial color="#5a3220" />
        </mesh>
        <mesh position={[3, 2, 0]}>
          <boxGeometry args={[0.2, 7, 2]} />
          <meshStandardMaterial color="#5a3220" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 5.6, 0]}>
          <boxGeometry args={[6.2, 0.2, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Glowing “TO DO” screen */}
        <mesh position={[0, 3.5, -0.5]}>
          <planeGeometry args={[5, 3]} />
          <meshStandardMaterial
            color="#222"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text
          position={[-2.0, 4, -0.49]}
          fontSize={0.5}
          color="black"
          anchorX="left"
          anchorY="middle"
        >
          Things to do:
        </Text>
        {/* Floating label */}
        <Text
          position={[0, 9.5, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          UNDER CONSTRUCTION
        </Text>
      </RigidBody>

      {/* ─── Welcome Mat ─────────────────────────────── */}
      <WelcomeMat
        position={[0, 0.01, 1]}
        width={matWidth}
        height={matHeight}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.15}
      />

      {/* ─── Invisible Sensor Over The Mat ──────────── */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          sensor
          args={[matWidth / 2, 0.1, matHeight / 2]}
          position={[0, 0.05, 0]}
          onIntersectionEnter={({ other }) => {
            if (other.rigidBodyObject?.name === "player") {
              onEnter();
            }
          }}
        />
      </RigidBody>
    </group>
  );
}
