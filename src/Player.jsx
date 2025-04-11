// import { RigidBody, CuboidCollider } from "@react-three/rapier";
// import { useFrame } from "@react-three/fiber";
// import { useKeyboardControls } from "@react-three/drei";
// import { useState, useRef, useEffect } from "react";
// import Runner from "./Runner";
// import * as THREE from "three";

// export default function Player({ onProjectEnter, playerRef }) {
//   const body = useRef();
//   const [animation, setAnimation] = useState("rig|Idle");
//   const [, getKeys] = useKeyboardControls();
//   const [activeProject, setActiveProject] = useState(null);

//   const PROJECTS = {
//     HyroxTrack: {
//       name: "HyroxTrack",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "An app to log and compare results for Hyrox.",
//       url: "https://hyroxtrack.herokuapp.com/",
//     },
//     Party: {
//       name: "Party",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "An app to Party.",
//       url: "https://hyroxtrack.herokuapp.com/",
//     },
//     Cool: {
//       name: "Cool",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "An app to Cool.",
//       url: "https://hyroxtrack.herokuapp.com/",
//     },
//     Stuff: {
//       name: "Stuff",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "An app to stuff.",
//       url: "https://hyroxtrack.herokuapp.com/",
//     },
//   };

//   const handleCollisionEnter = (payload) => {
//     const hitObject = payload.colliderObject;

//     // 🛑 1. Handle building collisions
//     if (hitObject && hitObject.name?.startsWith("building-")) {
//       const projectKey = hitObject.name.replace("building-", "");
//       const projectInfo = PROJECTS[projectKey];

//       if (projectInfo) {
//         onProjectEnter(projectInfo);
//         setActiveProject(projectInfo);
//       } else {
//         console.warn("No project found for key:", projectKey);
//       }
//     }

//     // 🛑 2. Handle reset button collisions
//     if (hitObject && hitObject.name === "resetButton") {
//       console.log("✅ Player touched the reset button!");
//       // You could call a reset function here too if you want
//     }
//   };

//   useFrame((state, delta) => {
//     if (!body.current) return;

//     const keys = getKeys();
//     const { forward, backward, leftward, rightward, jump, shift } = keys;

//     const impulseStrength = forward
//       ? (shift ? 45 : 20) * delta
//       : backward
//       ? 15 * delta
//       : 0;

//     const impulse = new THREE.Vector3();
//     const rotationQuat = body.current.rotation();
//     if (!rotationQuat) return;

//     const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(
//       new THREE.Quaternion(
//         rotationQuat.x,
//         rotationQuat.y,
//         rotationQuat.z,
//         rotationQuat.w
//       )
//     );

//     if (forward) impulse.add(forwardDirection.multiplyScalar(impulseStrength));
//     if (backward)
//       impulse.add(forwardDirection.multiplyScalar(-impulseStrength));

//     body.current.applyImpulse(impulse, true);

//     const angularSpeed = 3;
//     let angularVelocity = 0;
//     if (leftward) angularVelocity += angularSpeed;
//     if (rightward) angularVelocity -= angularSpeed;
//     body.current.setAngvel({ x: 0, y: angularVelocity, z: 0 });

//     if (jump) setAnimation("rig|Jump");
//     else if (forward) setAnimation(shift ? "rig|Sprint" : "rig|Walk");
//     else if (backward) setAnimation("rig|Walk");
//     else setAnimation("rig|Idle");
//   });

//   useEffect(() => {
//     if (playerRef) {
//       playerRef.current = body.current;
//     }
//   }, [playerRef]);

//   return (
//     <RigidBody
//       ref={body}
//       name="player" // ✅ Name the body "player"
//       restitution={0.1}
//       friction={1}
//       linearDamping={4}
//       angularDamping={0.9}
//       position={[0, 2, 110]}
//       enabledRotations={[false, true, false]}
//       colliders={false}
//       onCollisionEnter={handleCollisionEnter}
//     >
//       <CuboidCollider
//         name="playerCollider" // ✅ (optional) Name the collider too
//         args={[0.3, 0.9, 0.3]}
//         position={[0, 0, 0]}
//       />

//       <group position={[0, -0.9, 0]}>
//         <Runner
//           animationName={animation}
//           rotation={[0, Math.PI, 0]}
//           scale={[0.02, 0.02, 0.02]}
//         />
//       </group>
//     </RigidBody>
//   );
// }

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
      description: "An app to Stuff.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
  };

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
    const moveSpeed = shift ? 65 : 35; // Sprint: 65, Walk: 35

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

  const handleCollisionEnter = (payload) => {
    const hitObject = payload.colliderObject;
    if (hitObject && hitObject.name?.startsWith("building-")) {
      const projectKey = hitObject.name.replace("building-", "");
      const projectInfo = PROJECTS[projectKey];
      if (projectInfo) {
        onProjectEnter(projectInfo);
        setActiveProject(projectInfo);
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
      name="player"
      restitution={0.1}
      friction={1}
      linearDamping={4}
      angularDamping={0.9}
      position={[0, 2, 110]}
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
