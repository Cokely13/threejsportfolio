// import { useRef, useState } from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
// import * as THREE from "three";

// export default function Chalkboard({
//   position = [-95, 10, 15],
//   rotation = [0, 1.5, 0],
//   fadeIn = true,
// }) {
//   const boardRef = useRef();
//   const texture = useLoader(THREE.TextureLoader, "/models/skill.png");
//   const [opacity, setOpacity] = useState(0);

//   useFrame((state) => {
//     if (boardRef.current) {
//       const t = state.clock.getElapsedTime();
//       // boardRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.3; // Floating
//       // boardRef.current.lookAt(state.camera.position);

//       if (fadeIn && opacity < 1) {
//         setOpacity((prev) => Math.min(prev + 0.02, 1));
//       }

//       // Apply current opacity
//       boardRef.current.material.opacity = opacity;
//     }
//   });

//   return (
//     <mesh ref={boardRef} position={position} rotation={rotation}>
//       <planeGeometry args={[20, 10]} />
//       <meshStandardMaterial map={texture} transparent opacity={opacity} />
//     </mesh>
//   );
// }

// src/Chalkboard.jsx
// import React from "react";
// import { useRef, useState } from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
// import * as THREE from "three";
// import { Text } from "@react-three/drei";
// import { TextureLoader } from "three";

// const SKILLS = [
//   { name: "JavaScript", logo: "/logos/js.jpg" },
//   { name: "PostgreSQL", logo: "/logos/Postgre.svg" },
//   { name: "Express", logo: "/logos/express.jpg" },
//   { name: "React", logo: "/logos/react.png" },
//   { name: "Node", logo: "/logos/Node.jpeg" },
//   { name: "CSS", logo: "/logos/css.jpg" },
//   { name: "Three.js", logo: "/logos/three.jpg" },
// ];

// export default function Chalkboard({
//   position = [-95, 10, 15],
//   rotation = [0, 1.5, 0],
//   boardWidth = 22,
//   boardHeight = 12,
//   fadeIn = true,
// }) {
//   const boardRef = useRef();
//   const textures = useLoader(
//     TextureLoader,
//     SKILLS.map((s) => s.logo)
//   );
//   const [opacity, setOpacity] = useState(0);

//   useFrame((state) => {
//     if (boardRef.current) {
//       const t = state.clock.getElapsedTime();
//       boardRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.3; // Floating
//       boardRef.current.lookAt(state.camera.position);

//       if (fadeIn && opacity < 1) {
//         setOpacity((prev) => Math.min(prev + 0.02, 1));
//       }

//       // Apply current opacity
//       boardRef.current.material.opacity = opacity;
//     }
//   });
//   // load all logos in one shot

//   // layout: first row 4 items, second row 3 items
//   const row1X = [-7.5, -2.5, 2.5, 7.5];
//   const row2X = [-5, 0, 5];
//   const row1Y = 2.5;
//   const row2Y = -2.5;

//   return (
//     <group position={position} rotation={rotation}>
//       {/* Board background */}
//       <mesh>
//         <planeGeometry args={[boardWidth, boardHeight]} />
//         <meshStandardMaterial color="#222" />
//       </mesh>

//       {/* Logos + labels */}
//       {SKILLS.map((skill, i) => {
//         const isFirstRow = i < 4;
//         const idx = isFirstRow ? i : i - 4;
//         const x = isFirstRow ? row1X[idx] : row2X[idx];
//         const y = isFirstRow ? row1Y : row2Y;

//         return (
//           <group key={skill.name} position={[x, y, 0.1]}>
//             {/* logo */}
//             <mesh>
//               <planeGeometry args={[3, 3]} />
//               <meshStandardMaterial map={textures[i]} toneMapped={false} />
//             </mesh>
//             {/* name label */}
//             <Text
//               position={[0, -2, 0.1]}
//               fontSize={0.5}
//               color="white"
//               anchorX="center"
//               anchorY="top"
//             >
//               {skill.name}
//             </Text>
//           </group>
//         );
//       })}
//     </group>
//   );
// }

// src/Chalkboard.jsx
// import React, { useRef, useState } from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
// import { Text } from "@react-three/drei";
// import { TextureLoader } from "three";

// const SKILLS = [
//   { name: "JavaScript", logo: "/logos/js.jpg" },
//   { name: "PostgreSQL", logo: "/logos/Postgre.svg" },
//   { name: "Express", logo: "/logos/express.jpg" },
//   { name: "React", logo: "/logos/react.png" },
//   { name: "Node", logo: "/logos/Node.jpeg" },
//   { name: "CSS", logo: "/logos/css.jpg" },
//   { name: "Three.js", logo: "/logos/three.jpg" },
// ];

// export default function Chalkboard({
//   position = [-95, 10, 15],
//   rotation = [0, 1.5, 0],
//   boardWidth = 22,
//   boardHeight = 12,
//   fadeIn = false,
// }) {
//   const boardRef = useRef();
//   const textures = useLoader(
//     TextureLoader,
//     SKILLS.map((s) => s.logo)
//   );

