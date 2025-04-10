// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Building from "./Building";
import Player from "./Player";
import Gate from "./Gate";
import FadeInOverlay from "./FadeInOverlay";
import Skill from "./Skill";
import ContactBuilding from "./ContactBuilding";
import BuildingWithDoor from "./BuildingWithDoor";
import { TextureLoader, RepeatWrapping } from "three";
import { useLoader } from "@react-three/fiber";
import Wall from "./Wall";
import CameraFollow from "./CameraFollow";
import Road from "./Road";
import Road2 from "./Road2";
import Hills from "./Hills";
import MyHill from "./MyHill";

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
  zoomLevel,
  roadMode,
}) {
  const groundRef = useRef();
  const [animationName, setAnimationName] = useState("rig|Idle");
  const roadTexture = useLoader(TextureLoader, "/textures/cobblestone.jpg");
  const grassTexture = useLoader(TextureLoader, "/textures/grass.jpg");
  // const [roadMode, setRoadMode] = useState("translate");
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(60, 60);
  roadTexture.wrapS = roadTexture.wrapT = RepeatWrapping;
  roadTexture.repeat.set(1, 4);

  const handlePlayerNearContact = () => {
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
        <Wall />
        {/* Big Ground */}
        <RigidBody type="fixed" colliders="trimesh">
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[120, 64]} />
            <meshStandardMaterial map={grassTexture} />
          </mesh>
        </RigidBody>

        {/* Roads */}
        {/* Main Road through Gate to Contact */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[4, 200]} />
          <meshStandardMaterial map={roadTexture} />
        </mesh>

        {/* GATE */}
        <Gate playerRef={playerRef} position={[0, 0, -10]} />

        {/* Contact Building (End of Main Road) */}
        <ContactBuilding
          position={[0, 5, -90]}
          playerRef={playerRef}
          onEnter={handlePlayerNearContact}
          popupVisible={showContactPopup}
        />

        {/* Projects - 4 buildings after Cross */}
        <Building
          position={[-10, 2.5, 15]}
          color="#e74c3c"
          project={{
            name: "HyroxTrack",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to log and compare results for Hyrox.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[15, 2.5, 15]}
          color="blue"
          project={{
            name: "Stuff",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to stuff.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[-10, 2.5, -5]}
          color="#27ae60"
          project={{
            name: "Party",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to party.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[10, 2.5, -5]}
          color="yellow"
          project={{
            name: "Cool",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "A cool app.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />

        {/* Skills Section - Left end */}
        {/* <Skill label="JavaScript" position={[-60, 2, 30]} />
        <Skill label="PostgreSQL" position={[-60, 2, 25]} />
        <Skill label="Express" position={[-60, 2, 35]} />
        <Skill label="React" position={[-65, 2, 30]} />
        <Skill label="Node" position={[-65, 2, 35]} />
        <Skill label="CSS" position={[-65, 2, 25]} />
        <Skill label="Three.js" position={[-70, 2, 30]} /> */}
        <Skill
          label="JavaScript"
          position={[-70, 10, 17]}
          playerRef={playerRef}
        />
        <Skill
          label="PostgreSQL"
          position={[-73, 10, 25]}
          playerRef={playerRef}
        />
        <Skill label="Express" position={[-75, 10, 17]} playerRef={playerRef} />
        <Skill label="React" position={[-80, 10, 10]} playerRef={playerRef} />
        <Skill label="Node" position={[-79, 10, 22]} playerRef={playerRef} />
        <Skill label="CSS" position={[-82, 10, 16]} playerRef={playerRef} />
        <Skill label="Three.js" position={[-74, 10, 8]} playerRef={playerRef} />

        {/* About Building - Right end */}
        <BuildingWithDoor
          position={[60, 0, 30]}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Player */}
        <Player
          onProjectEnter={setActiveProject}
          playerRef={playerRef}
          position={[0, 1, -20]}
        />

        {/* Hills */}
        {/* <Hills /> */}

        <Road
          scale={[0.8, 0.9, 0.9]}
          position={[45, -0.521, 30]}
          rotation={[0, 0.7, 0]}
        />

        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[45, 0, 30]} rotation={[0, 0.7, 0]}>
            <boxGeometry args={[4, 0.2, 20]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>

        {/* <RigidBody type="fixed" colliders="trimesh"> */}
        <Road2
          // scale={[0.4207, 0.1002, 0.4853]}
          // position={[-18.6471, -2.5, 71.3294]}
          // rotation={[-3.0854, -0.7612, 3.2]}

          scale={[-0.8, 0.9, 0.9]}
          position={[-45, -0.521, 30]}
          rotation={[0, -0.7, 0]}
          // scale={[-0.4207, 0.1002, 0.4853]} // flipped scale
          // position={[18.6471, -2.5, 71.3294]} // mirrored X position
          // rotation={[-3.0854, 0.7612, -3.2]} // mirrored rotation
        />
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[-45, 0, 30]} rotation={[0, -0.7, 0]}>
            <boxGeometry args={[4, 0.2, 20]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </RigidBody>
        <MyHill
          position={[-75, -1, 30]}
          scale={[8, 3, 8]}
          rotation={[0, 1, 0]}
        />

        <FadeInOverlay />
        {/* <CameraFollow targetRef={playerRef} zoomLevel={zoomLevel} /> */}
      </KeyboardControls>
    </>
  );
}

export default Scene;
