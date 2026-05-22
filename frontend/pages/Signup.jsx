import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <input type="text" placeholder="Enter name" />
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <h6>
        <Link to="/login">Already have an account</Link>
      </h6>
    </>
  );
}

export default Signup;
