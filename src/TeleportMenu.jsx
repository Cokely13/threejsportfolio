// TeleportMenu.jsx
import React from "react";

export default function TeleportMenu({ playerRef }) {
  const teleport = (x, y, z) => {
    if (playerRef.current) {
      playerRef.current.setTranslation({ x, y, z }, true);

      // 🎯 Reset the runner's rotation to face forward
      playerRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    }
  };

  return (
    <div className="teleport-menu">
      <button onClick={() => teleport(0, 1, 115)}>Home</button>
      <button onClick={() => teleport(50, 5, 45)}>About</button>
      <button onClick={() => teleport(-50, 1, 25)}>Skills</button>
      <button onClick={() => teleport(0, 5, 0)}>Projects</button>
      <button onClick={() => teleport(0, 5, -60)}>Contact</button>
    </div>
  );
}
