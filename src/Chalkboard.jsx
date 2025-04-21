import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Chalkboard({
  position = [-95, 10, 15],
  rotation = [0, 1.5, 0],
  fadeIn = true,
}) {
  const boardRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/models/skill.png");
  const [opacity, setOpacity] = useState(0);

  useFrame((state) => {
    if (boardRef.current) {
      const t = state.clock.getElapsedTime();
      // boardRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.3; // Floating
      // boardRef.current.lookAt(state.camera.position);

      if (fadeIn && opacity < 1) {
        setOpacity((prev) => Math.min(prev + 0.02, 1));
      }

      // Apply current opacity
      boardRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={boardRef} position={position} rotation={rotation}>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial map={texture} transparent opacity={opacity} />
    </mesh>
  );
}
