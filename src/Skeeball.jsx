// // SkeeBall.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { Html } from "@react-three/drei";
// import * as THREE from "three";
// import { v4 as uuidv4 } from "uuid";

// /**
//  * A simple Skee-Ball mini-game: roll balls up a ramp into hoops to score.
//  * Adds boundary walls to keep balls in area and spaced-out hoops.
//  */
// export default function SkeeBall({ position = [0, 0, 0] }) {
//   const [balls, setBalls] = useState([]);
//   const [score, setScore] = useState(0);

//   // spawn a new ball at the start position
//   function spawnBall() {
//     const id = uuidv4();
//     setBalls((b) => [...b, { id }]);
//   }

//   useEffect(() => {
//     // initial ball
//     spawnBall();
//   }, []);

//   // remove a ball by id and respawn
//   function removeBall(id) {
//     setBalls((b) => b.filter((ball) => ball.id !== id));
//     setTimeout(spawnBall, 1000);
//   }

//   // ramp dimensions
//   const rampLength = 8;
//   const rampHeight = 1.3;
//   const rampWidth = 18;

//   // hoop positions spread across ramp width
//   const hoopX = [-rampWidth * 0.3, 0, rampWidth * 0.3];
//   const hoopPoints = [10, 20, 30];

//   // wall dimensions
//   const wallHeight = 3;
//   const wallThickness = 0.2;

//   return (
//     <group position={position}>
//       {/* Ramp */}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh
//           rotation={[-Math.PI / 6, 0, 0]} // incline ~30°
//           position={[0, rampHeight / 2, -rampLength / 2]}
//           castShadow
//           receiveShadow
//         >
//           <boxGeometry args={[rampWidth, rampHeight, rampLength]} />
//           <meshStandardMaterial color="#888" />
//         </mesh>
//       </RigidBody>

//       {/* Boundary walls */}
//       {/* Left wall */}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh
//           position={[-rampWidth / 2 - wallThickness / 2 - 3, wallHeight / 2, 0]}
//         >
//           <boxGeometry args={[wallThickness, wallHeight, rampLength + 30]} />
//           <meshStandardMaterial color="#444" />
//         </mesh>
//       </RigidBody>
//       {/* Right wall */}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh
//           position={[rampWidth / 2 + wallThickness / 2 + 5, wallHeight / 2, 0]}
//         >
//           <boxGeometry args={[wallThickness, wallHeight, rampLength + 30]} />
//           <meshStandardMaterial color="#444" />
//         </mesh>
//       </RigidBody>
//       {/* Back wall behind hoops */}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh position={[1, wallHeight / 2, rampLength / 2 + 15]}>
//           <boxGeometry args={[rampWidth + 8, wallHeight, wallThickness]} />
//           <meshStandardMaterial color="#444" />
//         </mesh>
//       </RigidBody>

//       {/* Hoops */}
//       {hoopX.map((x, idx) => (
//         <group key={x}>
//           <mesh
//             position={[x, 1, rampLength / 2 + 0.5]}
//             rotation={[0, Math.PI, 0]}
//             castShadow
//           >
//             <torusGeometry args={[1.5, 0.1, 16, 100]} />
//             <meshStandardMaterial
//               color={
//                 hoopPoints[idx] === 20
//                   ? "#4caf50"
//                   : hoopPoints[idx] === 10
//                   ? "#2196f3"
//                   : "#ff9800"
//               }
//             />
//           </mesh>
//           {/* sensor box in front of hoop */}
//           <CuboidCollider
//             sensor
//             args={[1.5, 1, 0.2]}
//             position={[x, 1, rampLength / 2 + 0.5]}
//             onIntersectionEnter={({ other }) => {
//               if (other.rigidBodyObject.type === "dynamic") {
//                 setScore((s) => s + hoopPoints[idx]);
//                 const ballId = other.rigidBodyObject.userData.id;
//                 removeBall(ballId);
//               }
//             }}
//           />
//         </group>
//       ))}

//       {/* Score display */}
//       <Html position={[0, 2.5, rampLength / 2 + 1]} center>
//         <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
//           Score: {score}
//         </div>
//       </Html>

//       {/* Balls */}
//       {balls.map(({ id }) => (
//         <Ball
//           key={id}
//           id={id}
//           spawnPosition={[0, rampHeight + 2, -rampLength]}
//           onFallOut={() => removeBall(id)}
//         />
//       ))}
//     </group>
//   );
// }

// function Ball({ id, spawnPosition, onFallOut }) {
//   const ref = useRef();

//   // if ball falls below ground, remove it
//   useFrame(() => {
//     if (ref.current.translation().y < -5) {
//       onFallOut();
//     }
//   });

