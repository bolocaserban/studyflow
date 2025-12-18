import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { saveAuth } from "../services/auth";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await api.register(name, email, password);
      saveAuth(data);            // salvează token + user
      nav("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  };

return (
  <div className="container">
    <div className="card cardPad" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h2 className="h1">Register</h2>
      <p className="muted" style={{ marginTop: 8 }}>
        Creează cont ca să-ți gestionezi task-urile.
      </p>

      {err && <p style={{ color: "tomato", marginTop: 10 }}>{err}</p>}

      <form onSubmit={onSubmit} className="grid" style={{ marginTop: 12 }}>
        <input className="input" placeholder="Nume" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="input"
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Creează cont
        </button>
      </form>

      <p className="muted" style={{ marginTop: 14 }}>
        Ai cont? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);

}
