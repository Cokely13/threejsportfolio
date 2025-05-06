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
export default function SkeeBall({
  position = [0, 0, 0],
  onEnterGameArea,
  rulesOpen,
}) {
  const [balls, setBalls] = useState([]);
  const [record, setRecord] = useState({ name: "", score: 0 });
  const [score, setScore] = useState(0);
  const [ballsRemaining, setBallsRemaining] = useState(3);
  const [showScore, setShowScore] = useState(false);
  const [popups, setPopups] = useState([]);
  const didInit = useRef(false);
  const inGame = useRef(false);

  // spawn a new ball at given spawnPosition
  function spawnBall(spawnPosition) {
    const id = uuidv4();
    setBalls((b) => [...b, { id, spawnPosition }]);
  }

  function todayKey() {
    return "skeeball-record-" + new Date().toISOString().slice(0, 10);
  }

  useEffect(() => {
    const saved = localStorage.getItem(todayKey());
    if (saved) setRecord(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (ballsRemaining === 0 && score > record.score) {
      const name = window.prompt(
        `New High Score ${score}! Enter your name:`,
        ""
      );
      if (name) {
        const newRec = { name, score };
        setRecord(newRec);
        localStorage.setItem(todayKey(), JSON.stringify(newRec));
      }
    }
  }, [ballsRemaining]);

  // remove a ball immediately (no auto-respawn here)
  function removeBall(id) {
    setBalls((b) => b.filter((x) => x.id !== id));
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
  const staggerSpacing = 6; // how far apart (in world units)
  const hoopZBase = hoopZOffset + 5; // your original “hoopZOffset + 2”
  const hoopZStagger = hoopX.map(
    (_, idx) => hoopZBase + (idx - 1) * staggerSpacing
  );
  const wallHeight = 3;
  const wallThickness = 0.2;
  const entranceWidth = 4;
  const sideWallWidth = (rampWidth - entranceWidth) / 2 + 5;
  const entranceZ = -rampLength + 1 - 5;

  // initial spawn of 3 balls when component mounts
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const startZ = -rampLength;
    const y = rampHeight + 2;
    const xs = [-3, 0, +3];
    xs.forEach((x) => spawnBall([x, y, startZ]));
  }, []);

  // scoreboard world-space position
  const scorePos = [0, rampHeight + 15, hoopZOffset + 15];

  return (
    <group position={position}>
      {/* Play-area sensor */}
      <CuboidCollider
        sensor
        args={[(entranceWidth * 7) / 2, wallHeight, 30]}
        position={[0, wallHeight, entranceZ + 16]}
        onIntersectionEnter={(e) => {
          // only trigger for the player body
          if (e.rigidBody?.userData?.isPlayer && !inGame.current) {
            inGame.current = true;
            setShowScore(true);
            onEnterGameArea();
          }
        }}
        onIntersectionExit={(e) => {
          if (e.rigidBody?.userData?.isPlayer && inGame.current) {
            inGame.current = false;
            setShowScore(false);
            setScore(0);
            setBallsRemaining(3);
            // clear existing balls and respawn 3 fresh ones
            setBalls([]);
            const startZ = -rampLength;
            const y = rampHeight + 2;
            const xs = [-3, 0, +3];
            xs.forEach((x) => spawnBall([x, y, startZ]));
          }
        }}
      />

      {/* Floating world-space scoreboard */}
      {showScore && !rulesOpen && (
        <group position={scorePos} rotation={[0, Math.PI, 0]}>
          <Html transform occlude center>
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                padding: "8px 16px",
                borderRadius: 4,
                color: "white",
                fontSize: "64px",
                fontWeight: "bold",
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              <div>Score: {score}</div>
              <div>Balls Remaining: {ballsRemaining}</div>
              <hr style={{ margin: "8px 0", borderColor: "white" }} />
              <div style={{ fontSize: "48px" }}>
                Today’s High Score:
                <br />
                {record.name} — {record.score}
              </div>
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

      {/* Front‐opening “miss” sensor → lose a ball */}
      <CuboidCollider
        sensor
        // half‐extents: [width/2, height/2, depth/2]
        args={[
          entranceWidth / 2, // half the opening width
          wallHeight / 2, // half the wall height
          1 / 2, // thin depth
        ]}
        // sit it flush with the front face of your walls:
        position={[
          0,
          wallHeight / 2,
          entranceZ - 11.5, // just outside the opening
        ]}
        onIntersectionEnter={(e) => {
          const ballId = e.rigidBody?.userData?.id;
          if (!ballId) return; // ignore non‐balls
          console.log("Front miss:", ballId);
          removeBall(ballId);
          setBallsRemaining((n) => Math.max(0, n - 1));
        }}
      />
      {/* Debug mesh so you can see exactly where the front sensor is */}
      {/* <mesh position={[0, wallHeight / 2, entranceZ - 11.5]}>
        <boxGeometry args={[entranceWidth, wallHeight, 1]} />
        <meshBasicMaterial wireframe color="blue" />
      </mesh> */}

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

      {/* Back-wall “miss” sensor → lose a ball */}
      <CuboidCollider
        sensor
        args={[(rampWidth + 10.5) / 2, wallHeight / 2, 3 / 2]}
        position={[0, wallHeight / 2, hoopZOffset + 25 - 3 / 2]}
        onIntersectionEnter={(e) => {
          const ballId = e.rigidBody?.userData?.id;
          if (!ballId) return;
          console.log("Missed ball:", ballId);
          removeBall(ballId);
          setBallsRemaining((n) => Math.max(0, n - 1));
        }}
      />
      {/* Debug mesh */}
      {/* <mesh position={[0, wallHeight / 2, hoopZOffset + 25 - 3 / 2]}>
        <boxGeometry args={[rampWidth + 10.5, wallHeight, 3]} />
        <meshBasicMaterial wireframe color="red" />
      </mesh> */}

      {/* Hoops & sensors */}
      {hoopX.map((x, idx) => (
        <group key={x}>
          {/* ring mesh */}
          <mesh
            position={[x, 1, hoopZStagger[idx]]}
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
          {/* debug box */}
          {/* <mesh position={[x, 1, hoopZStagger[idx]]}>
            <boxGeometry args={[2.5, 1.5, 0.4]} />
            <meshBasicMaterial wireframe color="hotpink" />
          </mesh> */}
          {/* scoring sensor */}
          <CuboidCollider
            sensor
            args={[2.5, 1.5, 0.4]}
            position={[x, 1, hoopZStagger[idx]]}
            onIntersectionEnter={(e) => {
              const rb = e.rigidBody;
              const ballId = rb?.userData?.id;
              if (!ballId) return;

              console.log("Hoop scored!", hoopPoints[idx], "pts");
              // setScore((s) => s + hoopPoints[idx]);
              setScore((s) => s + hoopPoints[idx]);
              showPopup({
                x,
                y: 2.5,
                z: hoopZOffset + 2,
                pts: hoopPoints[idx],
              });

              // respawn ball in same lane
              removeBall(ballId);
              spawnBall([x, rampHeight + 2, -rampLength]);
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
          onFallOut={() => {
            // if player rolls a ball off the side or bottom,
            // treat it as a miss:
            removeBall(id);
            setBallsRemaining((n) => Math.max(0, n - 1));
          }}
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
      friction={0.00000001}
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
