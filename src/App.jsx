// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { Suspense } from "react";
// import { Physics } from "@react-three/rapier";
// import Scene from "./Scene";
// import ContactPopup from "./ContactPopup";
// import TeleportMenu from "./TeleportMenu";
// import TodoPopup from "./TodoPopup";
// import AboutPopup from "./AboutPopup";
// import "./styles.css";
// import { useState, useEffect, useRef } from "react";
// import ProjectInfoOverlay from "./ProjectInfoOverlay";
// import LoadingScreen from "./LoadingScreen";
// import { FirstPersonControls } from "@react-three/drei";
// import ZoomControls from "./ZoomControls";

// function App() {
//   const [activeProject, setActiveProject] = useState(null);
//   const [showContactPopup, setShowContactPopup] = useState(false);
//   const [showAboutPopup, setShowAboutPopup] = useState(false);
//   const [zoomLevel, setZoomLevel] = useState(10);
//   const [roadMode, setRoadMode] = useState("translate");
//   const [showTodoPopup, setShowTodoPopup] = useState(false);
//   const playerRef = useRef();

//   // useEffect(() => {
//   //   if (activeProject) {
//   //     const timeout = setTimeout(() => setActiveProject(null), 10000);
//   //     return () => clearTimeout(timeout);
//   //   }
//   // }, [activeProject]);

//   return (
//     <div className="canvas-container">
//       {/* <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
//         <button onClick={() => setZoomLevel((z) => Math.max(z - 2, 5))}>
//           Zoom In
//         </button>
//         <button onClick={() => setZoomLevel((z) => Math.min(z + 2, 25))}>
//           Zoom Out
//         </button>
//       </div> */}
//       {/* <div
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           zIndex: 10,
//           display: "flex",
//           flexDirection: "column",
//           gap: "8px",
//         }}
//       >
//         <button onClick={() => setRoadMode("translate")}>Move</button>
//         <button onClick={() => setRoadMode("rotate")}>Rotate</button>
//         <button onClick={() => setRoadMode("scale")}>Scale</button>
//       </div> */}
//       <Canvas
//         shadows
//         camera={{ position: [0, 15, 30], fov: 50 }}
//         onCreated={({ gl }) => {
//           gl.setClearColor("#87ceeb"); // Set real canvas background sky blue!
//         }}
//       >
//         <Suspense fallback={<LoadingScreen />}>
//           {/* <fog attach="fog" args={["#87ceeb", 50, 200]} /> */}
//           {/* <Canvas camera={{ position: [0, 15, 30], fov: 50 }}> */}
//           <ambientLight intensity={1.5} />
//           <directionalLight position={[10, 20, 10]} intensity={1.2} />

//           {/* gravity={[0, -9.81, 0]} */}
//           <Physics gravity={[0, -30, 0]}>
//             <Scene
//               activeProject={activeProject}
//               setActiveProject={setActiveProject}
//               setShowContactPopup={setShowContactPopup}
//               showContactPopup={showContactPopup}
//               playerRef={playerRef}
//               roadMode={roadMode}
//               setShowTodoPopup={setShowTodoPopup}
//               setShowAboutPopup={setShowAboutPopup}
//             />
//           </Physics>

//           <OrbitControls
//             minPolarAngle={Math.PI / 6}
//             maxPolarAngle={Math.PI / 2.2}
//           />
//           {/* <FirstPersonControls
//           activeLook={false}
//           lookSpeed={0.1}
//           movementSpeed={10}
//         /> */}
//         </Suspense>
//       </Canvas>

//       {/* {activeProject && (
//         <div className="project-name-overlay">
//           <h2>{activeProject}</h2>
//         </div>
//       )} */}
//       {/* 🎯 Contact Popup (SAME LEVEL!) */}
//       <ContactPopup
//         visible={showContactPopup}
//         onClose={() => setShowContactPopup(false)}
//       />
//       <AboutPopup
//         visible={showAboutPopup}
//         onClose={() => setShowAboutPopup(false)}
//       />

//       <ProjectInfoOverlay
//         project={activeProject}
//         onClose={() => setActiveProject(null)}
//       />
//       <TodoPopup
//         visible={showTodoPopup}
//         onClose={() => setShowTodoPopup(false)}
//       />

//       <TeleportMenu playerRef={playerRef} />
//     </div>
//   );
// }

// export default App;

// src/App.jsx
// src/App.jsx
// import React, { useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Suspense } from "react";
// import { OrbitControls } from "@react-three/drei";
// import { Physics } from "@react-three/rapier";
// import Scene from "./Scene";
// import LoadingScreen from "./LoadingScreen";
// import ContactPopup from "./ContactPopup";
// import AboutPopup from "./AboutPopup";
// import ProjectInfoOverlay from "./ProjectInfoOverlay";
// import TodoPopup from "./TodoPopup";
// import TeleportMenu from "./TeleportMenu";
// import PortfolioView from "./PortfolioView";
// import "./styles.css";
// import "./preload";

// export default function App() {
//   const [activeProject, setActiveProject] = useState(null);
//   const [showContactPopup, setShowContactPopup] = useState(false);
//   const [showAboutPopup, setShowAboutPopup] = useState(false);
//   const [showTodoPopup, setShowTodoPopup] = useState(false);
//   const [viewMode, setViewMode] = useState("explore"); // or "portfolio"
//   const playerRef = useRef();

