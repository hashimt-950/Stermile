import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [watchlistCount, setWatchlistCount] = useState(0);
  const token = localStorage.getItem("token");

  const user = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/watchlist/watchlist",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setWatchlistCount(data.length || 0);
      } catch (error) {
        console.log("error fetching watchlist count: ", error.message);
      }
    };

    getWatchlist();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.email ? user.email.charAt(0).toUpperCase() : "?"}
        </div>
        <h1 className="profile-name">{user?.email || "User"}</h1>
        <p className="profile-sub">Member</p>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-num">{watchlistCount}</span>
            <span className="profile-stat-lbl">In Watchlist</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-num">-</span>
            <span className="profile-stat-lbl">Reviews</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-num">-</span>
            <span className="profile-stat-lbl">Friends</span>
          </div>
        </div>

        <div className="profile-links">
          <Link to="/watchlist" className="profile-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            My Watchlist
          </Link>
        </div>

        <button className="profile-logout" onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
