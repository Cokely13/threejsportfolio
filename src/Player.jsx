import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import Runner from "./Runner";
import { PROJECTS } from "./ProjectInfo";
import * as THREE from "three";

export default function Player({ onProjectEnter, playerRef }) {
  const body = useRef();
  const [animation, setAnimation] = useState("rig|Idle");
  const [, getKeys] = useKeyboardControls();
  const [activeProject, setActiveProject] = useState(null);

  useFrame((state, delta) => {
    if (!body.current) return;

    const keys = getKeys();
    const { forward, backward, leftward, rightward, jump, shift } = keys;

    const impulse = new THREE.Vector3();

    const rotationQuat = body.current.rotation();
    if (!rotationQuat) return;

    const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
      new THREE.Quaternion(
        rotationQuat.x,
        rotationQuat.y,
        rotationQuat.z,
        rotationQuat.w
      )
    );

    // 🛑 BOOSTED Impulse Strength for Gravity -30
    const moveSpeed = shift ? 125 : 55; // Sprint: 65, Walk: 35

    if (forward)
      impulse.add(forwardDirection.multiplyScalar(moveSpeed * delta));
    if (backward) impulse.add(forwardDirection.multiplyScalar(-20 * delta)); // a little less backward

    body.current.applyImpulse(impulse, true);

    const angularSpeed = 3;
    let angularVelocity = 0;
    if (leftward) angularVelocity += angularSpeed;
    if (rightward) angularVelocity -= angularSpeed;
    body.current.setAngvel({ x: 0, y: angularVelocity, z: 0 });

    // 🏃‍♂️ Animation handling
    if (jump) setAnimation("rig|Jump");
    else if (forward) setAnimation(shift ? "rig|Sprint" : "rig|Walk");
    else if (backward) setAnimation("rig|Walk");
    else setAnimation("rig|Idle");
  });

  const handleCollisionEnter = ({ colliderObject }) => {
    const name = colliderObject.name;
    if (name?.startsWith("building-")) {
      const key = name.replace("building-", "");
      const info = PROJECTS[key];
      if (info) onProjectEnter(info);
    }
  };

  useEffect(() => {
    if (playerRef) {
      playerRef.current = body.current;
    }
  }, [playerRef]);

  return (
    <RigidBody
      ref={body}
      name="player"
      userData={{ isPlayer: true }}
      restitution={0.1}
      friction={1}
      linearDamping={4}
      angularDamping={0.9}
      position={[0, 5, 140]}
      enabledRotations={[false, true, false]}
      colliders={false}
      onCollisionEnter={handleCollisionEnter}
    >
      <CuboidCollider
        name="player"
        args={[0.3, 0.9, 0.3]}
        position={[0, 0, 0]}
      />
      <group position={[0, -0.9, 0]}>
        <Runner
          animationName={animation}
          rotation={[0, Math.PI, 0]}
          scale={[0.02, 0.02, 0.02]}
        />
      </group>
    </RigidBody>
  );
}
