import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function FriendWatchlist() {
  const { userId } = useParams();
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/friends/watchlist/${userId}`,
          {
            headers: { Authorization: `bearer ${token}` },
          },
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
          return;
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.log("error fetching friend watchlist: ", error.message);
      }
    };

    getWatchlist();
  }, [userId]);

  const getYear = (date) => (date ? date.split("-")[0] : "");

  return (
    <section className="section">
      <div className="sec-head">
        <h2 className="sec-title">
          Friend's <em>Watchlist</em>
        </h2>
        <Link to="/friends" className="wl-all" style={{ textDecoration: "none" }}>
          ← Back to Friends
        </Link>
      </div>
      {watchlist.length === 0 ? (
        <div className="no-res">This friend's watchlist is empty</div>
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

export default FriendWatchlist;
