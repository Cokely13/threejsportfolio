import { RigidBody } from "@react-three/rapier";
import {
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 🎨 Ball base colors
const COLORS = {
  JavaScript: "#f0db4f",
  PostgreSQL: "#336791",
  Express: "#888888",
  React: "#61dafb",
  Node: "#3c873a",
  CSS: "#264de4",
  "Three.js": "#000000",
};

// 🎨 Text colors
const TEXT_COLORS = {
  JavaScript: "#000000",
  PostgreSQL: "#ffffff",
  Express: "#ffffff",
  React: "#000000",
  Node: "#ffffff",
  CSS: "#ffffff",
  "Three.js": "#ffffff",
};

// 🖌️ Create a text-painted texture
function createTextTexture(text, ballColor = "white", textColor = "white") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 512;

  context.fillStyle = ballColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "bold 80px Arial";
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const Skill = forwardRef(function Skill(
  { label, position, playerRef, onDrop },
  ref
) {
  const ballRef = useRef();
  const [activated, setActivated] = useState(false);
  const [initialY] = useState(position[1]);
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2);

  const ballColor = COLORS[label] || "white";
  const textColor = TEXT_COLORS[label] || "white";

  const textTexture = useMemo(() => {
    const safeLabel = label || "Skill";
    return createTextTexture(safeLabel, ballColor, textColor);
  }, [label]);

  // useImperativeHandle(ref, () => ({
  //   reset() {
  //     if (ballRef.current) {
  //       setActivated(false);
  //       ballRef.current.setBodyType("kinematicPosition");
  //       ballRef.current.setNextKinematicTranslation({
  //         x: position[0],
  //         y: initialY,
  //         z: position[2],
  //       });
  //     }
  //   },
  // }));

  useImperativeHandle(ref, () => ({
    reset() {
      if (ballRef.current) {
        setActivated(false); // 🛑 Must turn OFF dynamic physics
        ballRef.current.setBodyType("kinematicPosition"); // 🛑 Switch back to floating
        ballRef.current.setTranslation(
          { x: position[0], y: initialY, z: position[2] },
          true
        ); // 🛑 Move immediately
        ballRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true); // 🛑 Reset rotation immediately
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // 🛑 Stop moving
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true); // 🛑 Stop spinning
      }
    },
  }));

  useFrame((state) => {
    if (ballRef.current) {
      if (!activated) {
        const t = state.clock.getElapsedTime();
        const floatY = initialY + Math.sin(t * 2 + floatOffset) * 0.5;

        ballRef.current.setNextKinematicTranslation({
          x: position[0],
          y: floatY,
          z: position[2],
        });

        ballRef.current.setNextKinematicRotation({
          x: 0,
          y: Math.sin(t + floatOffset) * 0.2,
          z: 0,
          w: 1,
        });

        if (playerRef?.current) {
          const ballPosition = ballRef.current.translation();
          const playerPosition = playerRef.current.translation();

          const distance = Math.sqrt(
            (ballPosition.x - playerPosition.x) ** 2 +
              (ballPosition.y - playerPosition.y) ** 2 +
              (ballPosition.z - playerPosition.z) ** 2
          );

          // if (distance < 15) {
          //   setActivated(true);
          //   ballRef.current.setBodyType("dynamic");
          // }
          if (distance < 15) {
            setActivated(true);
            ballRef.current.setBodyType("dynamic");

            // 💥 Give it a little bounce when it wakes up
            ballRef.current.applyImpulse({ x: 0, y: 2, z: 0 }, true);

            // Optional: Add a little spin too (just for fun)
            ballRef.current.applyTorqueImpulse({ x: 0, y: 5, z: 0 }, true);
            if (onDrop) onDrop();
          }
        }
      }
    }
  });

  return (
    <>
      <RigidBody
        ref={ballRef}
        name={`Skill-${label}`}
        type={activated ? "dynamic" : "kinematicPosition"}
        colliders="ball"
        mass={0.25} // 👈 Easier to move (lighter)
        restitution={1.2}
        friction={0.1}
        angularDamping={0.1}
        linearDamping={0.1}
        position={[position[0], position[1] + 1.5, position[2]]} // 👈 Correct height offset
        ccd={true}
      >
        {/* Ball with texture (smaller size matches BouncyBall) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            map={textTexture}
            toneMapped={false}
            transparent={false}
          />
        </mesh>

        {/* Wireframe (slightly larger for visibility) */}
        <mesh>
          <sphereGeometry args={[1.55, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            opacity={0.08}
            transparent
          />
        </mesh>
      </RigidBody>
    </>
  );
});

export default Skill;
