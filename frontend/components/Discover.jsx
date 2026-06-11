import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const GENRE_MAP = {
  "Drama": 18,
  "Thriller": 53,
  "Romance": 10749,
  "Sci-Fi": 878,
};

const FILTERS = ["All", "Drama", "Thriller", "Romance", "Sci-Fi"];

function Discover({ watchlist, setWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("All");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getDiscover = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/discover",
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
        setMovies(data);
      } catch (error) {
        console.log("error fetching discover movies: ", error.message);
      }
    };

    getDiscover();
  }, []);

  const inWatchlist = (movieId) =>
    watchlist.some((m) => String(m.movieId) === String(movieId));

  const toggleWatchlist = async (movie) => {
    if (inWatchlist(movie.id)) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/watchlist/watchlist",
          {
            method: "DELETE",
            headers: {
              Authorization: `bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movieId: movie.id }),
          },
        );

        if (response.ok) {
          setWatchlist((prev) =>
            prev.filter((m) => String(m.movieId) !== String(movie.id)),
          );
        }
      } catch (error) {
        console.log("error removing from watchlist: ", error.message);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:3000/api/watchlist/watchlist",
          {
            method: "POST",
            headers: {
              Authorization: `bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
            }),
          },
        );

        if (response.ok) {
          setWatchlist((prev) => [
            ...prev,
            {
              movieId: movie.id,
              title: movie.title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
            },
          ]);
        }

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.log("error adding to watchlist: ", error.message);
      }
    }
  };

  const displayed = filter === "All"
    ? movies
    : movies.filter((m) => (m.genre_ids || []).includes(GENRE_MAP[filter]));

  const getYear = (date) => (date ? date.split("-")[0] : "");

  return (
    <section className="section">
      <div className="sec-head">
        <h2 className="sec-title">
          Discover <em>films</em>
        </h2>
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`f-btn${filter === f ? " on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="disc-grid">
        {displayed.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className={`d-card${inWatchlist(movie.id) ? " saved" : ""}`}
          >
            <div className="d-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="d-fog" />
              <span className="d-saved-tag">Saved</span>
              <div className="d-overlay">
                <div
                  className="d-play"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWatchlist(movie);
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={inWatchlist(movie.id) ? "var(--amber)" : "rgba(240,232,216,0.9)"}
                  >
                    <path d="M8 5v14l11-7z" />
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
        {displayed.length === 0 && (
          <div className="no-res">No films found</div>
        )}
      </div>
    </section>
  );
}

export default Discover;
