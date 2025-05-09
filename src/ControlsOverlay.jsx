// ControlsOverlay.jsx
import React, { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import "./ControlsOverlay.css";

export default function ControlsOverlay() {
  // subscribeKeys(callback) fires with the latest { forward, backward, …, run }
  const [subscribeKeys] = useKeyboardControls();
  const [active, setActive] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    run: false,
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeKeys((state) => {
      setActive({
        forward: state.forward,
        backward: state.backward,
        leftward: state.leftward,
        rightward: state.rightward,
        shift: state.shift,
      });
    });
    return unsubscribe;
  }, [subscribeKeys]);

  if (!visible) {
    return (
      <button className="controls-toggle" onClick={() => setVisible(true)}>
        Show Controls
      </button>
    );
  }

  return (
    <div className="controls-overlay">
      <div className={`key ${active.forward ? "active" : ""}`}>↑</div>
      <div className={`key ${active.backward ? "active" : ""}`}>↓</div>
      <div className={`key ${active.leftward ? "active" : ""}`}>←</div>
      <div className={`key ${active.rightward ? "active" : ""}`}>→</div>
      <div className={`key ${active.shift ? "active" : ""}`}>Shift</div>
      <button className="controls-hide" onClick={() => setVisible(false)}>
        Hide
      </button>
    </div>
  );
}