//   return (
//     <div className="canvas-container">
//       {/* only show the toggle for the *other* mode */}
//       <div className="mode-toggle">
//         {viewMode !== "explore" && (
//           <button onClick={() => setViewMode("explore")}>Explore Mode</button>
//         )}
//         {viewMode !== "portfolio" && (
//           <button onClick={() => setViewMode("portfolio")}>
//             Portfolio Mode
//           </button>
//         )}
//       </div>

//       {viewMode === "explore" ? (
//         <>
//           <Canvas
//             className="three-canvas"
//             shadows
//             camera={{ position: [0, 80, 250], fov: 80 }}
//             onCreated={({ gl }) => gl.setClearColor("#87ceeb")}
//           >
//             <Suspense fallback={<LoadingScreen />}>
//               <ambientLight intensity={1.5} />
//               <directionalLight position={[10, 20, 10]} intensity={1.2} />
//               <OrbitControls
//                 minPolarAngle={Math.PI / 6}
//                 maxPolarAngle={Math.PI / 2.2}
//               />
//               <Physics gravity={[0, -30, 0]}>
//                 <Scene
//                   activeProject={activeProject}
//                   setActiveProject={setActiveProject}
//                   setShowContactPopup={setShowContactPopup}
//                   showContactPopup={showContactPopup}
//                   playerRef={playerRef}
//                   setShowTodoPopup={setShowTodoPopup}
//                   setShowAboutPopup={setShowAboutPopup}
//                 />
//               </Physics>
//             </Suspense>
//           </Canvas>

//           <ContactPopup
//             visible={showContactPopup}
//             onClose={() => setShowContactPopup(false)}
//           />
//           <AboutPopup
//             visible={showAboutPopup}
//             onClose={() => setShowAboutPopup(false)}
//           />
//           <ProjectInfoOverlay
//             project={activeProject}
//             onClose={() => setActiveProject(null)}
//           />
//           <TodoPopup
//             visible={showTodoPopup}
//             onClose={() => setShowTodoPopup(false)}
//           />
//           <TeleportMenu playerRef={playerRef} />
//         </>
//       ) : (
//         <PortfolioView />
//       )}
//     </div>
//   );
// }

// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import Scene from "./Scene";
import LoadingScreen from "./LoadingScreen";
import ContactPopup from "./ContactPopup";
import AboutPopup from "./AboutPopup";
import ProjectInfoOverlay from "./ProjectInfoOverlay";
import TodoPopup from "./TodoPopup";
import TeleportMenu from "./TeleportMenu";
import PortfolioView from "./PortfolioView";
import "./styles.css";
import "./preload";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showTodoPopup, setShowTodoPopup] = useState(false);
  const [viewMode, setViewMode] = useState("explore"); // "explore" or "portfolio"
  const playerRef = useRef();

  // Helper to teleport the player
  const teleportPlayer = (x, y, z, yaw = 0) => {
    const body = playerRef.current;
    if (!body) return;

    // 1) position
    body.setTranslation({ x, y, z }, true);

    // 2) rotation: build a quaternion from Euler(0, yaw, 0)
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0));
    body.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true);

    // 3) zero out any residual velocity
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  // Close handlers that also teleport
  const handleCloseContact = () => {
    setShowContactPopup(false);
    // Teleport to just outside the ContactBuilding
    teleportPlayer(-0, 4, -55, Math.PI);
  };

  const handleCloseAbout = () => {
    setShowAboutPopup(false);
    // Teleport to just outside the AboutBuilding
    teleportPlayer(45, 8, 10, Math.PI / 2);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    // Teleport back to spawn point
    teleportPlayer(0, 5, 0);
  };

  return (
    <div className="canvas-container">
      {/* only show the toggle for the *other* mode */}
      <div className="mode-toggle">
        {viewMode !== "explore" && (
          <button onClick={() => setViewMode("explore")}>Explore Mode</button>
        )}
        {viewMode !== "portfolio" && (
          <button onClick={() => setViewMode("portfolio")}>
            Portfolio Mode
          </button>
        )}
      </div>

      {viewMode === "explore" ? (
        <>
          <Canvas
            className="three-canvas"
            shadows
            camera={{ position: [0, 80, 250], fov: 80 }}
            onCreated={({ gl }) => gl.setClearColor("#87ceeb")}
          >
            <Suspense fallback={<LoadingScreen />}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 20, 10]} intensity={1.2} />
              <OrbitControls
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
              />
              <Physics gravity={[0, -30, 0]}>
                <Scene
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                  setShowContactPopup={setShowContactPopup}
                  showContactPopup={showContactPopup}
                  playerRef={playerRef}
                  setShowTodoPopup={setShowTodoPopup}
                  setShowAboutPopup={setShowAboutPopup}
                />
              </Physics>
            </Suspense>
          </Canvas>

          <ContactPopup
            visible={showContactPopup}
            onClose={handleCloseContact}
          />
          <AboutPopup visible={showAboutPopup} onClose={handleCloseAbout} />
          <ProjectInfoOverlay
            project={activeProject}
            onClose={handleCloseProject}
          />
          <TodoPopup
            visible={showTodoPopup}
            onClose={() => setShowTodoPopup(false)}
          />
          <TeleportMenu playerRef={playerRef} />
        </>
      ) : (
        <PortfolioView />
      )}
    </div>
  );
}
