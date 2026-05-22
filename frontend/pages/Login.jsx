import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />

      <h6>
        <Link to="/signup">Create an account</Link>
      </h6>
    </>
  );
}

export default Login;
