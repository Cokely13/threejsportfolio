import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function PittLabel({ position = [45, 5, 70], playerRef }) {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current && playerRef?.current) {
      const playerPos = playerRef.current.translation();
      textRef.current.lookAt(playerPos.x, playerPos.y + 1.5, playerPos.z);

      // Floating effect
      const t = state.clock.getElapsedTime();
      textRef.current.position.y = position[1] + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={3}
      color="#ff0000"
      anchorX="center"
      anchorY="middle"
      outlineColor="#000000"
      outlineWidth={0.15}
    >
      Pit of Despair
    </Text>
  );
}
