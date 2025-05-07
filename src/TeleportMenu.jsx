// // TeleportMenu.jsx
// import React from "react";

// export default function TeleportMenu({ playerRef }) {
//   const teleport = (x, y, z) => {
//     if (playerRef.current) {
//       playerRef.current.setTranslation({ x, y, z }, true);

//       // 🎯 Reset the runner's rotation to face forward
//       playerRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
//     }
//   };

//   return (
//     <div className="teleport-menu">
//       <button onClick={() => teleport(0, 1, 115)}>Home</button>
//       <button onClick={() => teleport(73, 15, 12)}>About</button>
//       <button onClick={() => teleport(-50, 1, 25)}>Skills</button>
//       <button onClick={() => teleport(0, 5, 0)}>Projects</button>
//       <button onClick={() => teleport(0, 5, -60)}>Contact</button>
//     </div>
//   );
// }

// src/TeleportMenu.jsx
import React from "react";
import * as THREE from "three";

export default function TeleportMenu({ playerRef }) {
  const teleport = (x, y, z, yaw = 0) => {
    const body = playerRef.current;
    if (!body) return;

    // 1) position
    body.setTranslation({ x, y, z }, true);

    // 2) rotation: build a quaternion from Euler(0, yaw, 0)
    const q = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, yaw, 0, "YXZ")
    );
    body.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true);

    // 3) zero out any residual velocity
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  return (
    <div className="teleport-menu">
      {/* Home: face *forward* (0°) */}
      <button onClick={() => teleport(0, 2, 115, 0)}>Home</button>

      {/* About: face *east* (90° = π/2) */}
      <button onClick={() => teleport(73, 12, 12, -Math.PI / 2)}>About</button>

      {/* Skills: face *north* (180° = π) */}
      <button onClick={() => teleport(-55, 2, 12, Math.PI / 2)}>Skills</button>

      {/* Projects: face *west* (−90° = -π/2) */}
      <button onClick={() => teleport(0, 2, 0, 0)}>Projects</button>

      {/* Contact: face *south* (270° = 3π/2 or -π/2 + π) */}
      <button onClick={() => teleport(1, 12, -80, 0)}>Contact</button>
    </div>
  );
}
