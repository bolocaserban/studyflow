export default function SkeletonList({ rows = 4 }) {
  const items = Array.from({ length: rows });

  const box = (w) => ({
    height: 12,
    width: w,
    borderRadius: 8,
    background: "rgba(255,255,255,0.10)",
  });

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 740 }}>
      {items.map((_, i) => (
        <div
          key={i}
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "grid", gap: 10, width: "100%" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.10)" }} />
                <div style={box("55%")} />
              </div>
              <div style={box("80%")} />
              <div style={box("35%")} />
            </div>
            <div style={{ width: 70, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.10)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
