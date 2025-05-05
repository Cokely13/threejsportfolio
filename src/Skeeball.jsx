// // SkeeBall.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { Html } from "@react-three/drei";
// import * as THREE from "three";
// import { v4 as uuidv4 } from "uuid";

// /**
//  * A simple Skee-Ball mini-game: roll balls up a ramp into hoops to score.
//  * Adds boundary walls to keep balls in area, solid ring colliders, and scoring popups.
//  */
// export default function SkeeBall({ position = [0, 0, 0] }) {
//   const [balls, setBalls] = useState([]);
//   const [score, setScore] = useState(0);
//   const [popups, setPopups] = useState([]);
//   const didInit = useRef(false);

//   // spawn a new ball at given spawnPosition
//   function spawnBall(spawnPosition) {
//     const id = uuidv4();
//     setBalls((b) => [...b, { id, spawnPosition }]);
//   }

//   // remove and respawn
//   function removeBall(id) {
//     setBalls((b) => {
//       const ball = b.find((x) => x.id === id);
//       if (ball) setTimeout(() => spawnBall(ball.spawnPosition), 1000);
//       return b.filter((x) => x.id !== id);
//     });
//   }

//   // show a floating +pts popup at x,y,z
//   function showPopup({ x, y, z, pts }) {
//     const id = uuidv4();
//     setPopups((p) => [...p, { id, x, y, z, pts }]);
//     setTimeout(() => setPopups((p) => p.filter((pop) => pop.id !== id)), 2000);
//   }

//   useEffect(() => {
//     if (didInit.current) return;
//     didInit.current = true;
//     // three balls side‐by‐side
//     const startZ = -rampLength;
//     const y = rampHeight + 2;
//     const xs = [-3, 0, +3];
//     xs.forEach((x) => spawnBall([x, y, startZ]));
//   }, []);

//   // ramp dimensions
//   const rampLength = 8;
//   const rampHeight = 1.3;
//   const rampWidth = 18;

//   // hoop positions
//   const hoopX = [-rampWidth * 0.3, 0, rampWidth * 0.3];
//   const hoopPoints = [10, 20, 30];
//   const hoopZOffset = rampLength / 2 + 2;

//   // walls
//   const wallHeight = 3;
//   const wallThickness = 0.2;
//   const entranceWidth = 4;
//   const sideWallWidth = (rampWidth - entranceWidth) / 2 + 5;
//   const entranceZ = -rampLength + 1 - 5;

//   return (
//     <group position={position}>
//       {/* Ramp */}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh
//           rotation={[-Math.PI / 6, 0, 0]}
//           position={[0, rampHeight / 2, -rampLength / 2]}
//           castShadow
//           receiveShadow
//         >
//           <boxGeometry args={[rampWidth, rampHeight, rampLength]} />
//           <meshStandardMaterial color="#888" />
//         </mesh>
//       </RigidBody>

//       {/* Front walls with opening */}
//       {[-1, 1].map((side) => (
//         <RigidBody key={side} type="fixed" colliders="cuboid">
//           <mesh
//             position={[
//               side * (entranceWidth / 2 + sideWallWidth / 2),
//               wallHeight / 2 - 1,
//               entranceZ - 11,
//             ]}
//           >
//             <boxGeometry
//               args={[sideWallWidth, wallHeight - 1, wallThickness]}
//             />
//             <meshStandardMaterial color="#444" />
//           </mesh>
//         </RigidBody>
//       ))}

//       {/* Boundary walls */}
//       {[-1, 1].map((side) => (
//         <RigidBody key={side} type="fixed" colliders="cuboid">
//           <mesh
//             position={[
//               side * (rampWidth / 2 + wallThickness / 2 + 5),
//               wallHeight / 2,
//               4,
//             ]}
//           >
//             <boxGeometry args={[wallThickness, wallHeight, rampLength + 46]} />
//             <meshStandardMaterial color="#444" />
//           </mesh>
//         </RigidBody>
//       ))}
//       <RigidBody type="fixed" colliders="cuboid">
//         <mesh
//           position={[0, wallHeight / 2, hoopZOffset + wallThickness / 2 + 25]}
//         >
//           <boxGeometry args={[rampWidth + 10.5, wallHeight, wallThickness]} />
//           <meshStandardMaterial color="#444" />
//         </mesh>
//       </RigidBody>

