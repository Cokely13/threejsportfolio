// src/SwingingGate.jsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { Text3D, Center } from "@react-three/drei";

const letters = "WELCOME".split("");
const radius = 8;
const halfArc = Math.PI; // 180°

export default function SwingingGate({ playerRef, onEnter }) {
  const leftPivot = useRef();
  const rightPivot = useRef();
  const [open, setOpen] = useState(false);

  useFrame(() => {
    if (!playerRef.current) return;
    const { x, z } = playerRef.current.translation();
    const dist = Math.hypot(x, z - 110);
    if (dist < 10) {
      setOpen(true);
      onEnter?.(); // ← fire the welcome popup once here
    }

    if (open) {
      leftPivot.current.rotation.y = Math.max(
        leftPivot.current.rotation.y - 0.02,
        -Math.PI / 2
      );
      rightPivot.current.rotation.y = Math.min(
        rightPivot.current.rotation.y + 0.02,
        Math.PI / 2
      );
    }
  });

  return (
    <group position={[0, 0, 110]}>
      {/* frame posts */}
      <mesh position={[-9, 5, 0]}>
        <boxGeometry args={[2, 20, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      <mesh position={[9, 5, 0]}>
        <boxGeometry args={[2, 20, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      <mesh position={[0, 15.5, 0]}>
        <boxGeometry args={[20, 1, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      <group position={[0, 15.9, 0]}>
        <mesh rotation-z={Math.PI}>
          <torusGeometry args={[9, 1, 16, 100, -Math.PI]} />
          <meshStandardMaterial
            color="#ffcc33"
            emissive="#ffcc33"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={leftPivot} position={[-8, 0, 0]}>
        <mesh position={[4, 5, 0]}>
          <boxGeometry args={[8, 20, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[4, 8, 0.6]}
          fontSize={12}
          color="#fff"
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
          // font="/fonts/DancingScript-Bold.ttf"
        >
          R
        </Text>
      </group>

      {/* --- NEW: semi-circular board + WELCOME text --- */}
      <group position={[0, 16, -0.8]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        {/* half-cylinder “board” */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry
            args={[
              radius,
              radius,
              /* thickness */ 1,
              /* rad segs */ 64,
              1,
              /* openEnded? */ false,
              /* start */ 0,
              /* length */ halfArc,
            ]}
          />
          <meshStandardMaterial
            color="#1e90ff" // ← deep sky blue backing
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      </group>
      {/* flat WELCOME text, just in front of the board */}
      <Text
        position={[0, 19, 0.51]}
        setRotationFromMatrix={[-Math.PI / 2, 0, 0]}
        fontSize={2.5}
        // font="/fonts/DancingScript-Bold.ttf"
        color="#ffeb3b"
        outlineWidth={0.05}
        outlineColor="#000"
        anchorX="center"
        anchorY="middle"
        castShadow
      >
        WELCOME
      </Text>

      {/* right gate */}
      <group ref={rightPivot} position={[8, 0, 0]}>
        <mesh position={[-4, 5, 0]}>
          <boxGeometry args={[8, 20, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[-4, 8, 0.6]}
          fontSize={12}
          color="#fff"
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
          // font="/fonts/DancingScript-Bold.ttf"
        >
          C
        </Text>
      </group>

      {/* fancier welcome sign */}
      {/* fancy welcome sign */}
    </group>
  );
}
