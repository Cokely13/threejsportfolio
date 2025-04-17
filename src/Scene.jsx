// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import Building from "./Building";
import Player from "./Player";
import Gate from "./Gate";
import FadeInOverlay from "./FadeInOverlay";
import Skill from "./Skill";
import ContactBuilding from "./ContactBuilding";
import BuildingWithDoor from "./BuildingWithDoor";
import { TextureLoader, RepeatWrapping } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import Wall from "./Wall";
import CameraFollow from "./CameraFollow";
import Road from "./Road";
import Road2 from "./Road2";
import MyHill from "./MyHill";
import BouncyBall from "./BouncyBall";
import MainRoad from "./MainRoad";
import SignPost from "./SignPost";
import MultiSignPost from "./MultiSign";
import FloatingLabel from "./FloatingLabel";
import Chalkboard from "./Chalkboard";
import GroundWithHole from "./GroundWithHole";
import PulsingGlowRing from "./PulsingGlowRing";
import TodoBooth from "./TodoBooth";
import Roads from "./Roads";
import TodoPopup from "./TodoPopup";
import SwingingGate from "./SwingingGate";
import Ramp from "./Ramp";
import PittLabel from "./PittLabel";
import ContactPlatform from "./ContactPlatform";
import Stairs from "./Stairs";
import Platform from "./Platform";
import Platform2 from "./Platform2";

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
  setShowTodoPopup,
}) {
  const groundRef = useRef();
  const ballRefs = useRef([]);
  const [animationName, setAnimationName] = useState("rig|Idle");
  const roadTexture = useLoader(TextureLoader, "/textures/cobblestone.jpg");
  const grassTexture = useLoader(TextureLoader, "/textures/grass.jpg");
  const [showChalkboard, setShowChalkboard] = useState(false);
  const [chalkboardVisible, setChalkboardVisible] = useState(false);
  // const [showTodoPopup, setShowTodoPopup] = useState(false);
  // const [roadMode, setRoadMode] = useState("translate");
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(60, 60);
  roadTexture.wrapS = roadTexture.wrapT = RepeatWrapping;
  roadTexture.repeat.set(1, 4);

  const handlePlayerNearContact = () => {
    setShowContactPopup(true);
  };

  useFrame(() => {
    if (playerRef.current) {
      const pos = playerRef.current.translation();
      if (pos.y < -10) {
        console.log("Player fell! Resetting...");
        playerRef.current.setTranslation({ x: 0, y: 20, z: 0 }, true); // 👈 Projects spawn point
        playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    }
  });

  const PROJECTS = {
    HyroxTrack: {
      name: "HyroxTrack",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to log and compare results for Hyrox.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    PopcornPair: {
      name: "PopcornPair",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description:
        "An app to track, recommend, and predict movies with friends.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
    NewHorizons: {
      name: "NewHorizons",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to plan and reflect on new adventures.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
    PlaylistBattle: {
      name: "PlaylistBattle",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "A music-themed guessing game you can play with friends.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
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
        {/* <RigidBody type="fixed" colliders="trimesh">
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[120, 64]} />
            <meshStandardMaterial map={grassTexture} />
          </mesh>
        </RigidBody> */}
        <GroundWithHole />
        {/* <HoleDecorations position={[45, 0, 70]} /> */}
        {/* 🔥 Fancy hole decoration */}
        <>
          {/* Flat black circle to mask edge */}
          <mesh position={[45, 0.02, 70]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[10, 64]} />
            <meshBasicMaterial color="black" />
          </mesh>

          {/* Deep inner cylinder to fake depth */}
          <mesh position={[45, -5, 70]}>
            <cylinderGeometry args={[10, 10, 10, 64, 1, true]} />
            <meshStandardMaterial color="black" side={THREE.BackSide} />
          </mesh>

          {/* Glowing animated ring */}
          <PulsingGlowRing position={[45, 0.021, 70]} />

          {/* Soft inner glow */}
          <mesh position={[45, 0.015, 70]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[9.8, 64]} />
            <meshBasicMaterial
              color="#00ffff"
              opacity={0.2}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
        {/* GATE
        <Gate playerRef={playerRef} position={[0, 0, -10]} /> */}
        <SwingingGate playerRef={playerRef} />
        <BouncyBall position={[2, 3, 80]} />
        {/* Contact Building (End of Main Road) */}
        <spotLight
          position={[0, 15, -90]}
          angle={0.5}
          penumbra={0.5}
          intensity={1.5}
          distance={30}
          castShadow
          color="#ffffff"
        />
        {/* <ContactBuilding
          position={[0, 0, -90]}
          playerRef={playerRef}
          onEnter={handlePlayerNearContact}
          popupVisible={showContactPopup}
        /> */}
        {/* <ContactPlatform position={[0, 1, -90]} radius={13} height={19} /> */}
        {/* <Ramp
          position={[0, -1, -48]} // tweak Y so its top aligns with the platform (Y=5)
          rotation={[0, -1.5, 0]} // rotate if you need it facing forwards/backwards
          scale={[10, 11, 9]} // your desired X/Y/Z scale
        /> */}
        <ContactBuilding
          position={[0, 9, -90]} // 2 = height of platform + building base
          playerRef={playerRef}
          onEnter={handlePlayerNearContact}
          popupVisible={showContactPopup}
        />
        <Platform2
          position={[0, 0, -65]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[6, 8, 8]}
        />
        {/* Projects - 4 buildings after Cross */}
        <Building
          position={[-20, 0, -30]}
          rotation={[0, 0, 0]}
          color="#e74c3c"
          project={PROJECTS.HyroxTrack}
          playerRef={playerRef}
          // onEnter={() => setActiveProject(PROJECTS.HyroxTrack)}
          showDebug={true}
        />
        <Building
          position={[-20, 0, -5]}
          color="blue"
          project={PROJECTS.PopcornPair}
          showDebug={true}
          playerRef={playerRef}
          // onEnter={() => setActiveProject(PROJECTS.PopcornPair)}
        />
        <Building
          position={[20, 0, -30]}
          rotation={[0, Math.PI, 0]}
          color="#27ae60"
          project={PROJECTS.NewHorizons}
          // onEnter={() => setActiveProject(PROJECTS.NewHorizons)}
        />
        <Building
          position={[20, 0, -5]}
          rotation={[0, Math.PI, 0]}
          color="yellow"
          project={PROJECTS.PlaylistBattle}
          onEnter={() => setActiveProject(PROJECTS.PlaylistBattle)}
        />
        <Skill
          label="JavaScript"
          position={[-60, 10, 17]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[0] = el)}
        />
        <Skill
          label="PostgreSQL"
          position={[-65, 10, 26]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[1] = el)}
        />
        <Skill
          label="Express"
          position={[-72, 10, 18]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[2] = el)}
        />
        <Skill
          label="React"
          position={[-63, 10, 10]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[3] = el)}
        />
        <Skill
          label="Node"
          position={[-79, 10, 25]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[4] = el)}
        />
        <Skill
          label="CSS"
          position={[-82, 10, 16]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[5] = el)}
        />
        <Skill
          label="Three.js"
          position={[-74, 10, 8]}
          playerRef={playerRef}
          onDrop={() => {
            if (!showChalkboard) {
              setShowChalkboard(true);
              setTimeout(() => setChalkboardVisible(true), 1000); // 1s delay
            }
          }}
          ref={(el) => (ballRefs.current[6] = el)}
        />
        {/* About Building - Right end */}
        <BuildingWithDoor position={[90, 9, 10]} rotation={[0, Math.PI, 0]} />
        <Platform
          position={[55, 0, 12]}
          rotation={[0, Math.PI, 0]}
          scale={[8, 8, 10]}
        />
        {/* Player */}
        <Player
          onProjectEnter={setActiveProject}
          playerRef={playerRef}
          position={[0, 1, -20]}
        />
        {/* Hills */}
        {/* <Hills /> */}
        {/* <MainRoad
          // scale={[3, 2, 6]}
          // position={[0, 0, -20]}
          // rotation={[3.1401, 0, 0]}
          scale={[5, 5, 5]}
          position={[0, 0.03, 0]}
          rotation={[0, 0, 0]}
        /> */}
        {/* <Road
          scale={[0.8, 0.9, 0.9]}
          position={[45, -0.521, 30]}
          rotation={[0, 0.7, 0]}
        /> */}
        {/* <RigidBody type="fixed" colliders="trimesh"> */}
        {/* <Road2

          scale={[-0.8, 0.9, 0.9]}
          position={[-45, -0.521, 30]}
          rotation={[0, -0.7, 0]}
        /> */}
        <MyHill
          position={[-75, -1, 30]}
          scale={[8, 3, 8]}
          rotation={[0, 1, 0]}
        />
        <FloatingLabel text="Projects" position={[0, 20, -10]} />
        <FloatingLabel text="Skills" position={[-70, 20, 20]} />
        <FloatingLabel text="About" position={[75, 30, 20]} />
        <FloatingLabel text="Contact" position={[0, 30, -80]} />
        <SignPost position={[-12, 0, 20]} text="Projects" />
        {chalkboardVisible && <Chalkboard fadeIn />}
        <PittLabel playerRef={playerRef} />
        <SignPost
          position={[-30, 0, 35]}
          text="Skills"
          rotation={[0, Math.PI / 4, 0]}
        />
        <SignPost
          position={[30, 0, 35]}
          text="About"
          rotation={[0, -Math.PI / 4, 0]}
        />
        <SignPost
          position={[25, 0, 75]}
          text="Under Construction"
          rotation={[0, -Math.PI / 6, 0]}
          style="warning" // Optional: add a style prop if you want to customize
        />
        <SignPost position={[15, 0, -65]} text="Contact" />
        <TodoBooth
          playerRef={playerRef}
          onEnter={() => setShowTodoPopup(true)}
        />
        <MultiSignPost position={[0, 0, 80]} />
        <Roads position={[0, 4, 0]} />
        {/* <Stairs
          src="/models/stairs.glb"
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[6, 6, 6]}
        /> */}
        + <FadeInOverlay />
        <CameraFollow targetRef={playerRef} zoomLevel={zoomLevel} />
      </KeyboardControls>
    </>
  );
}

export default Scene;