//       {/* Hoops */}
//       {hoopX.map((x, idx) => (
//         <group key={x}>
//           <mesh
//             position={[x, 1, hoopZOffset + 2]}
//             rotation={[0, Math.PI, 0]}
//             castShadow
//           >
//             <torusGeometry args={[2, 0.2, 16, 100]} />
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

//           {/* Debug sensor area */}
//           <mesh position={[x, 1, hoopZOffset + 2]} castShadow>
//             <boxGeometry args={[2.5, 1.5, 0.4]} />
//             <meshBasicMaterial wireframe color="hotpink" />
//           </mesh>

//           {/* sensor box in front of hoop */}
//           <CuboidCollider
//             sensor
//             args={[2.5, 1.5, 0.4]}
//             position={[x, 1, hoopZOffset + 2]}
//             onIntersectionEnter={() => {
//               console.log("Points!", hoopPoints[idx]);
//               setScore((s) => s + hoopPoints[idx]);
//             }}
//           />
//         </group>
//       ))}

//       {/* score popups */}
//       {popups.map(({ id, x, y, z, pts }) => (
//         <Html key={id} position={[x, y, z]} center>
//           <div
//             style={{
//               color: "yellow",
//               fontSize: "20px",
//               fontWeight: "bold",
//               textShadow: "0 0 4px black",
//             }}
//           >
//             +{pts}
//           </div>
//         </Html>
//       ))}

//       {/* Score display */}
//       <Html position={[0, 2.5, hoopZOffset + 1]} center>
//         <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
//           Score: {score}
//         </div>
//       </Html>

//       {/* Balls */}
//       {balls.map(({ id, spawnPosition }) => (
//         <Ball
//           key={id}
//           id={id}
//           spawnPosition={spawnPosition}
//           onFallOut={() => removeBall(id)}
//         />
//       ))}
//     </group>
//   );
// }

// function Ball({ id, spawnPosition, onFallOut }) {
//   const ref = useRef();

//   useFrame(() => {
//     if (ref.current.translation().y < -5) onFallOut();
//   });

//   return (
//     <RigidBody
//       ref={ref}
//       type="dynamic"
//       colliders="ball"
//       restitution={0.9}
//       friction={0.00001}
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
// SkeeBall.jsx
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

/**
 * A simple Skee-Ball mini-game: roll balls up a ramp into hoops to score.
 * Scoreboard floats above the ramp and only appears while inside the play area.
 */
