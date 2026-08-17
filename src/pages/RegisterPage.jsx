import { useState } from "react";
import { useBookLoop } from "../context/BookLoopContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "READER",
};

export default function RegisterPage() {
  const { registerAccount, busy, setActivePage } = useBookLoop();
  const [form, setForm] = useState(initialState);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerAccount(form);
      alert("Registration successful! Please login.");
      setActivePage("login");
    } catch (error) {
      alert(error.message || "Registration failed!");
    }
  };

  return (
    <section className="auth-shell">
      <form className="card auth-card" onSubmit={onSubmit}>
        <h2>Register</h2>
        <p className="muted">Create your account and start using BookLoop.</p>

        <label>
          Full Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>

        <label>
          Phone
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </label>

        <label>
          Role
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </label>

        <button disabled={busy} type="submit">
          Register
        </button>

        <p className="muted auth-switch">
          Already have an account?{" "}
          <button type="button" className="link-btn" onClick={() => setActivePage("login")}>
            Login
          </button>
        </p>
      </form>
    </section>
  );
}