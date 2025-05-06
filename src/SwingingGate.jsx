// src/SwingingGate.jsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";

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
        <boxGeometry args={[2, 10, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      <mesh position={[9, 5, 0]}>
        <boxGeometry args={[2, 10, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      <mesh position={[0, 10.5, 0]}>
        <boxGeometry args={[20, 1, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      {/* left gate */}
      <group ref={leftPivot} position={[-8, 0, 0]}>
        <mesh position={[4, 5, 0]}>
          <boxGeometry args={[8, 10, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[4, 5, 0.6]}
          fontSize={8}
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

      {/* right gate */}
      <group ref={rightPivot} position={[8, 0, 0]}>
        <mesh position={[-4, 5, 0]}>
          <boxGeometry args={[8, 10, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <Text
          position={[-4, 5, 0.6]}
          fontSize={8}
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