export default function SkeeBall({ position = [0, 0, 0] }) {
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [popups, setPopups] = useState([]);
  const didInit = useRef(false);
  const inGame = useRef(false);

  // spawn a new ball
  function spawnBall(spawnPosition) {
    const id = uuidv4();
    setBalls((b) => [...b, { id, spawnPosition }]);
  }

  // remove and schedule respawn
  function removeBall(id) {
    setBalls((b) => {
      const ball = b.find((x) => x.id === id);
      if (ball) setTimeout(() => spawnBall(ball.spawnPosition), 1000);
      return b.filter((x) => x.id !== id);
    });
  }

  // show floating +points
  function showPopup({ x, y, z, pts }) {
    const id = uuidv4();
    setPopups((p) => [...p, { id, x, y, z, pts }]);
    setTimeout(() => setPopups((p) => p.filter((pop) => pop.id !== id)), 2000);
  }

  // dimensions
  const rampLength = 8;
  const rampHeight = 1.3;
  const rampWidth = 18;
  const hoopX = [-rampWidth * 0.3, 0, rampWidth * 0.3];
  const hoopPoints = [10, 20, 30];
  const hoopZOffset = rampLength / 2 + 2;
  const wallHeight = 3;
  const wallThickness = 0.2;
  const entranceWidth = 4;
  const sideWallWidth = (rampWidth - entranceWidth) / 2 + 5;
  const entranceZ = -rampLength + 1 - 5;

  // initial spawn
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const startZ = -rampLength;
    const y = rampHeight + 2;
    const xs = [-3, 0, +3];
    xs.forEach((x) => spawnBall([x, y, startZ]));
  }, []);

  // compute world-space pos for the floating scoreboard
  const scorePos = [0, rampHeight + 15, hoopZOffset + 15];

  return (
    <group position={position}>
      {/* Play-area sensor */}
      <CuboidCollider
        sensor
        args={[(entranceWidth * 7) / 2, wallHeight, 30]}
        position={[0, wallHeight, entranceZ + 16]}
        onIntersectionEnter={() => {
          if (!inGame.current) {
            inGame.current = true;
            setShowScore(true);
          }
        }}
        onIntersectionExit={() => {
          if (inGame.current) {
            inGame.current = false;
            setShowScore(false);
            setScore(0);
          }
        }}
      />
      {/* Debug sensor box */}
      {/* <mesh position={[0, wallHeight / 2, entranceZ + 16]}>
        <boxGeometry args={[entranceWidth * 7, wallHeight, 55]} />
        <meshBasicMaterial wireframe color="cyan" />
      </mesh> */}

      {/* Floating world-space scoreboard */}
      {showScore && (
        <group position={scorePos} rotation={[0, Math.PI, 0]}>
          <Html transform occlude center>
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                padding: "8px 16px",
                borderRadius: 4,
                color: "white",
                fontSize: "144px",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              Score: {score}
            </div>
          </Html>
        </group>
      )}

      {/* Ramp */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          rotation={[-Math.PI / 6, 0, 0]}
          position={[0, rampHeight / 2, -rampLength / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[rampWidth, rampHeight, rampLength]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      </RigidBody>

      {/* Front walls with opening */}
      {[-1, 1].map((side) => (
        <RigidBody key={side} type="fixed" colliders="cuboid">
          <mesh
            position={[
              side * (entranceWidth / 2 + sideWallWidth / 2),
              wallHeight / 2 - 1,
              entranceZ - 11,
            ]}
          >
            <boxGeometry
              args={[sideWallWidth, wallHeight - 1, wallThickness]}
            />
            <meshStandardMaterial color="#444" />
          </mesh>
        </RigidBody>
      ))}

      {/* Side/back walls */}
      {[-1, 1].map((side) => (
        <RigidBody key={`side-${side}`} type="fixed" colliders="cuboid">
          <mesh
            position={[
              side * (rampWidth / 2 + wallThickness / 2 + 5),
              wallHeight / 2,
              4,
            ]}
          >
            <boxGeometry args={[wallThickness, wallHeight, rampLength + 46]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        </RigidBody>
      ))}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, wallHeight / 2, hoopZOffset + wallThickness / 2 + 25]}
        >
          <boxGeometry args={[rampWidth + 10.5, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>

      {/* Hoops & sensors */}
      {hoopX.map((x, idx) => (
        <group key={x}>
          <mesh
            position={[x, 1, hoopZOffset + 2]}
            rotation={[0, Math.PI, 0]}
            castShadow
          >
            <torusGeometry args={[2, 0.2, 16, 100]} />
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
          <mesh position={[x, 1, hoopZOffset + 2]}>
            <boxGeometry args={[2.5, 1.5, 0.4]} />
            <meshBasicMaterial wireframe color="hotpink" />
          </mesh>
          <CuboidCollider
            sensor
            args={[2.5, 1.5, 0.4]}
            position={[x, 1, hoopZOffset + 2]}
            onIntersectionEnter={() => {
              console.log("Points!", hoopPoints[idx]);
              setScore((s) => s + hoopPoints[idx]);
              showPopup({
                x,
                y: 2.5,
                z: hoopZOffset + 2,
                pts: hoopPoints[idx],
              });
            }}
          />
        </group>
      ))}

      {/* Popups */}
      {popups.map(({ id, x, y, z, pts }) => (
        <Html key={id} position={[x, y, z]} center>
          <div
            style={{
              color: "yellow",
              fontSize: "20px",
              fontWeight: "bold",
              textShadow: "0 0 4px black",
            }}
          >
            +{pts}
          </div>
        </Html>
      ))}

      {/* Balls */}
      {balls.map(({ id, spawnPosition }) => (
        <Ball
          key={id}
          id={id}
          spawnPosition={spawnPosition}
          onFallOut={() => removeBall(id)}
        />
      ))}
    </group>
  );
}

function Ball({ id, spawnPosition, onFallOut }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current.translation().y < -5) onFallOut();
  });
  return (
    <RigidBody
      ref={ref}
      type="dynamic"
      colliders="ball"
      restitution={0.9}
      friction={0.00001}
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
