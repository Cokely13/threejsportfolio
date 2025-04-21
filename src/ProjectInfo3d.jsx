// src/ProjectInfo3D.jsx
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Text } from "@react-three/drei";

export default function ProjectInfo3D({ project }) {
  // nothing to show if no project is active
  if (!project) return null;

  // load the thumbnail
  const thumb = useLoader(TextureLoader, project.image);

  // panel dimensions
  const width = 3;
  const height = 1.7;

  return (
    <group position={[...project.position.slice(0, 2), project.position[2]]}>
      {/* raise it a bit above ground */}
      <group position={[0, 3, 0]}>
        {/* screenshot plane */}
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={thumb} toneMapped={false} />
        </mesh>

        {/* Project name */}
        <Text
          position={[0, -height / 2 - 0.2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="top"
        >
          {project.name}
        </Text>

        {/* One‑line description */}
        <Text
          position={[0, -height / 2 - 0.6, 0]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="top"
        >
          {project.description}
        </Text>

        {/* “Live demo” link (clicking it opens a new tab) */}
        <Text
          position={[0, -height / 2 - 1.0, 0]}
          fontSize={0.18}
          color="#00e5ff"
          anchorX="center"
          anchorY="top"
          onClick={() => window.open(project.url, "_blank")}
        >
          ▶️ Live Demo
        </Text>
      </group>
    </group>
  );
}
