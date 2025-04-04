// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Building from "./Building";
import Player from "./Player";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "shift", keys: ["Shift"] },
];

function Scene({ setActiveProject }) {
  const groundRef = useRef();
  // const [activeProject, setActiveProject] = useState(null);
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
        {/* <RigidBody type="fixed" colliders="cuboid">
          <Plane
            ref={groundRef}
            args={[100, 100]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="#2c3e50" />
          </Plane>
        </RigidBody> */}

        {/* Roads */}
        {/* <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 100]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
          <planeGeometry args={[5, 100]} />
          <meshStandardMaterial color="#34495e" />
        </mesh> */}
        {/* BIG Grass Ground */}
        <RigidBody type="fixed" colliders="cuboid">
          <Plane
            ref={groundRef}
            args={[200, 600]} // much bigger now!
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="green" />
          </Plane>
        </RigidBody>

        {/* Main Long Road */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -200]}>
          <planeGeometry args={[10, 500]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {/* Section Markers - TEMPORARY, for reference */}
        {/* Gate Marker */}
        <mesh position={[0, 0.5, 100]}>
          <boxGeometry args={[5, 5, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* About Building Placeholder */}
        <mesh position={[0, 0.5, 50]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Skills Path Start */}
        <mesh position={[0, 0.5, -75]}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color="yellow" />
        </mesh>

        {/* Projects Neighborhood */}
        <mesh position={[0, 0.5, -200]}>
          <boxGeometry args={[15, 15, 15]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Contact / Post Office */}
        <mesh position={[0, 0.5, -275]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Buildings (Next step) */}
        <Building
          position={[10, 2.5, 10]}
          rotation={[0, Math.PI * 1.5, 0]}
          color="#e74c3c"
          project={{
            name: "HyroxTrack",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to log and compare results for Hyrox.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[-10, 2.5, -10]}
          rotation={[0, Math.PI, 0]}
          color="blue"
          project={{
            name: "Stuff",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to stuff.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[10, 2.5, -10]}
          rotation={[0, Math.PI, 0]}
          color="#27ae60"
          project={{
            name: "Party",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to paty.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[-10, 2.5, 10]}
          // rotation={[0, Math.PI, 0]}
          color="yellow"
          project={{
            name: "Cool",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to paty.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Player onProjectEnter={setActiveProject} />
      </KeyboardControls>
    </>
  );
}

export default Scene;
