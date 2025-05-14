// Scene.jsx
import { useRef, useState, useEffect } from "react";
import { KeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import Building from "./Building";
import Player from "./Player";
import FadeInOverlay from "./FadeInOverlay";
import Skill from "./Skill";
import ContactBuilding from "./ContactBuilding";
import AboutBuilding from "./AboutBuilding";
import { TextureLoader, RepeatWrapping } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import Wall from "./Wall";
import CameraFollow from "./CameraFollow";
import MyHill from "./MyHill";
import BouncyBall from "./BouncyBall";
import FloatingLabel from "./FloatingLabel";
import Chalkboard from "./Chalkboard";
import GroundWithHole from "./GroundWithHole";
import PulsingGlowRing from "./PulsingGlowRing";
import TodoBooth from "./TodoBooth";
import Roads from "./Roads";
import SwingingGate from "./SwingingGate";
import PittLabel from "./PittLabel";
import Platform from "./Platform";
import Platform2 from "./Platform2";
import WelcomeMat from "./WelcomeMat";
import Project1 from "./Project1";
import Project2 from "./Project2";
import Project3 from "./Project3";
import Project4 from "./Project4";
import SkeeBall from "./Skeeball";
import { PositionalAudio } from "@react-three/drei";
import EntryMat from "./EntryMat";
import AreaMat from "./AreaMat";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "shift", keys: ["Shift"] },
];

