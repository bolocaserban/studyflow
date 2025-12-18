export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isErr = toast.type === "error";

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 9999,
        maxWidth: 360,
        padding: 14,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.18)",
        background: isErr ? "rgba(239,68,68,0.18)" : "rgba(34,197,94,0.18)",
        color: "white",
        backdropFilter: "blur(8px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
      onClick={onClose}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b>{isErr ? "Eroare" : "Succes"}</b>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <div style={{ marginTop: 8 }}>{toast.message}</div>
    </div>
  );
}
