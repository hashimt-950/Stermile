import { useLocation, useNavigate } from "react-router-dom";
import "../src/App.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userInitial = token
    ? JSON.parse(atob(token.split(".")[1]))
        ?.email?.charAt(0)
        .toUpperCase() || "U"
    : "U";

  const navItems = [
    { label: "Discover", path: "/" },
    { label: "My List", path: "/watchlist" },
    { label: "Friends", path: "/friends" },
  ];

  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <div className="logo-dot" />
        Stermile
      </div>

      <div className="navlink-container">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-link${location.pathname === item.path ? " active" : ""}`}
            onClick={() => item.path && navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="profile-container">
        <div className="avatar" onClick={() => navigate("/profile")}>
          {userInitial}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
