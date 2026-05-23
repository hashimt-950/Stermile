import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log("error occured while logging in: ", error.message);
    }
  };

  return (
    <>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        type="email"
        placeholder="Enter email"
      />

      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        placeholder="Enter password"
      />

      <button onClick={login}>Login</button>

      <h6>
        <Link to="/signup">Create an account</Link>
      </h6>
    </>
  );
}

export default Login;
