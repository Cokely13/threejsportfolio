import * as THREE from "three";

export default function HoleDecorations({ position = [45, 0, 70] }) {
  return (
    <>
      {/* Flat black circle to mask edge */}
      <mesh
        position={[...position.slice(0, 2), position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[10, 64]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Deep inner cylinder with twist illusion */}
      <mesh
        position={[position[0], position[1] - 5, position[2]]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <cylinderGeometry args={[10, 10, 10, 64, 1, true]} />
        <meshStandardMaterial
          color="black"
          opacity={0.9}
          transparent
          side={THREE.BackSide}
        />
      </mesh>

      {/* Glowing animated ring */}
      <mesh
        position={[position[0], position[1] + 0.021, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[10, 10.3, 64]} />
        <meshStandardMaterial
          color="blue"
          emissive="blue"
          emissiveIntensity={5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft aura glow */}
      <mesh
        position={[position[0], position[1] + 0.01, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[10.5, 11, 64]} />
        <meshBasicMaterial color="blue" opacity={0.15} transparent />
      </mesh>

      {/* Subtle inner glow disc */}
      <mesh
        position={[position[0], position[1] + 0.015, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[9.8, 64]} />
        <meshBasicMaterial
          color="blue"
          opacity={0.2}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
