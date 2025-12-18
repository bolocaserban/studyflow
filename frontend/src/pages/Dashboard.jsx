import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { loadAuth, clearAuth } from "../services/auth";

export default function Dashboard() {
  const nav = useNavigate();
  const auth = loadAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // form add task
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(""); // yyyy-mm-dd
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!auth?.token) {
      nav("/login");
      return;
    }
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    setErr("");
    setLoading(true);
    try {
      const data = await api.getTasks(auth.token);
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "Eroare la încărcare task-uri");
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    clearAuth();
    nav("/login");
  };

  // Helpers
  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
  };

  const isOverdue = (t) => {
    if (!t?.dueDate) return false;
    if (t.status === "done") return false;
    return startOfDay(t.dueDate) < startOfDay(new Date());
  };

  const sortedTasks = useMemo(() => {
    const copy = [...tasks];

    // overdue sus, apoi dueDate asc, apoi createdAt desc
    copy.sort((a, b) => {
      const ao = isOverdue(a) ? 1 : 0;
      const bo = isOverdue(b) ? 1 : 0;
      if (ao !== bo) return bo - ao;

      const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      if (ad !== bd) return ad - bd;

      const ac = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bc = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bc - ac;
    });

    return copy;
  }, [tasks]);

  const activeTasks = useMemo(
    () => sortedTasks.filter((t) => t.status !== "done"),
    [sortedTasks]
  );

  const doneTasks = useMemo(() => {
    const list = sortedTasks.filter((t) => t.status === "done");
    // sort desc după completedAt
    list.sort((a, b) => {
      const ad = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const bd = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return bd - ad;
    });
    return list;
  }, [sortedTasks]);

  // Actions
  async function onDelete(id) {
    setErr("");
    try {
      await api.deleteTask(auth.token, id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      setErr(e.message || "Eroare la ștergere");
    }
  }

  async function toggleDone(task) {
    setErr("");
    const goingDone = task.status !== "done";
    const patch = goingDone
      ? { status: "done", completedAt: new Date().toISOString() }
      : { status: "todo", completedAt: null };

    try {
      const updated = await api.updateTask(auth.token, task._id, patch);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (e) {
      setErr(e.message || "Eroare la update");
    }
  }

  function validateDueDateNotPast(yyyyMmDd) {
    if (!yyyyMmDd) return true;
    const picked = startOfDay(yyyyMmDd);
    const today = startOfDay(new Date());
    return picked >= today;
  }

  async function onCreate(e) {
    e.preventDefault();
    setErr("");

    const t = title.trim();
    if (!t) {
      setErr("Titlul este obligatoriu.");
      return;
    }

    if (dueDate && !validateDueDateNotPast(dueDate)) {
      setErr("Nu poți crea task cu deadline în trecut.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: t,
        description: description.trim() || "",
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        status: "todo",
      };
      const created = await api.createTask(auth.token, payload);
      setTasks((prev) => [created, ...prev]);

      // reset form
      setTitle("");
      setDueDate("");
      setDescription("");
    } catch (e2) {
      setErr(e2.message || "Eroare la creare");
    } finally {
      setSaving(false);
    }
  }

  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.h1}>Dashboard</div>
            <div style={styles.sub}>
              Bun venit, <b>{auth?.name}</b> <span style={{ opacity: 0.75 }}>({auth?.email})</span>
            </div>
          </div>
          <button onClick={logout} style={styles.btn}>
            Logout
          </button>
        </div>

        {err && <div style={styles.alert}>{err}</div>}

        {/* ADD TASK */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Adaugă task</div>
          <form onSubmit={onCreate} style={styles.formGrid}>
            <input
              style={styles.input}
              placeholder="Titlu (obligatoriu)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              style={styles.input}
              type="date"
              value={dueDate}
              min={minDate}
              onChange={(e) => setDueDate(e.target.value)}
              title="Deadline (nu acceptă date în trecut)"
            />

            <input
              style={styles.input}
              placeholder="Descriere (opțional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" style={{ ...styles.btnPrimary, opacity: saving ? 0.7 : 1 }} disabled={saving}>
              {saving ? "Se adaugă..." : "Adaugă"}
            </button>
          </form>
        </div>

        {/* LISTS */}
        <div style={{ marginTop: 16 }}>
          {loading ? (
            <div style={styles.muted}>Se încarcă task-urile...</div>
          ) : (
            <>
              <div style={styles.sectionTitle}>Task-uri active</div>

              {activeTasks.length === 0 ? (
                <div style={styles.muted}>Nu ai task-uri active.</div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {activeTasks.map((t) => {
                    const overdue = isOverdue(t);
                    const deadlineText = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—";

                    return (
                      <div key={t._id} style={{ ...styles.taskRow, ...(overdue ? styles.taskOverdue : null) }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => toggleDone(t)}
                            style={styles.checkbox}
                            title="Marchează DONE"
                          />

                          <div style={{ flex: 1 }}>
                            <div style={styles.taskTitleRow}>
                              <div style={styles.taskTitle}>{t.title}</div>
                              {overdue ? (
                                <span style={styles.badgeOverdue}>ÎNTÂRZIAT</span>
                              ) : (
                                <span style={styles.badgeTodo}>TODO</span>
                              )}
                            </div>

                            <div style={styles.taskMeta}>
                              <span style={{ opacity: 0.9 }}>
                                {t.description ? t.description : <i style={{ opacity: 0.7 }}>fără descriere</i>}
                              </span>
                              <span style={styles.dot}>•</span>
                              <span>deadline: {deadlineText}</span>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => onDelete(t._id)} style={styles.btnDanger}>
                          Șterge
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <hr style={{ margin: "18px 0", opacity: 0.15 }} />

              <div style={styles.sectionTitle}>Task-uri terminate</div>

              {doneTasks.length === 0 ? (
                <div style={styles.muted}>Nu ai task-uri terminate.</div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {doneTasks.map((t) => {
                    const completedText = t.completedAt ? new Date(t.completedAt).toLocaleString() : "—";
                    const deadlineText = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—";

                    return (
                      <div key={t._id} style={styles.taskRow}>
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => toggleDone(t)}
                            style={styles.checkbox}
                            title="Revino la TODO"
                          />

                          <div style={{ flex: 1 }}>
                            <div style={styles.taskTitleRow}>
                              <div style={{ ...styles.taskTitle, ...styles.taskDone }}>{t.title}</div>
                              <span style={styles.badgeDone}>DONE</span>
                            </div>

                            <div style={styles.taskMeta}>
                              <span style={{ opacity: 0.85 }}>
                                {t.description ? t.description : <i style={{ opacity: 0.7 }}>fără descriere</i>}
                              </span>
                              <span style={styles.dot}>•</span>
                              <span>deadline: {deadlineText}</span>
                              <span style={styles.dot}>•</span>
                              <span>terminat: {completedText}</span>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => onDelete(t._id)} style={styles.btnDanger}>
                          Șterge
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button onClick={refresh} style={styles.btnGhost}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "36px 16px",
    background:
      "radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,0.15), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.12), transparent 55%), #0b1020",
    color: "rgba(255,255,255,0.92)",
  },
  shell: {
    maxWidth: 980,
    margin: "0 auto",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  h1: { fontSize: 34, fontWeight: 800, letterSpacing: -0.5 },
  sub: { opacity: 0.9, marginTop: 4 },
  card: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    opacity: 0.95,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 0.9fr 1.4fr 0.7fr",
    gap: 10,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.25)",
    color: "rgba(255,255,255,0.92)",
    outline: "none",
  },
  btn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.92)",
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(99,102,241,0.55)",
    background: "rgba(99,102,241,0.28)",
    color: "rgba(255,255,255,0.95)",
    cursor: "pointer",
    fontWeight: 700,
  },
  btnGhost: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "transparent",
    color: "rgba(255,255,255,0.88)",
    cursor: "pointer",
  },
  alert: {
    marginTop: 10,
    marginBottom: 12,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.30)",
    color: "rgba(255,255,255,0.95)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 10,
    marginTop: 6,
    opacity: 0.96,
  },
  muted: { opacity: 0.8 },
  taskRow: {
    padding: 14,
    borderRadius: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "center",
  },
  taskOverdue: {
    border: "1px solid rgba(239,68,68,0.45)",
    background: "rgba(239,68,68,0.10)",
  },
  checkbox: {
    width: 18,
    height: 18,
    marginTop: 2,
    cursor: "pointer",
  },
  taskTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: -0.2,
  },
  taskDone: {
    textDecoration: "line-through",
    opacity: 0.75,
  },
  taskMeta: {
    fontSize: 13,
    opacity: 0.88,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  dot: { opacity: 0.45 },
  badgeTodo: {
    fontSize: 12,
    fontWeight: 800,
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(99,102,241,0.45)",
    background: "rgba(99,102,241,0.18)",
    color: "rgba(255,255,255,0.92)",
  },
  badgeDone: {
    fontSize: 12,
    fontWeight: 800,
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(16,185,129,0.45)",
    background: "rgba(16,185,129,0.18)",
    color: "rgba(255,255,255,0.92)",
  },
  badgeOverdue: {
    fontSize: 12,
    fontWeight: 900,
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid rgba(239,68,68,0.55)",
    background: "rgba(239,68,68,0.18)",
    color: "rgba(255,255,255,0.92)",
  },
  btnDanger: {
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(244,63,94,0.45)",
    background: "rgba(244,63,94,0.18)",
    color: "rgba(255,255,255,0.92)",
    cursor: "pointer",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
};
