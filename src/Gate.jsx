import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text } from "@react-three/drei";

export default function Gate({ playerRef }) {
  const signGroup = useRef(); // We'll group sign and text together
  const leftPost = useRef();
  const rightPost = useRef();
  const topBar = useRef();
  const [open, setOpen] = useState(false);

  useFrame(() => {
    if (!playerRef.current) return;

    const playerPosition = playerRef.current.translation();
    if (!playerPosition) return;

    const distance = Math.sqrt(
      (playerPosition.x - 0) ** 2 + (playerPosition.z - 100) ** 2
    );

    if (distance < 10 && !open) {
      setOpen(true);
    }

    if (open) {
      // Animate posts moving outward
      if (leftPost.current.position.x > -5) {
        leftPost.current.position.x -= 0.05;
      }
      if (rightPost.current.position.x < 5) {
        rightPost.current.position.x += 0.05;
      }
      if (topBar.current.position.y < 10) {
        topBar.current.position.y += 0.05;
      } else {
        topBar.current.position.y = 10; // Lock it in place
      }

      // ✨ Fade out the Gate posts and top bar
      [leftPost, rightPost, topBar].forEach((ref) => {
        if (ref.current && ref.current.material) {
          const material = ref.current.material;
          if (material.opacity > 0) {
            material.opacity -= 0.01;
          }
        }
      });

      // ✨ Animate the whole Welcome Sign (plane + text)
      if (signGroup.current) {
        if (signGroup.current.position.y > 6) {
          signGroup.current.position.y -= 0.02; // Slowly drop the whole sign group
        }
        // No fade needed here since the sign starts invisible
        signGroup.current.children.forEach((child) => {
          if (child.material && child.material.opacity < 1) {
            child.material.opacity += 0.02;
          }
        });
      }
    }
  });

  return (
    <>
      {/* Gate Left Post */}
      <mesh ref={leftPost} position={[-2.5, 2.5, 100]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Gate Right Post */}
      <mesh ref={rightPost} position={[2.5, 2.5, 100]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Gate Top Bar */}
      <mesh ref={topBar} position={[0, 5.5, 100]}>
        <boxGeometry args={[7, 1, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Welcome Sign Group (plane + text) */}
      <group ref={signGroup} position={[0, 10, 100.5]}>
        {/* Sign Plane */}
        <mesh>
          <planeGeometry args={[8, 2]} />
          <meshStandardMaterial color="white" transparent opacity={0} />
        </mesh>

        {/* Text on top of Sign */}
        <Text
          position={[0, 0, 0.1]} // Slightly in front of plane inside group
          fontSize={0.8}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Ryan Cokely
        </Text>
      </group>

      {/* Glow Light */}
      <pointLight
        position={[0, 5, 100]}
        color="white"
        intensity={open ? 300 : 0} // ✅ Your big glow intensity
        distance={25}
        decay={2}
      />
    </>
  );
}
