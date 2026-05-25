import { useState, useEffect } from "react";

function MovieCard() {
  const [discover, setDiscover] = useState([]);

  useEffect(() => {
    const getDiscover = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/discover",
        );

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
      ))}
    </>
  );
}

export default MovieCard;
