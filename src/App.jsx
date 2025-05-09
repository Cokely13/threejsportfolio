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
import GamesRulesPopup from "./GamesRulesPopup";
import PortfolioView from "./PortfolioView";
import WelcomePopup from "./WelcomePopup";
import ProjectsPopup from "./ProjectsPopup";
import AboutSectionPopup from "./AboutSectionPopup";
import ContactSectionPopup from "./ContactSectionPopup";
import GameOverPopup from "./GameOverPopup";
import ControlsOverlay from "./ControlsOverlay";
import { KeyboardControls } from "@react-three/drei";
import "./styles.css";
import "./preload";

const controlsMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "shift", keys: ["Shift"] },
];

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showProjectsMat, setShowProjectsMat] = useState(true);
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [showAboutMat, setShowAboutMat] = useState(true);
  const [showContactSection, setShowContactSection] = useState(false);
  const [showContactMat, setShowContactMat] = useState(true);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showTodoPopup, setShowTodoPopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const [welcomeSeen, setWelcomeSeen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [viewMode, setViewMode] = useState("explore"); // "explore" or "portfolio"
  const playerRef = useRef();

  const features = [
    "Explore 3D portfolio world",
    "Visit Contact, About & Project areas",
    "Play the Skee-Ball mini-game",
    "Track your high-score leaderboard",
    "Teleport between sections",
    "And more surprises!",
  ];

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

  function handlePlayAgain() {
    setGameOver(false);
    setResetTrigger((t) => t + 1);
  }

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

  const handleEnterProjects = () => {
    setShowProjects(true);
  };
  // called when user closes the Projects popup
  const handleCloseProjectsSection = () => {
    setShowProjects(false);
    setShowProjectsMat(false);
  };

  const handleEnterAbout = () => setShowAboutSection(true);
  const handleCloseAboutSection = () => {
    setShowAboutSection(false);
    setShowAboutMat(false);
  };

  const handleEnterContact = () => setShowContactSection(true);
  const handleCloseContactSection = () => {
    setShowContactSection(false);
    setShowContactMat(false);
  };

  return (
    <KeyboardControls map={controlsMap}>
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
                    onEnterProjects={handleEnterProjects}
                    showProjectsMat={showProjectsMat}
                    onEnterAbout={handleEnterAbout}
                    showAboutMat={showAboutMat}
                    onEnterContact={handleEnterContact}
                    showContactMat={showContactMat}
                    onEnterGameArea={() => setShowRulesPopup(true)}
                    onGameOver={setGameOver}
                    resetTrigger={resetTrigger}
                    onEnterWelcome={() => {
                      if (!welcomeSeen) {
                        setShowWelcome(true);
                        setWelcomeSeen(true);
                      }
                    }}
                    rulesOpen={showRulesPopup}
                  />
                </Physics>
              </Suspense>
            </Canvas>
            <ControlsOverlay />
            <WelcomePopup
              visible={showWelcome}
              onClose={() => setShowWelcome(false)}
              features={features}
            />

            <ContactPopup
              visible={showContactPopup}
              onClose={handleCloseContact}
            />
            <GamesRulesPopup // ← new popup
              visible={showRulesPopup}
              onClose={() => setShowRulesPopup(false)}
            />
            <GameOverPopup
              visible={gameOver}
              onYes={handlePlayAgain}
              onNo={() => setGameOver(false)}
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
            <ProjectsPopup
              visible={showProjects}
              onClose={handleCloseProjectsSection}
            />
            <AboutSectionPopup
              visible={showAboutSection}
              onClose={handleCloseAboutSection}
            />
            <ContactSectionPopup
              visible={showContactSection}
              onClose={handleCloseContactSection}
            />
            <TeleportMenu playerRef={playerRef} />
          </>
        ) : (
          <PortfolioView />
        )}
      </div>
    </KeyboardControls>
  );
}
