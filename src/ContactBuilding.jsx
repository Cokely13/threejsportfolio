import { RigidBody } from "@react-three/rapier";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function ContactBuilding({
  position,
  playerRef,
  onEnter,
  popupVisible,
}) {
  const buildingRef = useRef();
  const [entered, setEntered] = useState(false);

  useFrame(() => {
    if (!playerRef?.current || entered) return; // don't repeat after triggered once

    const playerPosition = playerRef.current.translation();
    if (!playerPosition) return;

    const dx = playerPosition.x - position[0];
    const dz = playerPosition.z - position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 8) {
      // 🎯 Distance small enough
      setEntered(true);
      onEnter(); // 🚀 CALL THE FUNCTION to open popup
    }
  });

  useEffect(() => {
    if (!popupVisible) {
      setEntered(false);
    }
  }, [popupVisible]);

  return (
    <RigidBody type="fixed" colliders="cuboid" ref={buildingRef}>
      <mesh position={position}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#d35400" />
      </mesh>

      <Text
        position={[position[0], position[1] + 7, position[2] + 5]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Contact Me
      </Text>
    </RigidBody>
  );
}
