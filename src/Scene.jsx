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
import MyHill from "./MyHill";
import ResetButton from "./ResetButton";
import BouncyBall from "./BouncyBall";
import { Sky, Cloud } from "@react-three/drei";
import MainRoad from "./MainRoad";
import SignPost from "./SignPost";

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
  const ballRefs = useRef([]);
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
        {/* Sky */}
        {/* <Sky
          distance={450000}
          sunPosition={[100, 100, 20]} // ☀️ Sun way up
          inclination={0}
          azimuth={0.25}
          turbidity={8}
          rayleigh={6}
          mieCoefficient={0.003}
          mieDirectionalG={0.7}
        />


        <mesh position={[100, 100, -100]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial emissive={"#fffacd"} toneMapped={false} />
        </mesh>

        <Cloud
          position={[-30, 50, -100]}
          speed={0.2} // How fast they move
          opacity={0.4}
          width={20}
          depth={10}
          segments={20}
        />
        <Cloud
          position={[50, 60, -50]}
          speed={0.25}
          opacity={0.5}
          width={25}
          depth={15}
          segments={30}
        />
        <Cloud
          position={[0, 55, 80]}
          speed={0.15}
          opacity={0.45}
          width={30}
          depth={20}
          segments={25}
        />{" "}
        */}
        <Wall />
        {/* Big Ground */}
        <RigidBody type="fixed" colliders="trimesh">
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[120, 64]} />
            <meshStandardMaterial map={grassTexture} />
          </mesh>
        </RigidBody>

        {/* GATE */}
        <Gate playerRef={playerRef} position={[0, 0, -10]} />
        <BouncyBall position={[2, 3, 80]} />
        {/* Contact Building (End of Main Road) */}
        <ContactBuilding
          position={[0, 5, -90]}
          playerRef={playerRef}
          onEnter={handlePlayerNearContact}
          popupVisible={showContactPopup}
        />
        {/* Projects - 4 buildings after Cross */}
        <Building
          position={[-15, 0, 10]}
          rotation={[0, 1.6, 0]}
          color="#e74c3c"
          project={{
            name: "HyroxTrack",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to log and compare results for Hyrox.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[20, 0, 10]}
          color="blue"
          project={{
            name: "Stuff",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to stuff.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[-15, 2.0, -5]}
          rotation={[0, -1.55, 0]}
          color="#27ae60"
          project={{
            name: "Party",
            image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
            description: "An app to party.",
            url: "https://hyroxtrack.herokuapp.com/",
          }}
        />
        <Building
          position={[15, 0, -10]}
          rotation={[0, -1.6, 0]}
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
          ref={(el) => (ballRefs.current[0] = el)}
        />
        <Skill
          label="PostgreSQL"
          position={[-73, 10, 25]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[1] = el)}
        />
        <Skill
          label="Express"
          position={[-75, 10, 17]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[2] = el)}
        />
        <Skill
          label="React"
          position={[-80, 10, 10]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[3] = el)}
        />
        <Skill
          label="Node"
          position={[-79, 10, 22]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[4] = el)}
        />
        <Skill
          label="CSS"
          position={[-82, 10, 16]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[5] = el)}
        />
        <Skill
          label="Three.js"
          position={[-74, 10, 8]}
          playerRef={playerRef}
          ref={(el) => (ballRefs.current[6] = el)}
        />
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
        <MainRoad
          // scale={[3, 2, 6]}
          // position={[0, 0, -20]}
          // rotation={[3.1401, 0, 0]}
          scale={[5, 5, 5]}
          position={[0, 0.03, 0]}
          rotation={[0, 0, 0]}
        />
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
        <SignPost position={[-12, 0, 20]} text="Projects" />
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
        <SignPost position={[15, 0, -65]} text="Contact" />
        <ResetButton
          position={[-25, 0, 0]} // 🛑 Choose where you want it (near the hill maybe?)
          onReset={() => {
            ballRefs.current.forEach((ref) => {
              if (ref) ref.reset();
            });
          }}
        />
        <FadeInOverlay />
        <CameraFollow targetRef={playerRef} zoomLevel={zoomLevel} />
      </KeyboardControls>
    </>
  );
}

export default Scene;
