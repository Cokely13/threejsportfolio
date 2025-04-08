// // Scene.jsx
// import { useRef, useState, useEffect } from "react";
// import { KeyboardControls } from "@react-three/drei";
// import { Plane } from "@react-three/drei";
// import { RigidBody } from "@react-three/rapier";
// import Building from "./Building";
// import Player from "./Player";
// import CameraFollow from "./CameraFollow";
// import Gate from "./Gate";
// import FadeInOverlay from "./FadeInOverlay";
// import Skill from "./Skill"; //
// import ContactBuilding from "./ContactBuilding";
// import BuildingWithDoor from "./BuildingWithDoor";
// import { TextureLoader, RepeatWrapping } from "three";
// import { useLoader } from "@react-three/fiber";

// const controlsMap = [
//   { name: "forward", keys: ["ArrowUp", "KeyW"] },
//   { name: "backward", keys: ["ArrowDown", "KeyS"] },
//   { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
//   { name: "rightward", keys: ["ArrowRight", "KeyD"] },
//   { name: "jump", keys: ["Space"] },
//   { name: "shift", keys: ["Shift"] },
// ];

// function Scene({
//   setActiveProject,
//   setShowContactPopup,
//   showContactPopup,
//   playerRef,
// }) {
//   const groundRef = useRef();
//   // const playerRef = useRef();
//   // const [activeProject, setActiveProject] = useState(null);
//   const [animationName, setAnimationName] = useState("rig|Idle");

//   const roadTexture = useLoader(TextureLoader, "/textures/cobblestone.jpg");
//   const grassTexture = useLoader(TextureLoader, "/textures/grass.jpg");
//   grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
//   grassTexture.repeat.set(20, 20);
//   roadTexture.wrapS = roadTexture.wrapT = RepeatWrapping;
//   roadTexture.repeat.set(1, 4);

//   const handlePlayerNearContact = () => {
//     console.log("Player near contact building!");
//     setShowContactPopup(true);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "w") setAnimationName("rig|Sprint");
//       if (event.key === " ") setAnimationName("rig|Jump");
//     };
//     const handleKeyUp = () => setAnimationName("rig|Idle");

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   return (
//     <>
//       <KeyboardControls map={controlsMap}>
//         {/* BIG Grass Ground */}
//         {/* <RigidBody type="fixed" colliders="cuboid">
//           <Plane
//             ref={groundRef}
//             args={[200, 600]} // much bigger now!
//             rotation={[-Math.PI / 2, 0, 0]}
//             receiveShadow
//           >
//             <meshStandardMaterial color="green" />
//           </Plane>
//         </RigidBody> */}
//         <RigidBody type="fixed" colliders="trimesh">
//           <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//             <circleGeometry args={[120, 64]} />
//             <meshStandardMaterial map={grassTexture} />
//           </mesh>
//         </RigidBody>

//         {/* Main Long Road
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -100]}>
//           <planeGeometry args={[10, 500]} />
//           <meshStandardMaterial color="gray" />
//         </mesh> */}

//         {/* Main Road - Straight */}
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 30]}>
//           <planeGeometry args={[4, 60]} />
//           <meshStandardMaterial map={roadTexture} />
//         </mesh>

//         {/* Left Road - Skills */}
//         <mesh
//           position={[-15, 0.05, 15]}
//           rotation={[-Math.PI / 2, 0, Math.PI / 4]}
//         >
//           <planeGeometry args={[3, 20]} />
//           <meshStandardMaterial map={roadTexture} />
//         </mesh>

//         {/* Right Road - About */}
//         <mesh
//           position={[15, 0.05, 15]}
//           rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
//         >
//           <planeGeometry args={[3, 20]} />
//           <meshStandardMaterial map={roadTexture} />
//         </mesh>

//         {/* Section Markers - TEMPORARY, for reference */}
//         {/* Gate Marker */}
//         {/* <mesh position={[0, 0.5, 100]}>
//           <boxGeometry args={[5, 5, 1]} />
//           <meshStandardMaterial color="white" />
//         </mesh> */}
//         {/* Left Post */}
//         <Gate playerRef={playerRef} />

//         {/* Top Bar */}
//         <mesh position={[0, 5.5, 100]}>
//           <boxGeometry args={[7, 1, 1]} />
//           <meshStandardMaterial color="white" />
//         </mesh>

//         {/* About Building Placeholder */}
//         <mesh position={[50, 0.5, 50]}>
//           <boxGeometry args={[10, 10, 10]} />
//           <meshStandardMaterial color="black" />
//         </mesh>

