import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const showError = (msg) => {
    setError(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setError(null), 3000);
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      showError("Connection error. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-dot" />
          Stermile
        </div>
        <h1 className="auth-title">
          Welcome <em>back</em>
        </h1>
        <p className="auth-sub">Sign in to your account</p>
        <div className="auth-form">
          <input
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <input
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
          <button className="auth-btn" onClick={login}>
            Sign In
          </button>
        </div>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
      {error && <div className="toast">{error}</div>}
    </div>
  );
}

export default Login;
