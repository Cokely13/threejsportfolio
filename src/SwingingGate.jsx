// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import { Text } from "@react-three/drei";

// export default function SwingingGate({ playerRef }) {
//   const leftPivot = useRef();
//   const rightPivot = useRef();
//   const [open, setOpen] = useState(false);

//   useFrame(() => {
//     if (!playerRef.current) return;
//     const playerPos = playerRef.current.translation();
//     const distance = Math.sqrt(
//       (playerPos.x - 0) ** 2 + (playerPos.z - 110) ** 2
//     );

//     if (distance < 10) setOpen(true);

//     if (open) {
//       if (leftPivot.current.rotation.y > -Math.PI / 2) {
//         leftPivot.current.rotation.y -= 0.02;
//         if (leftPivot.current.rotation.y < -Math.PI / 2) {
//           leftPivot.current.rotation.y = -Math.PI / 2;
//         }
//       }

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
//       {/* 🔒 Frame Left Post */}
//       <mesh position={[-9, 5, 0]}>
//         <boxGeometry args={[2, 10, 1]} />
//         <meshStandardMaterial color="#d2b48c" />
//       </mesh>

//       {/* 🔒 Frame Right Post */}
//       <mesh position={[9, 5, 0]}>
//         <boxGeometry args={[2, 10, 1]} />
//         <meshStandardMaterial color="#d2b48c" />
//       </mesh>

//       {/* 🔒 Frame Top Beam */}
//       <mesh position={[0, 10.5, 0]}>
//         <boxGeometry args={[20, 1, 1]} />
//         <meshStandardMaterial color="#d2b48c" />
//       </mesh>

//       {/* 🚪 Left Swinging Gate */}
//       <group ref={leftPivot} position={[-8, 0, 0]}>
//         <mesh position={[4, 5, 0]}>
//           <boxGeometry args={[8, 10, 1]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>
//       </group>

//       {/* 🚪 Right Swinging Gate */}
//       <group ref={rightPivot} position={[8, 0, 0]}>
//         <mesh position={[-4, 5, 0]}>
//           <boxGeometry args={[8, 10, 1]} />
//           <meshStandardMaterial color="#8B4513" />
//         </mesh>
//       </group>

//       {/* 🪧 Welcome Sign */}
//       <group position={[0, 13, 0]}>
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
//           Welcome!!!!
//         </Text>
//       </group>
//     </group>
//   );
// }

// src/SwingingGate.jsx
// src/SwingingGate.jsx
// src/SwingingGate.jsx
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";

export default function SwingingGate({ playerRef }) {
  const leftPivot = useRef();
  const rightPivot = useRef();
  const [open, setOpen] = useState(false);

  useFrame(() => {
    if (!playerRef.current) return;
    const { x, z } = playerRef.current.translation();
    const dist = Math.hypot(x, z - 110);
    if (dist < 10) setOpen(true);

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
      <group position={[0, 13, 0]}>
        {/* metal hooks (just 1.5 units above the board) */}
        {[-2, 2].map((x) => (
          <mesh key={x} position={[x, 1.5, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        ))}

        {/* carved wooden sign (0.3 corner radius) */}
        <RoundedBox
          args={[16, 3, 0.5]}
          radius={0.3}
          smoothness={8}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#8B5E3C"
            metalness={0.2}
            roughness={0.7}
          />
        </RoundedBox>

        {/* text overlay, just slightly in front */}
        <Text
          position={[0, 0, 0.3]}
          fontSize={0.6}
          color="#fde8cd"
          outlineWidth={0.02}
          outlineColor="#000"
          anchorX="center"
          anchorY="middle"
          // font="/fonts/Pacifico-Regular.ttf"
        >
          Welcome to{"\n"}Ryan Cokely’s{"\n"}Portfolio World!
        </Text>
      </group>
    </group>
  );
}
