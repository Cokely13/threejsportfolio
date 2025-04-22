// src/LoadingScreen.jsx
import React from "react";
import { Html } from "@react-three/drei";

export default function LoadingScreen() {
  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          background: "rgba(0,0,0,0.7)",
          borderRadius: "8px",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #555",
            borderTop: "4px solid #00e5ff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <div style={{ marginTop: "0.75rem", color: "#fff", fontSize: "1rem" }}>
          Loading
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
}
