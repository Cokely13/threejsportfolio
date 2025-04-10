import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Scene from "./Scene";
import ContactPopup from "./ContactPopup";
import TeleportMenu from "./TeleportMenu";
import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { FirstPersonControls } from "@react-three/drei";
import ZoomControls from "./ZoomControls";

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [roadMode, setRoadMode] = useState("translate");
  const playerRef = useRef();

  useEffect(() => {
    if (activeProject) {
      const timeout = setTimeout(() => setActiveProject(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [activeProject]);

  return (
    <div className="canvas-container">
      {/* <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <button onClick={() => setZoomLevel((z) => Math.max(z - 2, 5))}>
          Zoom In
        </button>
        <button onClick={() => setZoomLevel((z) => Math.min(z + 2, 25))}>
          Zoom Out
        </button>
      </div> */}
      {/* <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <button onClick={() => setRoadMode("translate")}>Move</button>
        <button onClick={() => setRoadMode("rotate")}>Rotate</button>
        <button onClick={() => setRoadMode("scale")}>Scale</button>
      </div> */}
      <Canvas camera={{ position: [0, 15, 30], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />

        <Physics gravity={[0, -9.81, 0]}>
          <Scene
            setActiveProject={setActiveProject}
            setShowContactPopup={setShowContactPopup}
            showContactPopup={showContactPopup}
            playerRef={playerRef}
            roadMode={roadMode}
          />
        </Physics>

        <OrbitControls
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
        {/* <FirstPersonControls
          activeLook={false}
          lookSpeed={0.1}
          movementSpeed={10}
        /> */}
      </Canvas>

      {/* {activeProject && (
        <div className="project-name-overlay">
          <h2>{activeProject}</h2>
        </div>
      )} */}
      {/* 🎯 Contact Popup (SAME LEVEL!) */}
      <ContactPopup
        visible={showContactPopup}
        onClose={() => setShowContactPopup(false)}
      />
      {activeProject && (
        <div className="project-card-overlay">
          <img
            src={activeProject.image}
            alt={activeProject.name}
            className="project-image"
          />
          <div className="project-info">
            <h2>{activeProject.name}</h2>
            <p>{activeProject.description}</p>
            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Project
            </a>
          </div>
        </div>
      )}
      <TeleportMenu playerRef={playerRef} />
    </div>
  );
}

export default App;
