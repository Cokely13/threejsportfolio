// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function PulsingGlowRing({ position }) {
//   const ringRef = useRef();

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     const pulse = Math.sin(t * 2) * 0.5 + 1.5;
//     if (ringRef.current?.material) {
//       ringRef.current.material.emissiveIntensity = pulse;
//     }
//   });

//   return (
//     <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
//       <ringGeometry args={[10, 10.3, 64]} />
//       <meshStandardMaterial
//         color="blue"
//         emissive="blue"
//         emissiveIntensity={50}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// }

// PulsingGlowRing.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PulsingGlowRing({ position }) {
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulse = Math.sin(t * 2) * 0.5 + 1.5;
    if (ringRef.current?.material) {
      ringRef.current.material.emissiveIntensity = pulse;
      ringRef.current.rotation.z = t * 0.5; // 💫 Spin effect
    }
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[10, 10.3, 64]} />
      <meshStandardMaterial
        color="blue"
        emissive="blue"
        emissiveIntensity={2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
