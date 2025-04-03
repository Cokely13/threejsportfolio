// Building.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Building({ position, color, project }) {
  const buildingRef = useRef();

  // Optional: Animate or interact buildings
  useFrame(() => {
    // Interaction or animations if desired
  });

  return (
    <mesh ref={buildingRef} position={position}>
      <boxGeometry args={[4, 5, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Building;
