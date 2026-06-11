import { useEffect, useState } from "react";
import Discover from "../components/Discover";
import MovieGrid from "../components/MovieGrid";
import Moviehero from "../components/MovieHero";

function Home() {
  const token = localStorage.getItem("token");
  const [watchlist, setWatchlist] = useState([]);
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
      <div className="hero-section">
        <Moviehero watchlist={watchlist} setWatchlist={setWatchlist} />
        <MovieGrid />
      </div>
      <Discover watchlist={watchlist} setWatchlist={setWatchlist} />
    </>
  );
}

export default Home;
