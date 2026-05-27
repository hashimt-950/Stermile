import { useState, useEffect } from "react";
import MovieMeta from "./MovieMeta";
import MovieOverview from "./MovieOverview";
import { useNavigate } from "react-router-dom";

function Moviehero() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/nowplaying",
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
        setNowPlaying(data.results);
        console.log(data.results);
      } catch (error) {
        console.log(
          "error occured while fetching now-playing: ",
          error.message,
        );
      }
    };

    getNowPlaying();
  }, []);

  return (
    <>
      <div>
        <MovieOverview data={nowPlaying} />
      </div>

      <div>
        <MovieMeta data={nowPlaying} />
      </div>
    </>
  );
}

export default Moviehero;
