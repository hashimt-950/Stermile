import { Link } from "react-router-dom";
import "../src/App.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h1>Stermile</h1>
      </div>

      <div className="navlink-container">
        <nav>
          <ul className="navLinks">
            <Link to={"/"}>
              <li>Discover</li>
            </Link>

            <Link to={"/watchlist"}>
              <li>My List</li>
            </Link>

            <Link>
              <li>Friends</li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="profile-container">
        <button>Search</button>
        <button>Profile</button>
      </div>
    </div>
  );
}

export default Navbar;
