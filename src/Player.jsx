import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import Runner from "./Runner";
import * as THREE from "three";

export default function Player({ onProjectEnter, playerRef }) {
  const body = useRef();
  const [animation, setAnimation] = useState("rig|Idle");
  const [, getKeys] = useKeyboardControls();
  const [activeProject, setActiveProject] = useState(null);

  const PROJECTS = {
    HyroxTrack: {
      name: "HyroxTrack",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to log and compare results for Hyrox.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    Party: {
      name: "Party",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to Party.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    Cool: {
      name: "Cool",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to Cool.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    Stuff: {
      name: "Stuff",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to stuff.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    // Add more projects here later
  };

  useFrame((state, delta) => {
    if (!body.current) return;

    const keys = getKeys();
    const { forward, backward, leftward, rightward, jump, shift } = keys;

    const impulseStrength = forward
      ? (shift ? 45 : 20) * delta
      : backward
      ? 15 * delta
      : 0;

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

    if (forward) impulse.add(forwardDirection.multiplyScalar(impulseStrength));
    if (backward)
      impulse.add(forwardDirection.multiplyScalar(-impulseStrength));

    body.current.applyImpulse(impulse, true);

    const angularSpeed = 3;
    let angularVelocity = 0;
    if (leftward) angularVelocity += angularSpeed;
    if (rightward) angularVelocity -= angularSpeed;
    body.current.setAngvel({ x: 0, y: angularVelocity, z: 0 });

    if (jump) setAnimation("rig|Jump");
    else if (forward) setAnimation(shift ? "rig|Sprint" : "rig|Walk");
    else if (backward) setAnimation("rig|Walk");
    else setAnimation("rig|Idle");

    const playerPosition = body.current.translation();
    if (!playerPosition) return;

    // state.camera.position.lerp(
    //   new THREE.Vector3(
    //     playerPosition.x,
    //     playerPosition.y + 5,
    //     playerPosition.z + 12
    //   ),
    //   0.1
    // );
    // state.camera.lookAt(playerPosition);
  });

  // const handleCollisionEnter = (payload) => {
  //   const hitObject = payload.colliderObject;

  //   if (hitObject && hitObject.name?.startsWith("building-")) {
  //     const projectName = hitObject.name.replace("building-", "");
  //     console.log("hitt!!!", projectName);
  //     onProjectEnter(projectName);
  //     setActiveProject(projectName);
  //   }
  // };

  const handleCollisionEnter = (payload) => {
    const hitObject = payload.colliderObject;

    if (hitObject && hitObject.name?.startsWith("building-")) {
      const projectKey = hitObject.name.replace("building-", ""); // "HyroxTrack"

      // Lookup the full project info here
      const projectInfo = PROJECTS[projectKey];

      if (projectInfo) {
        onProjectEnter(projectInfo); // ✅ Pass full project object
        setActiveProject(projectInfo); // ✅ (only needed if you use local activeProject too)
      } else {
        console.warn("No project found for key:", projectKey);
      }
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
      restitution={0.1}
      friction={1}
      linearDamping={4}
      angularDamping={0.9}
      position={[0, 2, 130]}
      enabledRotations={[false, true, false]}
      colliders={false}
      onCollisionEnter={handleCollisionEnter}
    >
      {/* Slightly adjusted CuboidCollider for feet-level precision */}
      <CuboidCollider args={[0.3, 0.9, 0.3]} position={[0, 0, 0]} />

      {/* Adjust Runner vertically so feet match collider */}
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