//   return (
//     <RigidBody
//       ref={ref}
//       type="dynamic"
//       colliders="ball"
//       restitution={0.5}
//       friction={0.6}
//       position={spawnPosition}
//       userData={{ id }}
//     >
//       <mesh castShadow>
//         <sphereGeometry args={[0.6, 16, 16]} />
//         <meshStandardMaterial color="white" />
//       </mesh>
//     </RigidBody>
//   );
// }

// SkeeBall.jsx
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

/**
 * A simple Skee-Ball mini-game: roll balls up a ramp into hoops to score.
 * Adds boundary walls to keep balls in area and spaced-out hoops.
 */
export default function SkeeBall({ position = [0, 0, 0] }) {
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);

  // spawn a new ball at the start position
  function spawnBall() {
    const id = uuidv4();
    setBalls((b) => [...b, { id }]);
  }

  useEffect(() => {
    // initial ball
    spawnBall();
  }, []);

  // remove a ball by id and respawn
  function removeBall(id) {
    setBalls((b) => b.filter((ball) => ball.id !== id));
    setTimeout(spawnBall, 1000);
  }

  // ramp dimensions
  const rampLength = 8;
  const rampHeight = 1.3;
  const rampWidth = 18;

  // hoop positions spread across ramp width
  const hoopX = [-rampWidth * 0.3, 0, rampWidth * 0.3];
  const hoopPoints = [10, 20, 30];
  const hoopZOffset = rampLength / 2 + 2; // moved back further

  // wall dimensions
  const wallHeight = 3;
  const wallThickness = 0.2;

  // entrance gap in front walls
  const entranceWidth = 6;
  const sideWallWidth = (rampWidth - entranceWidth) / 2;
  const entranceZ = -rampLength + 1;

  return (
    <group position={position}>
      {/* Ramp */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          rotation={[-Math.PI / 6, 0, 0]} // incline ~30°
          position={[0, rampHeight / 2, -rampLength / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[rampWidth, rampHeight, rampLength]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      </RigidBody>

      {/* Front walls with opening */}
      {/* Left segment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[
            -(entranceWidth / 2 + sideWallWidth / 2),
            wallHeight / 2,
            entranceZ,
          ]}
        >
          <boxGeometry args={[sideWallWidth, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>
      {/* Right segment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[
            entranceWidth / 2 + sideWallWidth / 2,
            wallHeight / 2,
            entranceZ,
          ]}
        >
          <boxGeometry args={[sideWallWidth, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>

      {/* Boundary walls */}
      {/* Left wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[-rampWidth / 2 - wallThickness / 2, wallHeight / 2, 0]}
        >
          <boxGeometry args={[wallThickness, wallHeight, rampLength + 4]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>
      {/* Right wall */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[rampWidth / 2 + wallThickness / 2, wallHeight / 2, 0]}>
          <boxGeometry args={[wallThickness, wallHeight, rampLength + 4]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>
      {/* Back wall behind hoops */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, hoopZOffset + wallThickness / 2]}>
          <boxGeometry args={[rampWidth + 4, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>

      {/* Hoops */}
      {hoopX.map((x, idx) => (
        <group key={x}>
          <mesh
            position={[x, 1, hoopZOffset]}
            rotation={[0, Math.PI, 0]}
            castShadow
          >
            <torusGeometry args={[2.5, 0.2, 16, 100]} />
            <meshStandardMaterial
              color={
                hoopPoints[idx] === 20
                  ? "#4caf50"
                  : hoopPoints[idx] === 10
                  ? "#2196f3"
                  : "#ff9800"
              }
            />
          </mesh>
          {/* sensor box in front of hoop */}
          <CuboidCollider
            sensor
            args={[2.5, 1.5, 0.4]}
            position={[x, 1, hoopZOffset]}
            onIntersectionEnter={({ other }) => {
              if (other.rigidBodyObject.type === "dynamic") {
                setScore((s) => s + hoopPoints[idx]);
                const ballId = other.rigidBodyObject.userData.id;
                removeBall(ballId);
              }
            }}
          />
        </group>
      ))}

      {/* Score display */}
      <Html position={[0, 2.5, hoopZOffset + 1]} center>
        <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
          Score: {score}
        </div>
      </Html>

      {/* Balls */}
      {balls.map(({ id }) => (
        <Ball
          key={id}
          id={id}
          spawnPosition={[0, rampHeight + 2, -rampLength]}
          onFallOut={() => removeBall(id)}
        />
      ))}
    </group>
  );
}

function Ball({ id, spawnPosition, onFallOut }) {
  const ref = useRef();

  // if ball falls below ground, remove it
  useFrame(() => {
    if (ref.current.translation().y < -5) {
      onFallOut();
    }
  });

  return (
    <RigidBody
      ref={ref}
      type="dynamic"
      colliders="ball"
      restitution={0.9} // more bouncy
      friction={0.3}
      position={spawnPosition}
      userData={{ id }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </RigidBody>
  );
}
