import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
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

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
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
          Join <em>Stermile</em>
        </h1>
        <p className="auth-sub">Create your account</p>
        <div className="auth-form">
          <input
            className="auth-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
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
          <button className="auth-btn" onClick={registerUser}>
            Create Account
          </button>
        </div>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
      {error && <div className="toast">{error}</div>}
    </div>
  );
}

export default Signup;
