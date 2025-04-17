// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Text } from "@react-three/drei";

// export default function SwingingGate({ playerRef }) {
//   const leftPivot = useRef();
//   const rightPivot = useRef();
//   const [open, setOpen] = useState(false);

//   console.log("r", rightPivot);
//   console.log("l", leftPivot);

//   useFrame(() => {
//     if (!playerRef.current) return;
//     const playerPos = playerRef.current.translation();
//     const distance = Math.sqrt(
//       (playerPos.x - 0) ** 2 + (playerPos.z - 110) ** 2
//     );

//     if (distance < 10) setOpen(true);

//     if (open) {
//       // Left gate: swing to +90° (Math.PI / 2)
//       if (leftPivot.current.rotation.y > -Math.PI / 2) {
//         leftPivot.current.rotation.y -= 0.02;
//         if (leftPivot.current.rotation.y < -Math.PI / 2) {
//           leftPivot.current.rotation.y = -Math.PI / 2;
//         }
//       }

//       // Right gate: rotate to +90° (swinging outward)
//       if (rightPivot.current.rotation.y < Math.PI / 2) {
//         rightPivot.current.rotation.y += 0.02;
//         if (rightPivot.current.rotation.y > Math.PI / 2) {
//           rightPivot.current.rotation.y = Math.PI / 2;
//         }
//       }
//     }
//   });

//   return (
//     <group position={[0, 0, 110]}>
//       {/* Left Gate */}
//       <group ref={leftPivot} position={[-8, 0, 0]}>
//         <mesh position={[4, 2.5, 0]}>
//           <boxGeometry args={[8, 10, 1]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>
//       </group>

//       {/* Right Gate */}
//       <group ref={rightPivot} position={[8, 0, 0]}>
//         <mesh position={[-4, 2.5, 0]}>
//           <boxGeometry args={[8, 10, 1]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>
//       </group>

//       {/* Welcome Sign */}
//       <group position={[0, 12, 0]}>
//         <mesh>
//           <planeGeometry args={[8, 2]} />
//           <meshStandardMaterial color="#ffffff" />
//         </mesh>
//         <Text
//           position={[0, 0, 0.1]}
//           fontSize={0.8}
//           color="black"
//           anchorX="center"
//           anchorY="middle"
//         >
//           Welcome
//         </Text>
//       </group>
//     </group>
//   );
// }

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function SwingingGate({ playerRef }) {
  const leftPivot = useRef();
  const rightPivot = useRef();
  const [open, setOpen] = useState(false);

  useFrame(() => {
    if (!playerRef.current) return;
    const playerPos = playerRef.current.translation();
    const distance = Math.sqrt(
      (playerPos.x - 0) ** 2 + (playerPos.z - 110) ** 2
    );

    if (distance < 10) setOpen(true);

    if (open) {
      if (leftPivot.current.rotation.y > -Math.PI / 2) {
        leftPivot.current.rotation.y -= 0.02;
        if (leftPivot.current.rotation.y < -Math.PI / 2) {
          leftPivot.current.rotation.y = -Math.PI / 2;
        }
      }

      if (rightPivot.current.rotation.y < Math.PI / 2) {
        rightPivot.current.rotation.y += 0.02;
        if (rightPivot.current.rotation.y > Math.PI / 2) {
          rightPivot.current.rotation.y = Math.PI / 2;
        }
      }
    }
  });

  return (
    <group position={[0, 0, 110]}>
      {/* 🔒 Frame Left Post */}
      <mesh position={[-9, 5, 0]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      {/* 🔒 Frame Right Post */}
      <mesh position={[9, 5, 0]}>
        <boxGeometry args={[1, 10, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      {/* 🔒 Frame Top Beam */}
      <mesh position={[0, 10.5, 0]}>
        <boxGeometry args={[19, 1, 1]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>

      {/* 🚪 Left Swinging Gate */}
      <group ref={leftPivot} position={[-8, 0, 0]}>
        <mesh position={[4, 5, 0]}>
          <boxGeometry args={[8, 10, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* 🚪 Right Swinging Gate */}
      <group ref={rightPivot} position={[8, 0, 0]}>
        <mesh position={[-4, 5, 0]}>
          <boxGeometry args={[8, 10, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* 🪧 Welcome Sign */}
      <group position={[0, 13, 0]}>
        <mesh>
          <planeGeometry args={[8, 2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.8}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Welcome
        </Text>
      </group>
    </group>
  );
}
