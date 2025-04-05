// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Building from "./Building";
import Player from "./Player";
import CameraFollow from "./CameraFollow";
import Gate from "./Gate";
import FadeInOverlay from "./FadeInOverlay";
import Skill from "./Skill"; //
import ContactBuilding from "./ContactBuilding";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "shift", keys: ["Shift"] },
];

function Scene({
  setActiveProject,
  setShowContactPopup,
  showContactPopup,
  playerRef,
}) {
  const groundRef = useRef();
  // const playerRef = useRef();
  // const [activeProject, setActiveProject] = useState(null);
  const [animationName, setAnimationName] = useState("rig|Idle");

  const handlePlayerNearContact = () => {
    console.log("Player near contact building!");
    setShowContactPopup(true);
  };

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
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -100]}>
          <planeGeometry args={[10, 500]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {/* Section Markers - TEMPORARY, for reference */}
        {/* Gate Marker */}
        {/* <mesh position={[0, 0.5, 100]}>
          <boxGeometry args={[5, 5, 1]} />
          <meshStandardMaterial color="white" />
        </mesh> */}
        {/* Left Post */}
        <Gate playerRef={playerRef} />

        {/* Top Bar */}
        <mesh position={[0, 5.5, 100]}>
          <boxGeometry args={[7, 1, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* About Building Placeholder */}
        <mesh position={[50, 0.5, 50]}>
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
        <ContactBuilding
          position={[0, 5, -75]}
          playerRef={playerRef}
          onEnter={handlePlayerNearContact}
          popupVisible={showContactPopup}
        />

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
        {/* Skills Section */}
        <Skill label="JavaScript" position={[-20, 2, 55]} />
        <Skill label="PostgreSQL" position={[-15, 2, 50]} />
        <Skill label="Express" position={[0, 2, 60]} />
        <Skill label="React" position={[10, 2, 55]} />
        <Skill label="Node" position={[15, 2, 60]} />
        <Skill label="CSS" position={[20, 2, 55]} />
        <Skill label="Three.js" position={[4, 2, 50]} />
        <Player onProjectEnter={setActiveProject} playerRef={playerRef} />
        <CameraFollow targetRef={playerRef} />
        <FadeInOverlay />
      </KeyboardControls>
    </>
  );
}

export default Scene;
