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
  function removeBall(id, spawnPosition) {
    // drop the ball immediately
    setBalls((b) => b.filter((x) => x.id !== id));
    // if the caller passed a spawnPosition, schedule exactly one respawn
    if (spawnPosition) {
      setTimeout(() => spawnBall(spawnPosition), 1000);
    }
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
        onIntersectionEnter={(e) => {
          if (e.rigidBody?.userData.isPlayer && !inGame.current) {
            inGame.current = true;
            setShowScore(true);
          }
        }}
        onIntersectionExit={(e) => {
          if (e.rigidBody?.userData.isPlayer && inGame.current) {
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

      {/* Back‐wall “miss” sensor → respawn the ball */}
      {/* <CuboidCollider
        sensor
        // half-extents: [width/2, height/2, depth/2]
        args={[
          (rampWidth + 10.5) / 2, // match your wall’s full width = rampWidth + 10.5
          wallHeight / 2,
          3 / 2, // your wall thickness is 3
        ]}
        // push it out so its near the back wall
        position={[
          0,
          wallHeight / 2,
          hoopZOffset + wallThickness / 2 + 25 - 3 / 2,
        ]}
        onIntersectionEnter={({ other }) => {
          console.log(
            "🏀 Miss sensor triggered by ball:",
            other.rigidBodyObject.userData.id
          );
          if (other.rigidBodyObject.type === "dynamic") {
            const id = other.rigidBodyObject.userData.id;
            // pick a random X spawn
            const xs = [-3, 0, 3];
            const x = xs[Math.floor(Math.random() * xs.length)];
            // remove the old ball and schedule exactly one respawn
            removeBall(id, [x, rampHeight + 2, -rampLength]);
          }
        }}
      />


      <mesh position={[0, wallHeight / 2, hoopZOffset + 25 - 3 / 2]}>
        <boxGeometry args={[rampWidth + 10.5, wallHeight, 3]} />
        <meshBasicMaterial wireframe color="red" />
      </mesh> */}

      <CuboidCollider
        sensor
        // args are [halfWidth, halfHeight, halfDepth]
        args={[
          (rampWidth + 10.5) / 2, // half of the wall’s total width
          wallHeight / 2, // half the wall’s height
          3 / 2, // half of the 3-unit deep sensor
        ]}
        // place it just in front of the wall’s front face:
        position={[
          0,
          wallHeight / 2,
          hoopZOffset + wallThickness / 2 + 25 - 3 / 2,
        ]}
        onIntersectionEnter={({ other }) => {
          // whenever any dynamic ball enters, grab its id and respawn it
          console.log("HEY!!!");
          const id = other.rigidBodyObject.userData?.id;
          if (id) {
            removeBall(id);
            // choose a new X for the respawn
            const xs = [-3, 0, 3];
            const x = xs[Math.floor(Math.random() * xs.length)];
            spawnBall([x, rampHeight + 2, -rampLength]);
          }
        }}
      />

      {/* Debug mesh so you can see exactly where the sensor is */}
      <mesh
        position={[
          0,
          wallHeight / 2,
          hoopZOffset + wallThickness / 2 + 25 - 3 / 2,
        ]}
      >
        {/* full dimensions here */}
        <boxGeometry args={[rampWidth + 10.5, wallHeight, 3]} />
        <meshBasicMaterial wireframe color="red" />
      </mesh>

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
