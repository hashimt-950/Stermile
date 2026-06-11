import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.log("error fetching watchlist: ", error.message);
      }
    };

    getWatchlist();
  }, []);

  const removeFromList = async (movieId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(
        "http://localhost:3000/api/watchlist/watchlist",
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId }),
        },
      );

      if (response.ok) {
        setWatchlist((prev) =>
          prev.filter((m) => String(m.movieId) !== String(movieId)),
        );
      }
    } catch (error) {
      console.log("error removing from watchlist: ", error.message);
    }
  };

  const getYear = (date) => (date ? date.split("-")[0] : "");

  return (
    <section className="section">
      <div className="sec-head">
        <h2 className="sec-title">
          Your <em>Watchlist</em>
        </h2>
        <div className="wl-cnt">{watchlist.length} film{watchlist.length !== 1 ? "s" : ""}</div>
      </div>
      {watchlist.length === 0 ? (
        <div className="no-res">No films in your watchlist yet</div>
      ) : (
        <div className="disc-grid">
          {watchlist.map((movie) => (
            <Link
              key={movie.movieId}
              to={`/movie/${movie.movieId}`}
              className="d-card"
            >
              <div className="d-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="d-fog" />
                <div className="d-overlay">
                  <div
                    className="d-play"
                    onClick={(e) => removeFromList(movie.movieId, e)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(240,232,216,0.9)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 4V2h8v2" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="d-title">{movie.title}</div>
              <div className="d-meta">
                {getYear(movie.release_date)} ·{" "}
                <span className="d-score">
                  {Number(movie.vote_average).toFixed(1)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Watchlist;