function Scene({
  activeProject = { activeProject },
  setActiveProject,
  setShowContactPopup,
  showContactPopup,
  playerRef,
  onEnterWelcome,
  zoomLevel,
  roadMode,
  onEnterGameArea,
  setShowTodoPopup,
  setShowAboutPopup,
  rulesOpen = { rulesOpen },
  onEnterProjects,
  showProjectsMat,
  onEnterSkills,
  showSkillsMat,
  onEnterAbout,
  onGameOver = { onGameOver },
  resetTrigger = { resetTrigger },
  showAboutMat,
  onEnterContact,
  showContactMat,
}) {
  const groundRef = useRef();
  const fallSound = useRef();
  const ballRefs = useRef([]);
  const [animationName, setAnimationName] = useState("rig|Idle");

  const [roadTexture] = useLoader(TextureLoader, ["/textures/cobblestone.jpg"]);
  const [grassTexture] = useLoader(TextureLoader, ["/textures/grass.jpg"]);

  const [showChalkboard, setShowChalkboard] = useState(false);
  const [chalkboardVisible, setChalkboardVisible] = useState(false);

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
      if (pos.y < -1) {
        fallSound.current?.play();
      }
      if (pos.y < -15) {
        // console.log("Player fell! Resetting...");

        playerRef.current.setTranslation({ x: 0, y: 7, z: 0 }, true); // 👈 Projects spawn point
        playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    }
  });

  const PROJECTS = {
    HyroxTrack: {
      name: "HyroxTrack",
      image: "/assets/img/projects/hyroxtrack/HyroxEvents.png",
      screenshots: [
        "public/assets/img/projects/hyroxtrack/HyroxHome.png",
        "public/assets/img/projects/hyroxtrack/HyroxEvents.png",
        "public/assets/img/projects/hyroxtrack/HyroxTargetTimes.png",
        "public/assets/img/projects/hyroxtrack/HyroxWorkouts.png",
      ],
      description:
        "Track your events and workouts, set goals and compete  with friends!",
      github: "https://github.com/Cokely13/HyroxTrack",
      url: "https://www.youtube.com/embed/5TQAkt9m-ZY",
    },
    PopcornPair: {
      name: "PopcornPair",
      image: "/assets/img/projects/popcornpair/homepage.png",
      screenshots: [
        "/assets/img/projects/popcornpair/homepage.png",
        "/assets/img/projects/popcornpair/prediction.png",
        "/assets/img/projects/popcornpair/profile.png",
        "/assets/img/projects/popcornpair/search.png",
      ],
      description:
        "Track, rate and recommend movies with friends and the help of AI!",
      github: "https://github.com/Cokely13/popcornpair",
      url: "https://popcornpair-6403c0694200.herokuapp.com/home",
    },
    NewHorizons: {
      name: "NewHorizons",
      screenshots: [
        "public/assets/img/projects/new-horizons/activity-detail.png",
        "public/assets/img/projects/new-horizons/all-activities.png",
        "public/assets/img/projects/new-horizons/graphsupdate.png",
        "public/assets/img/projects/new-horizons/myactupdate.png",
        "public/assets/img/projects/new-horizons/allactupdate.png",
      ],
      image: "/assets/img/projects/new-horizons/myactupdate.png",
      description: "Find new fun activites using our AI recommendation system!",
      github: "https://github.com/Capstone-NewHorizons/new-horizons",
      url: "https://www.youtube.com/embed/M20-Wi2Hvx4",
    },
    PlaylistBattle: {
      name: "PlaylistBattle",
      image: "assets/img/projects/playlistbattle/playlistHome.png",
      screenshots: [
        "assets/img/projects/playlistbattle/playlistHome.png",
        "assets/img/projects/playlistbattle/Playlist Records.png",
        "/assets/img/projects/playlistbattle/Playlist Songs Search.png",
      ],
      description: "Create your own playlists and challenge your friends!",
      github: "https://github.com/Cokely13/PlaylistBattle",
      url: "https://www.youtube.com/embed/qAG_KmmzOgc",
    },
    ForeverAthlete: {
      name: "ForeverAthlete",
      image: "/assets/img/projects/foreverathletebooking/FaCalendar.png",
      description: "A calender app for booking and managing your workouts.",
      github: "https://github.com/Cokely13/foreverAthleteBooking",
      url: "https://www.youtube.com/embed/dQhqzZ6gtHk",
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
      {/* <KeyboardControls map={controlsMap}> */}
      <PositionalAudio
        ref={fallSound}
        url="/sounds/fall.wav"
        distance={10}
        loop={false}
        volume={0.8}
      />
      <Wall />
      <GroundWithHole />
      <>
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
      {/* /* GATE */}
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

      <ContactBuilding
        position={[0, 9.4, -90]}
        playerRef={playerRef}
        onEnter={handlePlayerNearContact}
        popupVisible={showContactPopup}
      />
      <Platform2
        position={[0, 0, -55]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[8, 8, 10]}
      />

      <Project1
        position={[-20, 0, -30]}
        rotation={[0, 0, 0]}
        color="#e74c3c"
        project={PROJECTS.HyroxTrack}
        playerRef={playerRef}
        onEnter={() => setActiveProject(PROJECTS.HyroxTrack)}
        showDebug={true}
      />
      <Project2
        position={[-20, 0, -5]}
        color="blue"
        project={PROJECTS.PopcornPair}
        showDebug={true}
        playerRef={playerRef}
        onEnter={() => setActiveProject(PROJECTS.PopcornPair)}
      />
      <Project3
        position={[20, 0, -30]}
        rotation={[0, Math.PI, 0]}
        color="#27ae60"
        project={PROJECTS.NewHorizons}
        onEnter={() => setActiveProject(PROJECTS.NewHorizons)}
      />
      <Project4
        position={[20, 0, -5]}
        rotation={[0, Math.PI, 0]}
        color="yellow"
        project={PROJECTS.PlaylistBattle}
        onEnter={() => setActiveProject(PROJECTS.PlaylistBattle)}
      />
      <Skill
        label="JavaScript"
        position={[-70, 10, 20]}
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
        position={[-70, 10, 0]}
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
        position={[-70, 10, 11]}
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
        position={[-78, 10, -3]}
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
        position={[-78, 10, 25]}
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
        position={[-84, 10, 16]}
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
        position={[-84, 10, 8]}
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
      <AboutBuilding
        position={[90, 9, 10]}
        rotation={[0, Math.PI, 0]}
        onEnter={() => setShowAboutPopup(true)}
      />
      <Platform
        position={[55, 0, 12]}
        rotation={[0, Math.PI, 0]}
        scale={[8, 8, 10]}
      />

      <Player
        onProjectEnter={setActiveProject}
        playerRef={playerRef}
        position={[0, 1, -20]}
      />

      <MyHill position={[-45, -1, 12]} scale={[8, 3, 8]} rotation={[0, 0, 0]} />
      <FloatingLabel text="Projects" position={[0, 20, -10]} />
      <FloatingLabel text="Skills" position={[-70, 20, 15]} />
      <FloatingLabel text="SkeeBall" position={[-40, 30, 75]} />
      <FloatingLabel text="About" position={[80, 35, 15]} />
      <FloatingLabel text="Contact" position={[0, 40, -90]} />
      <Chalkboard fadeIn={chalkboardVisible} />
      <PittLabel playerRef={playerRef} />

      <TodoBooth playerRef={playerRef} onEnter={() => setShowTodoPopup(true)} />

      <WelcomeMat
        position={[-16.3, 0.01, -5.5]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        width={2.3}
        height={8.5}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      <WelcomeMat
        position={[-16.4, 0.1, -30.5]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        width={2.3}
        height={8}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      <WelcomeMat
        position={[16.2, 0.01, -4.5]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        width={2.3}
        height={8.5}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      <WelcomeMat
        position={[16.2, 0.01, -29.5]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        width={2}
        height={8.5}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      <WelcomeMat
        position={[77.6, 12.2, 12]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        width={7}
        height={8.5}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      <WelcomeMat
        position={[1, 11, -82.6]}
        rotation={[Math.PI / 2, 0, 0]}
        width={1.8}
        height={4}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
      />
      {showContactMat && (
        <AreaMat
          width={8}
          height={4}
          rotation={[0, 0, 0]}
          position={[0, 0.1, -42]}
          areaName={"Contact"}
          onEnter={onEnterContact}
        />
      )}
      {showProjectsMat && (
        <AreaMat
          width={8}
          height={4}
          rotation={[0, 0, 0]}
          position={[0, 0.1, -3]}
          areaName={"Projects"}
          onEnter={onEnterProjects}
        />
      )}
      {showSkillsMat && (
        <AreaMat
          width={8}
          height={4}
          position={[-42, 0.1, 12]}
          textRotation={[-Math.PI / 2, 0, Math.PI * 2]}
          areaName={"Skills"}
          onEnter={onEnterSkills}
        />
      )}
      {showAboutMat && (
        <AreaMat
          width={8}
          height={4}
          position={[40, 0.1, 12]}
          onEnter={onEnterAbout}
          areaName={"About"}
          textRotation={[-Math.PI / 2, 0, Math.PI]}
        />
      )}
      <Roads position={[0, 4, 0]} />
      <EntryMat
        position={[0, 0.01, 130]}
        rotation={[0, 0, 0]}
        width={40}
        height={15.5}
        color="#ffeb3b"
        ringColor="#ffee58"
        thickness={0.3}
        onEnter={onEnterWelcome}
      />
      <SkeeBall
        position={[-40, 0, 50]}
        onEnterGameArea={onEnterGameArea}
        rulesOpen={rulesOpen}
        onGameOver={onGameOver}
        resetTrigger={resetTrigger}
      />
      <FadeInOverlay />
      {/* {activeProject && <ProjectInfo3D project={activeProject} />} */}
      <CameraFollow targetRef={playerRef} zoomLevel={zoomLevel} />
      {/* </KeyboardControls> */}
    </>
  );
}

export default Scene;
