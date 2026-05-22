import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error while registering: ", error.message);
    }
  };

  return (
    <>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        type="text"
        placeholder="Enter name"
      />

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

      <h6>
        <Link to="/login">Already have an account</Link>
      </h6>
      <button onClick={registerUser}>SignUp</button>
    </>
  );
}

export default Signup;
