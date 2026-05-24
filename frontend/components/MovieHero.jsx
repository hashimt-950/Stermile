import { useState, useEffect } from "react";
import MovieMeta from "./MovieMeta";
import MovieOverview from "./MovieOverview";

function Moviehero() {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/nowplaying",
        );

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
        <MovieOverview nowPlaying={nowPlaying} />
      </div>

      <div>
        <MovieMeta nowPlaying={nowPlaying} />
      </div>
    </>
  );
}

export default Moviehero;