//   const row1X = [-7.5, -2.5, 2.5, 7.5];
//   const row2X = [-5, 0, 5];
//   const row1Y = 2.5;
//   const row2Y = -2.5;

//   return (
//     <group position={position} rotation={rotation}>
//       <mesh>
//         <planeGeometry args={[boardWidth, boardHeight]} />
//         <meshStandardMaterial color="#222" />
//       </mesh>

//       {SKILLS.map((skill, i) => {
//         const isFirstRow = i < 4;
//         const idx = isFirstRow ? i : i - 4;
//         const x = isFirstRow ? row1X[idx] : row2X[idx];
//         const y = isFirstRow ? row1Y : row2Y;

//         // internal opacity state drives fade-in
//         const [opacity, setOpacity] = useState(0);
//         useFrame((state, delta) => {
//           if (fadeIn && opacity < 1) {
//             setOpacity((prev) => Math.min(prev + delta * 0.5, 1));
//           }
//           // apply to board material
//           if (boardRef.current) {
//             boardRef.current.material.opacity = opacity;
//           }
//         });

//         return (
//           <group key={skill.name} position={[x, y, 0.1]}>
//             <mesh>
//               <planeGeometry args={[3, 3]} />
//               <meshStandardMaterial map={textures[i]} toneMapped={false} />
//             </mesh>
//             <Text
//               position={[0, -2, 0.1]}
//               fontSize={0.5}
//               color="white"
//               anchorX="center"
//               anchorY="top"
//             >
//               {skill.name}
//             </Text>
//           </group>
//         );
//       })}
//     </group>
//   );
// }

// src/Chalkboard.jsx
// src/Chalkboard.jsx
import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { TextureLoader } from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const SKILLS = [
  { name: "JavaScript", logo: "/logos/js.jpg" },
  { name: "PostgreSQL", logo: "/logos/Postgre.svg" },
  { name: "Express", logo: "/logos/express.jpg" },
  { name: "React", logo: "/logos/react.png" },
  { name: "Node", logo: "/logos/Node.jpeg" },
  { name: "CSS", logo: "/logos/css.jpg" },
  { name: "Three.js", logo: "/logos/three.jpg" },
];

export default function Chalkboard({
  position = [-95, 10, 10],
  rotation = [0, 1.5, 0],
  boardWidth = 30,
  boardHeight = 15,
  fadeIn = false,
  fadeSpeed = 0.5,
}) {
  const boardRef = useRef();
  const textures = useLoader(
    TextureLoader,
    SKILLS.map((s) => s.logo)
  );

  // shared opacity for fade-in
  const [opacity, setOpacity] = useState(0);
  useFrame((_, delta) => {
    if (fadeIn && opacity < 1) {
      setOpacity((o) => Math.min(o + delta * fadeSpeed, 1));
    }
    if (boardRef.current) boardRef.current.material.opacity = opacity;
  });

  // positions for two rows
  const row1X = useMemo(() => [-10, -3.5, 3.5, 10], []);
  const row2X = useMemo(() => [-7.5, 0, 7.5], []);
  const row1Y = 3.5;
  const row2Y = -2.5;

  // half-depth for collider thickness
  const halfDepth = 1; // total collider thickness = 2 units

  return (
    <group position={position} rotation={rotation}>
      {/* physics + visibility helpers inside same transform */}
      <RigidBody type="fixed" colliders={false}>
        {/* the actual physics body */}
        <CuboidCollider
          args={[boardWidth / 2, boardHeight / 2, halfDepth]}
          position={[0, 0, halfDepth]}
        />
        {/* wireframe so you can see the collider box */}

        {/* the visible board */}
        <mesh ref={boardRef}>
          <planeGeometry args={[boardWidth, boardHeight]} />
          <meshStandardMaterial color="#222" transparent opacity={opacity} />
        </mesh>

        {/* logos + labels */}
        {SKILLS.map((skill, i) => {
          const isFirstRow = i < 4;
          const idx = isFirstRow ? i : i - 4;
          const x = isFirstRow ? row1X[idx] : row2X[idx];
          const y = isFirstRow ? row1Y : row2Y;

          return (
            <group key={skill.name} position={[x, y, 0.1]}>
              <mesh>
                <planeGeometry args={[3, 3]} />
                <meshStandardMaterial
                  map={textures[i]}
                  toneMapped={false}
                  transparent
                  opacity={opacity}
                />
              </mesh>
              <Text
                position={[0, -2, 0.1]}
                fontSize={1}
                color="white"
                anchorX="center"
                anchorY="top"
                material-transparent
                material-opacity={opacity}
              >
                {skill.name}
              </Text>
            </group>
          );
        })}
      </RigidBody>
    </group>
  );
}
