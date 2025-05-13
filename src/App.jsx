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
import SkillsPopup from "./SkillsPopup";
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
  const [showSkills, setShowSkills] = useState(false);
  const [showSkillsMat, setShowSkillsMat] = useState(true);
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
    "Explore the interactive 3D environment",
    "Check out my Projects showcase",
    "Browse the Skills and technologies I’ve mastered",
    "Discover my professional background",
    "Connect with me via the Contact page",
    "Play the fun Skee-Ball mini-game",
    "Don't fall in the pit!",
    "More features coming soon!",
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

  const handleEnterSkills = () => {
    setShowSkills(true);
  };

  const handleCloseSkillsSection = () => {
    setShowSkills(false);
    setShowSkillsMat(false);
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
              onCreated={({ gl }) => {
                gl.setClearColor("#87ceeb");
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;
              }}
            >
              <Suspense fallback={<LoadingScreen />}>
                <ambientLight intensity={1.5} />
                <directionalLight
                  castShadow
                  position={[30, 30, -10]}
                  intensity={1.2}
                  // shadow-map resolution (higher → crisper shadows)
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  // these bounds must cover your whole scene
                  shadow-camera-left={-135}
                  shadow-camera-right={100}
                  shadow-camera-top={100}
                  shadow-camera-bottom={-100}
                  // near/far on the shadow camera
                  shadow-camera-near={1}
                  shadow-camera-far={200}
                />
                <OrbitControls
                  // minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI}
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
                    showSkillsMat={showSkillsMat}
                    onEnterSkills={handleEnterSkills}
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
            <SkillsPopup
              visible={showSkills}
              onClose={handleCloseSkillsSection}
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
