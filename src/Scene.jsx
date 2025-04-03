// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Building from "./Building";
import Runner from "./Runner";
import Player from "./Player";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "shift", keys: ["Shift"] },
];

function Scene() {
  const groundRef = useRef();
  const [animationName, setAnimationName] = useState("rig|Idle");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") setAnimationName("rig|Sprint");
      if (event.key === " ") setAnimationName("rig|Jump");
    };
    const handleKeyUp = () => setAnimationName("rig|Idle");

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <KeyboardControls map={controlsMap}>
        {/* Ground */}
        <RigidBody type="fixed" colliders="cuboid">
          <Plane
            ref={groundRef}
            args={[100, 100]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="#2c3e50" />
          </Plane>
        </RigidBody>

        {/* Roads */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 100]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
          <planeGeometry args={[5, 100]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>

        {/* Buildings (Next step) */}
        <Building
          position={[10, 2.5, 10]}
          color="#e74c3c"
          project="Project 1"
        />
        <Building
          position={[-10, 2.5, 10]}
          color="#3498db"
          project="Project 2"
        />
        <Building
          position={[10, 2.5, -10]}
          color="#27ae60"
          project="Project 3"
        />
        <Building
          position={[-10, 2.5, -10]}
          color="#f39c12"
          project="Project 4"
        />
        {/* <Runner
          position={[0, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          animationName={animationName}
        /> */}
        <Player />
      </KeyboardControls>
    </>
  );
}

export default Scene;
