import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function MovieTiles() {
  const [topRated, setTopRated] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate;

  useEffect(() => {
    const getTopRated = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/topRated",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }

        const data = await response.json();
        setTopRated(data.results[Math.floor(Math.random() * 20)]);
      } catch (error) {
        console.log("error while fetching popular", error.message);
      }
    };

    getTopRated();
  }, []);

  return (
    <Link to={`/movie/${topRated.id}`}>
      <div key={topRated.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${topRated.poster_path}`}
          alt=""
        />
      </div>
    </Link>
  );
}

export default MovieTiles;
