// TeleportMenu.jsx
import React from "react";

export default function TeleportMenu({ playerRef }) {
  const teleport = (x, y, z) => {
    if (playerRef.current) {
      playerRef.current.setTranslation({ x, y, z }, true);
    }
  };

  return (
    <div className="teleport-menu">
      <button onClick={() => teleport(0, 1, 0)}>Home</button>
      <button onClick={() => teleport(0, 1, -75)}>Skills</button>
      <button onClick={() => teleport(0, 1, -200)}>Projects</button>
      <button onClick={() => teleport(0, 1, 100)}>Gate</button>
    </div>
  );
}
