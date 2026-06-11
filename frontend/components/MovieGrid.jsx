import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/byGenre/878",
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
        const results = data.results || [];
        const shuffled = [...results].sort(() => Math.random() - 0.5);
        setMovies(shuffled.slice(0, 3));
      } catch (error) {
        console.log("error fetching movies for grid: ", error.message);
      }
    };

    getMovies();
  }, []);

  if (movies.length === 0) return null;

  const imgBase = "https://image.tmdb.org/t/p/w500";

  const getYear = (date) => (date ? date.split("-")[0] : "");

  return (
    <div className="movie-grid a5">
      <div className="mosaic">
        {movies.map((m, i) => (
          <Link
            key={m.id}
            to={`/movie/${m.id}`}
            className={`mosaic-cell${i === 0 ? " tall" : ""}`}
          >
            <img className="mosaic-img" src={`${imgBase}${m.poster_path}`} alt={m.title} />
            <div className="mosaic-fog" />
            <div className="mosaic-hi" />
            <span className="mosaic-num">0{i + 1}</span>
            <div className="mosaic-label">
              <div className="mosaic-title">{m.title}</div>
              <div className="mosaic-year">{getYear(m.release_date)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
