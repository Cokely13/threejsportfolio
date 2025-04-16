import { useGLTF, Text } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Building({
  position,
  project,
  rotation = [0, 0, 0],
  playerRef,
  onEnter,
  showDebug = false,
}) {
  // Load your building models
  const build1 = useGLTF("/models/build1.glb");
  const build2 = useGLTF("/models/build2.glb");
  const build3 = useGLTF("/models/build3.glb");
  const build4 = useGLTF("/models/build4.glb");

  const buildingRef = useRef();
  const [entered, setEntered] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanTrigger(true);
    }, 1000); // 1 second delay after component loads

    return () => clearTimeout(timer);
  }, []);

  // Updated model map with separate buildingColor, roofColor, and contrasting textColor.
  // Adjust these values as needed for your desired style.

  // const PROJECTS = {
  //   HyroxTrack: {
  //     name: "HyroxTrack",
  //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
  //     description: "An app to log and compare results for Hyrox.",
  //     url: "https://hyroxtrack.herokuapp.com/",
  //   },
  //   PopcornPair: {
  //     name: "PopcornPair",
  //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
  //     description:
  //       "An app to track, recommend, and predict movies with friends.",
  //     url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
  //   },
  //   NewHorizons: {
  //     name: "NewHorizons",
  //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
  //     description: "An app to plan and reflect on new adventures.",
  //     url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
  //   },
  //   PlaylistBattle: {
  //     name: "PlaylistBattle",
  //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
  //     description: "A music-themed guessing game you can play with friends.",
  //     url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
  //   },
  // };

  const modelMap = {
    PopcornPair: {
      scene: build1.scene,
      buildingColor: "#F08080", // Light Coral for walls
      roofColor: "#BF5F5F", // Slightly different red/pink for roof
      textColor: "#000000", // Black text (for contrast on light coral)
      textPosition: [0, 2.1, 2.51],
      scale: 1,
    },
    HyroxTrack: {
      scene: build2.scene,
      buildingColor: "#20B2AA", // Light Sea Green for walls
      roofColor: "#1E8C91", // Deeper sea green for roof
      textColor: "#000000", // Black text (for clarity)
      textPosition: [0, 2.1, 2.51],
      scale: 1,
    },
    NewHorizons: {
      scene: build3.scene,
      buildingColor: "#9370DB", // Medium Purple for walls
      roofColor: "#7A5BBF", // Darker purple for roof
      textColor: "#FFFFFF", // White text for contrast on purple
      textPosition: [0, 2.1, 2.51],
      scale: 1,
    },
    PlaylistBattle: {
      scene: build4.scene,
      buildingColor: "#FF8C00", // Dark Orange for walls
      roofColor: "#E57600", // Deeper orange for roof
      textColor: "#FFFFFF", // White text
      textPosition: [0, 2.1, 2.51],
      scale: 1,
    },
  };

  const modelInfo = modelMap[project.name];

  // Update materials for the walls and roof.
  useEffect(() => {
    if (!modelInfo?.scene) return;

    modelInfo.scene.traverse((child) => {
      if (child.isMesh) {
        child.material?.dispose();
        const lowerName = child.name.toLowerCase();

        if (lowerName.includes("roof")) {
          // roof mesh
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(modelInfo.roofColor),
            roughness: 0.5,
            metalness: 0.2,
          });
        } else if (lowerName.includes("text")) {
          // text mesh
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#000000"), // or #FFFFFF, etc.
            roughness: 0.2,
            metalness: 0.1,
          });
        } else {
          // building walls
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(modelInfo.buildingColor),
            roughness: 0.5,
            metalness: 0.2,
          });
        }
        child.material.needsUpdate = true;
      }
    });
  }, [modelInfo]);

  // Collision detection remains as before
  useFrame(() => {
    if (!playerRef?.current || !buildingRef.current || entered) return;

    const playerPos = playerRef.current.translation();
    const buildingPos = buildingRef.current.translation();
    if (!playerPos || !buildingPos) return;

    const dx = playerPos.x - buildingPos.x;
    const dz = playerPos.z - buildingPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 5) {
      setEntered(true);
      onEnter?.();
    }
  });

  // if (showDebug) {
  //   console.log(`Collider name: building-${project.name}`);
  //   console.log("Position:", position);
  // }

  return (
    <RigidBody type="fixed" colliders={false} ref={buildingRef}>
      {modelInfo && (
        <>
          {/* Render the building model with our custom materials */}
          <primitive
            object={modelInfo.scene}
            position={position}
            rotation={rotation}
            scale={modelInfo.scale}
            castShadow
          />

          {/* 3D Text overlay */}
          <Text
            key={`${project.name}-text`}
            position={[
              position[0] + modelInfo.textPosition[0],
              position[1] + modelInfo.textPosition[1],
              position[2] + modelInfo.textPosition[2],
            ]}
            fontSize={0.3}
            color={modelInfo.textColor}
            anchorX="center"
            anchorY="middle"
          >
            {project.name}
          </Text>

          {/* Door opening (black plane) */}
          {/* Door opening (black box with thickness) */}
          <mesh
            position={[
              rotation[1] === Math.PI ? position[0] - 1 : position[0] + 1,
              position[1] + 0,
              rotation[1] === Math.PI ? position[2] - 0 : position[2] - 0,
            ]}
            rotation={[0, rotation[1], 0]} // matches building direction perfectly
          >
            <boxGeometry args={[5, 10, 3]} />{" "}
            {/* Box (door): width, height, depth */}
            <meshBasicMaterial color="#000000" transparent opacity={0.85} />
          </mesh>

          {/* Invisible sensor (trigger when player enters) */}
          <CuboidCollider
            name={`door-${project.name}`}
            args={[0.4, 1, 0.2]} // match box geometry closely
            position={[
              rotation[1] === Math.PI ? position[0] + 0.6 : position[0] - 0.6,
              position[1] + 0.5,
              rotation[1] === Math.PI ? position[2] - 2.5 : position[2] + 2.5,
            ]}
            sensor
            onIntersectionEnter={({ other }) => {
              if (canTrigger && other.rigidBodyObject?.name === "player") {
                setEntered(true);
                onEnter?.();
              }
            }}
          />
          {showDebug && (
            <mesh
              position={[
                rotation[1] === Math.PI ? position[0] + 0.6 : position[0] - 0.6,
                position[1] + 0.5,
                rotation[1] === Math.PI ? position[2] - 2.5 : position[2] + 2.5,
              ]}
            >
              <boxGeometry args={[0.4, 1, 0.2]} />
              <meshStandardMaterial color="hotpink" transparent opacity={0.6} />
            </mesh>
          )}
        </>
      )}

      {/* Existing main building collider */}
      <CuboidCollider
        name={`building-${project.name}`}
        args={[2.5, 2.5, 2.5]}
        position={position}
      />
    </RigidBody>
  );
}

export default Building;
