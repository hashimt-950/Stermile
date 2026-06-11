import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddToListBtn from "./AddToListBtn";

function Moviehero({ watchlist, setWatchlist }) {
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
          return;
        }

        const data = await response.json();
        setNowPlaying(data.results || []);
      } catch (error) {
        console.log("error fetching now-playing: ", error.message);
      }
    };

    getNowPlaying();
  }, []);

  const movie = nowPlaying[Math.floor(Math.random() * Math.max(nowPlaying.length, 1))];

  if (!movie) return null;

  const imgBase = "https://image.tmdb.org/t/p/w1280";

  return (
    <div className="movie-hero">
      <div
        className="movie-hero-bg"
        style={{ backgroundImage: `url(${imgBase}${movie.poster_path})` }}
      />
      <div className="movie-hero-fog" />
      <div className="movie-hero-content">
        <div className="hero-top">
          <div>
            <div className="eyebrow a1">
              <div className="eyebrow-line" />
              <span className="eyebrow-txt">Featured tonight</span>
            </div>
            <div className="now-badge a1">
              <div className="badge-pulse" />
              Now Screening
            </div>
          </div>
          <div className="hero-title-group">
            <h1 className="hero-title a2">{movie.title}</h1>
            <p className="hero-desc a3">{movie.overview}</p>
          </div>
        </div>
        <div className="a4">
          <div className="hero-meta">
            <div className="meta-blk">
              <div className="meta-lbl">Score</div>
              <div className="meta-score">
                {Number(movie.vote_average).toFixed(1)}
                <span className="meta-score-sub">/10</span>
              </div>
            </div>
            <div className="meta-blk">
              <div className="meta-lbl">Total votes</div>
              <div className="meta-val">{movie.vote_count}</div>
            </div>
            <div className="meta-blk">
              <div className="meta-lbl">Release</div>
              <div className="meta-val">{movie.release_date}</div>
            </div>
          </div>
          <div className="cta-row">
            <AddToListBtn movieData={movie} watchlist={watchlist} setWatchlist={setWatchlist} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moviehero;
