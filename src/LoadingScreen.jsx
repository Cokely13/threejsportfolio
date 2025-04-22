// // // src/LoadingScreen.jsx
// // import React from "react";
// // import { Html } from "@react-three/drei";

// // export default function LoadingScreen() {
// //   return (
// //     <Html center>
// //       <div
// //         style={{
// //           padding: "1rem 2rem",
// //           background: "rgba(0,0,0,0.8)",
// //           color: "white",
// //           borderRadius: "8px",
// //           fontSize: "1.2rem",
// //           textAlign: "center",
// //         }}
// //       >
// //         Loading…
// //       </div>
// //     </Html>
// //   );
// // }

// // src/LoadingScreen.jsx
// import React from "react";
// import { Html, useProgress } from "@react-three/drei";

// export default function LoadingScreen() {
//   const { active, progress, item } = useProgress();

//   return (
//     <Html center>
//       <div
//         style={{
//           width: "200px",
//           padding: "1rem",
//           background: "rgba(0,0,0,0.85)",
//           color: "white",
//           borderRadius: "8px",
//           fontFamily: "sans-serif",
//           textAlign: "center",
//         }}
//       >
//         <div style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
//           {active ? `Loading ${item || ""}` : "Starting…"}
//         </div>
//         <div
//           style={{
//             width: "100%",
//             height: "8px",
//             background: "#333",
//             borderRadius: "4px",
//             overflow: "hidden",
//             marginBottom: "0.5rem",
//           }}
//         >
//           <div
//             style={{
//               width: `${Math.round(progress)}%`,
//               height: "100%",
//               background: "#00e5ff",
//             }}
//           />
//         </div>
//         <div style={{ fontSize: "0.8rem" }}>{Math.round(progress)}%</div>
//       </div>
//     </Html>
//   );
// }

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
