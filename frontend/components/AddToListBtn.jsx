import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddToListBtn({ movieData, watchlist, setWatchlist }) {
  //const [alreadyInlist, setAlreadyInlist] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const alreadyInlist = watchlist.some(
    (movie) => String(movie.movieId) === String(movieData.id),
  );

  const removeFromList = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/watchlist/watchlist",
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            movieId: movieData.id,
          }),
        },
      );

      if (response.ok) {
        setWatchlist((prev) =>
          prev.filter(
            (movie) => String(movie.movieId) !== String(movieData.id),
          ),
        );
      }
    } catch (error) {
      console.log("error while removing from watchlist: ", error.message);
    }
  };

  const addTolist = async () => {
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
            movieId: movieData.id,
            title: movieData.title,
            overview: movieData.overview,
            poster_path: movieData.poster_path,
            backdrop_path: movieData.backdrop_path,
            release_date: movieData.release_date,
            vote_average: movieData.vote_average,
            vote_count: movieData.vote_count,
          }),
        },
      );

      if (response.ok) {
        const savedMovie = {
          movieId: movieData.id,
          title: movieData.title,
          overview: movieData.overview,
          poster_path: movieData.poster_path,
          backdrop_path: movieData.backdrop_path,
          release_date: movieData.release_date,
          vote_average: movieData.vote_average,
          vote_count: movieData.vote_count,
        };

        setWatchlist((prev) => [...prev, savedMovie]);
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("error while adding movie to watchlist: ", error.message);
    }
  };

  return (
    <div>
      {alreadyInlist ? (
        <button onClick={removeFromList}>Remove from List</button>
      ) : (
        <button onClick={addTolist}>Add to List</button>
      )}
    </div>
  );
}

export default AddToListBtn;
