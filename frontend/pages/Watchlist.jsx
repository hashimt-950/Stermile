import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getWatchlist = async () => {
      const response = await fetch(
        "http://localhost:3000/api/watchlist/watchlist",
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setWatchlist(data);
    };

    getWatchlist();
  }, []);

  return (
    <>
      {watchlist.map((movie) => (
        <Link to={`/movie/${movie.movieId}`}>
          <div key={movie.movieId}>
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
      ))}
    </>
  );
}

export default Watchlist;
