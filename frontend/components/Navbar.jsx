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
            <li>Discover</li>
            <li>My List</li>
            <li>Friends</li>
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
