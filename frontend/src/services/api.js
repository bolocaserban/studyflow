const API_URL = "http://127.0.0.1:5001/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Eroare request");
  return data;
}

export const api = {
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: { name, email, password } }),
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  getTasks: (token) => request("/tasks", { token }),
  createTask: (token, task) => request("/tasks", { method: "POST", body: task, token }),
  updateTask: (token, id, patch) => request(`/tasks/${id}`, { method: "PUT", body: patch, token }),
  deleteTask: (token, id) => request(`/tasks/${id}`, { method: "DELETE", token }),
};
