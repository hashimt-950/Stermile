import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToListBtn from "./AddToListBtn.jsx";

function MovieCard() {
  const [discover, setDiscover] = useState([]);
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
        }

        const data = await response.json();
        setDiscover(data);
      } catch (error) {
        console.log("error while fetchinng movies: ", error.message);
      }
    };

    getDiscover();
  }, []);
  return (
    <>
      {discover.map((movie) => (
        <>
          <Link to={`/movie/${movie.id}`}>
            <div key={movie.id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
              </div>

              <div>
                <h6>{movie.title}</h6>
              </div>
            </div>
          </Link>

          <AddToListBtn movieData={movie} />
        </>
      ))}
    </>
  );
}

export default MovieCard;
