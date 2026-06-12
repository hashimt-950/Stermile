import { useEffect, useState } from "react";
import Discover from "../components/Discover";
import MovieGrid from "../components/MovieGrid";
import Moviehero from "../components/MovieHero";
import Ticker from "../components/Ticker";

function Home() {
  const token = localStorage.getItem("token");
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      <Ticker />
      <div className="hero-section">
        <Moviehero watchlist={watchlist} setWatchlist={setWatchlist} />
        <MovieGrid />
      </div>
      <div className="search-bar">
        <div className="search-lbl">Search</div>
        <input className="search-input" placeholder="a title, a director, a feeling…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="search-go">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <Discover watchlist={watchlist} setWatchlist={setWatchlist} searchQuery={searchQuery} />
    </>
  );
}

export default Home;
