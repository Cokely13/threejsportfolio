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
//     PopcornPair: {
//       name: "PopcornPair",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description:
//         "An app to track, recommend, and predict movies with friends.",
//       url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
//     },
//     NewHorizons: {
//       name: "NewHorizons",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "An app to plan and reflect on new adventures.",
//       url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
//     },
//     PlaylistBattle: {
//       name: "PlaylistBattle",
//       image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//       description: "A music-themed guessing game you can play with friends.",
//       url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
//     },
//   };

//   // const PROJECTS = {
//   //   HyroxTrack: {
//   //     name: "HyroxTrack",
//   //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//   //     description: "An app to log and compare results for Hyrox.",
//   //     url: "https://hyroxtrack.herokuapp.com/",
//   //   },
//   //   NewHorizons: {
//   //     name: "NewHorizons",
//   //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//   //     description: "An app to Party.",
//   //     url: "https://hyroxtrack.herokuapp.com/",
//   //   },
//   //   PlaylistBattle: {
//   //     name: "PlaylistBattle",
//   //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//   //     description: "An app to Cool.",
//   //     url: "https://hyroxtrack.herokuapp.com/",
//   //   },
//   //   PopcornPair: {
//   //     name: "PopcornPair",
//   //     image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
//   //     description: "An app to Stuff.",
//   //     url: "https://hyroxtrack.herokuapp.com/",
//   //   },
//   // };

//   useFrame((state, delta) => {
//     if (!body.current) return;

//     const keys = getKeys();
//     const { forward, backward, leftward, rightward, jump, shift } = keys;

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

//     // 🛑 BOOSTED Impulse Strength for Gravity -30
//     const moveSpeed = shift ? 125 : 55; // Sprint: 65, Walk: 35

//     if (forward)
//       impulse.add(forwardDirection.multiplyScalar(moveSpeed * delta));
//     if (backward) impulse.add(forwardDirection.multiplyScalar(-20 * delta)); // a little less backward

//     body.current.applyImpulse(impulse, true);

//     const angularSpeed = 3;
//     let angularVelocity = 0;
//     if (leftward) angularVelocity += angularSpeed;
//     if (rightward) angularVelocity -= angularSpeed;
//     body.current.setAngvel({ x: 0, y: angularVelocity, z: 0 });

//     // 🏃‍♂️ Animation handling
//     if (jump) setAnimation("rig|Jump");
//     else if (forward) setAnimation(shift ? "rig|Sprint" : "rig|Walk");
//     else if (backward) setAnimation("rig|Walk");
//     else setAnimation("rig|Idle");
//   });

//   const handleCollisionEnter = (payload) => {
//     const hitObject = payload.colliderObject;
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
//   };

//   useEffect(() => {
//     if (playerRef) {
//       playerRef.current = body.current;
//     }
//   }, [playerRef]);

//   return (
//     <RigidBody
//       ref={body}
//       name="player"
//       restitution={0.1}
//       friction={1}
//       linearDamping={4}
//       angularDamping={0.9}
//       position={[0, 5, 130]}
//       enabledRotations={[false, true, false]}
//       colliders={false}
//       onCollisionEnter={handleCollisionEnter}
//     >
//       <CuboidCollider
//         name="player"
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

// Player.jsx
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import Runner from "./Runner";
import * as THREE from "three";

export default function Player({ onProjectEnter, playerRef }) {
  const body = useRef();
  const [, getKeys] = useKeyboardControls();
  const [animation, setAnimation] = useState("rig|Idle");

  const PROJECTS = {
    HyroxTrack: {
      name: "HyroxTrack",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to log and compare results for Hyrox.",
      url: "https://hyroxtrack.herokuapp.com/",
    },
    PopcornPair: {
      name: "PopcornPair",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description:
        "An app to track, recommend, and predict movies with friends.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
    NewHorizons: {
      name: "NewHorizons",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "An app to plan and reflect on new adventures.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
    PlaylistBattle: {
      name: "PlaylistBattle",
      image: "/assets/img/projects/hyroxtrack/HyroxHome.png",
      description: "A music-themed guessing game you can play with friends.",
      url: "https://hyroxtrack.herokuapp.com/", // Replace if needed
    },
  };

  // each frame, set a fixed horizontal velocity so slopes work
  useFrame((_, delta) => {
    if (!body.current) return;
    const { forward, backward, leftward, rightward, jump, shift } = getKeys();

    // 1) build local‐space direction
    const dir = new THREE.Vector3(
      (rightward ? 1 : 0) - (leftward ? 1 : 0),
      0,
      (backward ? 1 : 0) - (forward ? 1 : 0)
    );
    if (dir.lengthSq() > 0) dir.normalize();

    // 2) world‐space direction
    const quat = body.current.rotation();
    const worldDir = new THREE.Vector3()
      .copy(dir)
      .applyQuaternion(new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w));

    // 3) choose speed (units/sec)
    const speed = shift ? 20 : 10;

    // preserve current vertical velocity
    const vel = body.current.linvel();
    body.current.setLinvel(
      { x: worldDir.x * speed, y: vel.y, z: worldDir.z * speed },
      true
    );

    // 4) turning
    let ang = 0;
    const turnSpeed = 3;
    if (leftward) ang = turnSpeed;
    if (rightward) ang -= turnSpeed;
    body.current.setAngvel({ x: 0, y: ang, z: 0 });

    // 5) animations
    if (jump) setAnimation("rig|Jump");
    else if (forward) setAnimation(shift ? "rig|Sprint" : "rig|Walk");
    else if (backward) setAnimation("rig|Walk");
    else setAnimation("rig|Idle");
  });

  // handle building collisions
  const handleCollisionEnter = ({ colliderObject }) => {
    const name = colliderObject.name;
    if (name?.startsWith("building-")) {
      const key = name.replace("building-", "");
      const info = PROJECTS[key];
      if (info) onProjectEnter(info);
    }
  };

  // expose body to parent (for respawns, etc)
  useEffect(() => {
    if (playerRef) playerRef.current = body.current;
  }, [playerRef]);

  return (
    <RigidBody
      ref={body}
      name="player"
      type="dynamic"
      colliders={false}
      restitution={0.1}
      friction={1}
      linearDamping={4}
      angularDamping={0.9}
      position={[0, 5, 130]}
      enabledRotations={[false, true, false]}
      onCollisionEnter={handleCollisionEnter}
    >
      <CuboidCollider args={[0.3, 0.9, 0.3]} name="player" />
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
