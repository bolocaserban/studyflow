import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import { saveAuth } from "../services/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await api.login(email, password);
      saveAuth(data);
      nav("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
  <div className="container">
    <div className="card cardPad" style={{ maxWidth: 520, margin: "0 auto" }}>
      <div className="row" style={{ marginBottom: 10 }}>
        <h2 className="h1">Login</h2>
      </div>
      <p className="muted" style={{ marginTop: 0 }}>Intră în cont ca să-ți vezi task-urile.</p>

      {err && <p style={{ color: "tomato" }}>{err}</p>}

      <form onSubmit={onSubmit} className="grid">
        <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Parola" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Intră</button>
      </form>

      <p className="muted" style={{ marginTop: 14 }}>
        Nu ai cont? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);

}
