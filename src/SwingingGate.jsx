// src/SwingingGate.jsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";

const letters = "WELCOME".split("");
const radius = 9;
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

        {/* <Text
          position={[0, 3, 0.6]}
          fontSize={2.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
          material-emissive="#ffcc33"
          material-emissiveIntensity={1}
        >
          WELCOME
        </Text> */}

        {/* curved letters */}
        {/* {letters.map((ltr, i) => {
          const t = i / (letters.length - 1); // 0→1
          const angle = Math.PI + halfArc * (t - 0.5); // center at top
          const x = Math.cos(angle) * (radius - 1.5);
          const y = Math.sin(angle) * (radius - 1.5);
          return (
            <Text
              key={i}
              position={[x, y + 18, 0.6]}
              rotation-z={angle + Math.PI / 2} // rotate to face forward
              fontSize={2}
              color="#fff"
              material-emissive="#ffcc33"
              material-emissiveIntensity={1}
              anchorX="center"
              anchorY="middle"
              castShadow
            >
              {ltr}
            </Text>
          );
        })} */}
      </group>

      {/* 〈— Wooden plank —〉 */}
      {/* <group position={[0, 23, 0]}>
        <RoundedBox
          args={[30, 4, 1]}
          radius={0.5}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#8B4513" />
        </RoundedBox>

        <Text
          position={[0, 1, 0.6]}
          fontSize={3}
          color="#fff"
          outlineWidth={0.05}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
        >
          WELCOME
        </Text>
      </group> */}

      {/* left gate */}
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
