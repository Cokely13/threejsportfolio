export default function ZoomControls({ zoomLevel, setZoomLevel }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 100,
      }}
    >
      <button
        onClick={() => setZoomLevel((z) => Math.min(z + 1, 20))}
        style={{ padding: "10px", fontSize: "20px" }}
      >
        +
      </button>
      <button
        onClick={() => setZoomLevel((z) => Math.max(z - 1, 5))}
        style={{ padding: "10px", fontSize: "20px" }}
      >
        -
      </button>
    </div>
  );
}
