// src/PortfolioView.jsx
import React from "react";
// import { PROJECTS } from "./constants/projects";

export default function PortfolioView() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/portfolio/index.html"
        title="My Static Portfolio"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
