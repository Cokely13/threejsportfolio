// SkeeBall.jsx
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PositionalAudio } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Edges } from "@react-three/drei";
import GameOverPopup from "./GameOverPopup";
import "./Scoreboard.css";

/**
 * A simple Skee-Ball mini-game: roll balls up a ramp into hoops to score.
 * Scoreboard floats above the ramp and only appears while inside the play area.
 */
export default function SkeeBall({
  position = [0, 0, 0],
  onEnterGameArea,
  rulesOpen,
  onGameOver,
  resetTrigger,
}) {
  const [balls, setBalls] = useState([]);
  const [record, setRecord] = useState({ name: "", score: 0 });
  const [score, setScore] = useState(0);
  const [ballsRemaining, setBallsRemaining] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const scoreSound = useRef();
  const missSound = useRef();
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

  useEffect(() => {
    if (resetTrigger > 0) {
      resetGame();
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (ballsRemaining === 0) {
      onGameOver(true);
    }
  }, [ballsRemaining]);

  function resetGame() {
    // reset score & ballsRemaining
    setScore(0);
    setBallsRemaining(3);
    onGameOver(false);
    // clear all existing balls
    setBalls([]);
    // respawn 3 fresh balls
    const startZ = -rampLength;
    const y = rampHeight + 2;
    const xs = [-3, 0, +3];
    xs.forEach((x) => spawnBall([x, y, startZ]));
  }

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
  const wallHeight = 6;
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
      {/* ——— Game Over Overlay ——— */}
      {/* {gameOver && (
        <Html fullscreen portal={document.body}>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "2rem",
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: "1rem" }}>Game Over!</div>
            <div style={{ marginBottom: "2rem" }}>Want to play again?</div>
            <div>
              <button
                onClick={resetGame}
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setGameOver(false)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </Html>
      )} */}
      <GameOverPopup
        visible={gameOver}
        onYes={resetGame}
        onNo={() => setGameOver(false)}
      />
      {/* attach a positional “ding” for scoring */}
      <PositionalAudio
        ref={scoreSound}
        url="/sounds/ding.wav"
        distance={5}
        loop={false}
        volume={0.5}
      />

      {/* attach a positional “whoosh” for misses */}
      <PositionalAudio
        ref={missSound}
        url="/sounds/whoosh.wav"
        distance={5}
        loop={false}
        volume={0.5}
      />
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
      {/* {showScore && !rulesOpen && (
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
      )} */}
      {showScore && !rulesOpen && (
        <group position={scorePos} rotation={[0, Math.PI, 0]}>
          <Html transform occlude center>
            <div className="scoreboard">
              <h1>Score: {score}</h1>
              <p className="stat">Balls Remaining: {ballsRemaining}</p>
              <hr />
              <div className="high-score">
                Today’s High Score:
                <br />
                {record.name} — {record.score}
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* Ramp */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        // position={[0, rampHeight / 2, -rampLength / 2]}
        // rotation={[-Math.PI / 6, 0, 0]}
      >
        <mesh
          rotation={[-Math.PI / 6, 0, 0]}
          position={[0, rampHeight / 2, -rampLength / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[rampWidth, rampHeight, rampLength]} />
          <meshPhysicalMaterial
            color="lightblue"
            transmission={0.9} // really let light pass through
            transparent
            opacity={0.25} // mostly clear
            roughness={0}
            metalness={0}
            side={THREE.DoubleSide}
          />
          <Edges
            scale={1.01}
            threshold={15} // angle threshold for edges
            color="darkgray"
          />
        </mesh>
      </RigidBody>

      {/* Front walls with opening */}
      {[-1, 1].map((side) => (
        <RigidBody key={side} type="fixed" colliders="cuboid">
          <mesh
            position={[
              side * (entranceWidth / 2 + sideWallWidth / 2),
              wallHeight / 2 - 1,
              entranceZ - 11.2,
            ]}
          >
            <boxGeometry
              args={[sideWallWidth, wallHeight + 2, wallThickness]}
            />
            {/* <meshStandardMaterial color="#444" /> */}
            {/* Glass material */}
            <meshPhysicalMaterial
              color="#e0f7fa"
              transmission={0.9} // really let light pass through
              transparent
              opacity={0.25} // mostly clear
              roughness={0}
              metalness={0}
              side={THREE.DoubleSide}
            />

            {/* Thin white outline */}
            <Edges
              scale={1.01}
              threshold={15} // angle threshold for edges
              color="white"
            />
          </mesh>
        </RigidBody>
      ))}

      {/* Front‐opening “miss” sensor → lose a ball */}
      <CuboidCollider
        sensor
        args={[entranceWidth / 2, wallHeight / 2, 1 / 2]}
        position={[0, wallHeight / 2, entranceZ - 11.5]}
        onIntersectionEnter={(e) => {
          const ballId = e.rigidBody?.userData?.id;
          if (!ballId) return; // ignore non‐balls
          missSound.current.play();
          removeBall(ballId);
          setBallsRemaining((n) => Math.max(0, n - 1));
        }}
      />

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
            {/* <meshStandardMaterial color="#444" /> */}
            {/* Glass material */}
            <meshPhysicalMaterial
              color="#e0f7fa"
              transmission={0.9} // really let light pass through
              transparent
              opacity={0.25} // mostly clear
              roughness={0}
              metalness={0}
              side={THREE.DoubleSide}
            />

            {/* Thin white outline */}
            <Edges
              scale={1.01}
              threshold={15} // angle threshold for edges
              color="white"
            />
          </mesh>
        </RigidBody>
      ))}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          position={[0, wallHeight / 2, hoopZOffset + wallThickness / 2 + 25.1]}
        >
          <boxGeometry args={[rampWidth + 10, wallHeight, wallThickness]} />
          {/* <meshStandardMaterial color="#444" /> */}
          {/* Glass material */}
          <meshPhysicalMaterial
            color="#e0f7fa"
            transmission={0.9} // really let light pass through
            transparent
            opacity={0.25} // mostly clear
            roughness={0}
            metalness={0}
            side={THREE.DoubleSide}
          />

          {/* Thin white outline */}
          <Edges
            scale={1.01}
            threshold={15} // angle threshold for edges
            color="white"
          />
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

          missSound.current.play();
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

              // setScore((s) => s + hoopPoints[idx]);
              scoreSound.current.play();
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
    if (ref.current) {
      const { y } = ref.current.translation();
      if (y < -5) onFallOut();
    }
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
