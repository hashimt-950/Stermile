import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Friends() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [tab, setTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const api = "http://localhost:3000/api/friends";

  const headers = { Authorization: `bearer ${token}` };

  const fetchFriends = async () => {
    try {
      const res = await fetch(`${api}/list`, { headers });
      if (res.status === 401) { localStorage.removeItem("token"); navigate("/login"); return; }
      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.log("error fetching friends: ", err.message);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch(`${api}/pending`, { headers });
      const data = await res.json();
      setPending(data);
    } catch (err) {
      console.log("error fetching pending: ", err.message);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchPending();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${api}/search?email=${encodeURIComponent(searchQuery)}`, { headers });
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.log("error searching: ", err.message);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const sendRequest = async (recipientId) => {
    try {
      const res = await fetch(`${api}/request`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId }),
      });
      if (res.ok) {
        setSearchResults((prev) =>
          prev.map((u) =>
            String(u._id) === String(recipientId)
              ? { ...u, friendshipStatus: "pending" }
              : u,
          ),
        );
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.log("error sending request: ", err.message);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const res = await fetch(`${api}/accept`, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      if (res.ok) {
        fetchPending();
        fetchFriends();
      }
    } catch (err) {
      console.log("error accepting: ", err.message);
    }
  };

  const declineRequest = async (requestId) => {
    try {
      const res = await fetch(`${api}/decline`, {
        method: "DELETE",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      if (res.ok) fetchPending();
    } catch (err) {
      console.log("error declining: ", err.message);
    }
  };

  return (
    <section className="section">
      <div className="sec-head">
        <h2 className="sec-title">
          <em>Friends</em>
        </h2>
      </div>

      <div className="search-bar" style={{ marginBottom: 28 }}>
        <div className="search-lbl">Find</div>
        <input
          className="search-input"
          placeholder="search users by email…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="fr-search-res" style={{ marginBottom: 28 }}>
          <div className="fr-subtitle">Search results</div>
          {searchResults.map((user) => (
            <div key={String(user._id)} className="fr-row">
              <div className="fr-avatar-sm">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="fr-info">
                <div className="fr-name">{user.name || user.email}</div>
                <div className="fr-email">{user.email}</div>
              </div>
              <div className="fr-action">
                {user.friendshipStatus === "accepted" ? (
                  <span className="fr-status-tag">Friends</span>
                ) : user.friendshipStatus === "pending" ? (
                  <span className="fr-status-tag pending">Pending</span>
                ) : (
                  <button
                    className="fr-btn"
                    onClick={() => sendRequest(user._id)}
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="filter-row" style={{ marginBottom: 24 }}>
        <button
          className={`f-btn${tab === "friends" ? " on" : ""}`}
          onClick={() => setTab("friends")}
        >
          My Friends ({friends.length})
        </button>
        <button
          className={`f-btn${tab === "invites" ? " on" : ""}`}
          onClick={() => setTab("invites")}
        >
          Invites ({pending.length})
        </button>
      </div>

      {tab === "friends" && (
        <>
          {friends.length === 0 ? (
            <div className="no-res">No friends yet. Search for users above!</div>
          ) : (
            <div className="fr-list">
              {friends.map((friend) => (
                <div key={String(friend._id)} className="fr-row">
                  <div className="fr-avatar-sm">
                    {friend.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="fr-info">
                    <div className="fr-name">{friend.name || friend.email}</div>
                    <div className="fr-email">{friend.email}</div>
                  </div>
                  <Link
                    to={`/friends/${friend._id}/watchlist`}
                    className="fr-btn"
                  >
                    See Watchlist
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "invites" && (
        <>
          {pending.length === 0 ? (
            <div className="no-res">No pending invites</div>
          ) : (
            <div className="fr-list">
              {pending.map((req) => (
                <div key={String(req._id)} className="fr-row">
                  <div className="fr-avatar-sm">
                    {req.requester.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="fr-info">
                    <div className="fr-name">{req.requester.name || req.requester.email}</div>
                    <div className="fr-email">{req.requester.email}</div>
                  </div>
                  <div className="fr-action" style={{ gap: 8 }}>
                    <button
                      className="fr-btn accept"
                      onClick={() => acceptRequest(req._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="fr-btn decline"
                      onClick={() => declineRequest(req._id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Friends;
