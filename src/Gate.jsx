// import { useFrame } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Text } from "@react-three/drei";

export default function Gate({ playerRef }) {
  const signGroup = useRef(); // Group for sign plane + text
  const leftPost = useRef();
  const rightPost = useRef();
  const topBar = useRef();
  const textRef = useRef(); // ✨ New ref for text
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false); // ✨ trigger for pulse animation

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    const playerPosition = playerRef.current.translation();
    if (!playerPosition) return;

    const distance = Math.sqrt(
      (playerPosition.x - 0) ** 2 + (playerPosition.z - 110) ** 2
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

      // Fade out the Gate posts and top bar
      [leftPost, rightPost, topBar].forEach((ref) => {
        if (ref.current && ref.current.material) {
          const material = ref.current.material;
          if (material.opacity > 0) {
            material.opacity -= 0.01;
          }
        }
      });

      // Animate the Welcome Sign Group
      if (signGroup.current) {
        if (signGroup.current.position.y > 6) {
          signGroup.current.position.y -= 0.02; // Slowly drop the sign
        }

        // Fade in the Sign Plane and Text
        signGroup.current.children.forEach((child) => {
          if (child.material && child.material.opacity < 1) {
            child.material.opacity += 0.02;
          }
        });

        // Start pulsing once sign is down
        if (signGroup.current.position.y <= 6 && !pulse) {
          setPulse(true);
        }
      }
    }

    // ✨ Pulse animation (after sign is fully dropped)
    if (pulse && textRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05; // gentle pulse
      textRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      {/* Gate Left Post */}
      <mesh ref={leftPost} position={[-2.5, 2.5, 110]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Gate Right Post */}
      <mesh ref={rightPost} position={[2.5, 2.5, 110]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Gate Top Bar */}
      <mesh ref={topBar} position={[0, 5.5, 110]}>
        <boxGeometry args={[7, 1, 1]} />
        <meshStandardMaterial color="white" transparent opacity={1} />
      </mesh>

      {/* Welcome Sign Group */}
      <group ref={signGroup} position={[0, 10, 110.5]}>
        {/* Sign Plane */}
        <mesh>
          <planeGeometry args={[8, 2]} />
          <meshStandardMaterial color="white" transparent opacity={0} />
        </mesh>

        {/* Welcome Text */}
        <Text
          ref={textRef} // ✨ Attach the textRef here
          position={[0, 0, 0.1]} // Slightly in front of plane
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
        position={[0, 5, 110]}
        color="white"
        intensity={open ? 300 : 0}
        distance={25}
        decay={2}
      />
    </>
  );
}
