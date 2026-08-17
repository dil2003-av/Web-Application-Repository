import { useState } from "react";
import { useBookLoop } from "../context/BookLoopContext";

export default function LoginPage() {
  const { login, busy, setActivePage } = useBookLoop();
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form.email, form.password);
      setActivePage("dashboard");
    } catch (error) {
      alert(error.message || "Login failed! Please check your credentials.");
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-card">
        {/* Brand Header / Logo Accent */}
        <div className="auth-header">
          <div className="brand-badge">📚 BookLoop</div>
          <h2>Welcome Back</h2>
          <p className="muted">
            Enter your credentials to access your library dashboard.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button className="submit-btn" disabled={busy} type="submit">
            {busy ? (
              <span className="btn-spinner">Logging in...</span>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="muted">
            New to BookLoop?{" "}
            <button
              type="button"
              className="link-btn"
              onClick={() => setActivePage("register")}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/*
        Internal CSS only — style.css was left untouched.
        This covers classes used here (auth-header, brand-badge, auth-form,
        input-group, input-wrapper, label-row, submit-btn, btn-spinner,
        auth-footer) using the same color/type tokens already defined
        in style.css (--primary, --primary-dark, --text, --muted, --shadow,
        Space Grotesk / Bricolage Grotesque).
      */}
      <style>{`
        .auth-card {
          background: #ffffffcc;
          border: 1px solid #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 52, 65, 0.14);
          padding: 2rem 1.75rem;
          animation: rise 560ms ease both;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: "Bricolage Grotesque", sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #005656;
          background: #e2f4f2;
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          margin-bottom: 0.9rem;
        }

        .auth-header h2 {
          font-family: "Bricolage Grotesque", sans-serif;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          margin: 0 0 0.4rem;
          color: #122127;
        }

        .auth-header p {
          margin: 0;
          font-size: 0.92rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-top: 1.2rem;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #12363c;
          margin-bottom: 0.35rem;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          border: 1px solid #d7e3e0;
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #9fd4ca;
          box-shadow: 0 0 0 3px rgba(0, 122, 120, 0.15);
        }

        .submit-btn {
          margin-top: 0.4rem;
          width: 100%;
          border: 0;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-weight: 700;
          font-size: 0.98rem;
          color: #fff;
          background: linear-gradient(120deg, #007a78, #005656);
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-spinner {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-spinner::before {
          content: "";
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.3rem;
        }

        .auth-footer p {
          font-size: 0.9rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}