//         {/* Skills Path Start */}
//         <mesh position={[0, 0.5, -75]}>
//           <boxGeometry args={[5, 5, 5]} />
//           <meshStandardMaterial color="yellow" />
//         </mesh>

//         {/* Projects Neighborhood */}
//         <mesh position={[0, 0.5, -200]}>
//           <boxGeometry args={[15, 15, 15]} />
//           <meshStandardMaterial color="orange" />
//         </mesh>

//         {/* Contact / Post Office */}
//         <ContactBuilding
//           position={[0, 5, -75]}
//           playerRef={playerRef}
//           onEnter={handlePlayerNearContact}
//           popupVisible={showContactPopup}
//         />

//         <BuildingWithDoor
//           position={[45, 0, 100]}
//           rotation={[0, Math.PI / 2, 0]}
//         />

//         {/* Buildings (Next step) */}
//         <Building
//           position={[10, 2.5, 10]}
//           rotation={[0, Math.PI * 1.5, 0]}
//           color="#e74c3c"
//           project={{
//             name: "HyroxTrack",
//             image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//             description: "An app to log and compare results for Hyrox.",
//             url: "https://hyroxtrack.herokuapp.com/",
//           }}
//         />
//         <Building
//           position={[-10, 2.5, -10]}
//           rotation={[0, Math.PI, 0]}
//           color="blue"
//           project={{
//             name: "Stuff",
//             image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//             description: "An app to stuff.",
//             url: "https://hyroxtrack.herokuapp.com/",
//           }}
//         />
//         <Building
//           position={[10, 2.5, -10]}
//           rotation={[0, Math.PI, 0]}
//           color="#27ae60"
//           project={{
//             name: "Party",
//             image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//             description: "An app to paty.",
//             url: "https://hyroxtrack.herokuapp.com/",
//           }}
//         />
//         <Building
//           position={[-10, 2.5, 10]}
//           // rotation={[0, Math.PI, 0]}
//           color="yellow"
//           project={{
//             name: "Cool",
//             image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//             description: "An app to paty.",
//             url: "https://hyroxtrack.herokuapp.com/",
//           }}
//         />
//         {/* Skills Section */}
//         <Skill label="JavaScript" position={[-20, 2, 55]} />
//         <Skill label="PostgreSQL" position={[-15, 2, 50]} />
//         <Skill label="Express" position={[0, 2, 60]} />
//         <Skill label="React" position={[10, 2, 55]} />
//         <Skill label="Node" position={[15, 2, 60]} />
//         <Skill label="CSS" position={[20, 2, 55]} />
//         <Skill label="Three.js" position={[4, 2, 50]} />
//         <Player onProjectEnter={setActiveProject} playerRef={playerRef} />

//         <FadeInOverlay />
//       </KeyboardControls>
//     </>
//   );
// }

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
import CameraFollow from "./CameraFollow";

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
}) {
  const groundRef = useRef();
  const [animationName, setAnimationName] = useState("rig|Idle");
  const roadTexture = useLoader(TextureLoader, "/textures/cobblestone.jpg");
  const grassTexture = useLoader(TextureLoader, "/textures/grass.jpg");
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

        {/* Left Road to Skills */}
        <mesh
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          position={[-10, 0.05, 30]}
        >
          <planeGeometry args={[4, 80]} />
          <meshStandardMaterial map={roadTexture} />
        </mesh>

        {/* Right Road to About */}
        <mesh
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          position={[10, 0.05, 30]}
        >
          <planeGeometry args={[4, 80]} />
          <meshStandardMaterial map={roadTexture} />
        </mesh>

        {/* GATE */}
        <Gate playerRef={playerRef} position={[0, 0, -10]} />

        {/* Contact Building (End of Main Road) */}
        <ContactBuilding
          position={[0, 5, -100]}
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
        <Skill label="JavaScript" position={[-60, 2, 30]} />
        <Skill label="PostgreSQL" position={[-60, 2, 25]} />
        <Skill label="Express" position={[-60, 2, 35]} />
        <Skill label="React" position={[-65, 2, 30]} />
        <Skill label="Node" position={[-65, 2, 35]} />
        <Skill label="CSS" position={[-65, 2, 25]} />
        <Skill label="Three.js" position={[-70, 2, 30]} />

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

        <FadeInOverlay />
        <CameraFollow targetRef={playerRef} zoomLevel={zoomLevel} />
      </KeyboardControls>
    </>
  );
}

export default Scene;
