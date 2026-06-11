import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToListBtn from "../components/AddToListBtn";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getWatchlist = async () => {
      try {
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
      } catch (error) {
        console.log("error fetching watchlist: ", error.message);
      }
    };

    const getMovieById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${id}`,
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
        setMovieDetail(data);
      } catch (error) {
        console.log("error fetching movie details: ", error.message);
      }
    };

    getMovieById();
    getWatchlist();
  }, [id]);

  if (!movieDetail) return null;

  const imgBase = "https://image.tmdb.org/t/p/w1280";
  const posterBase = "https://image.tmdb.org/t/p/w500";
  const year = movieDetail.release_date
    ? movieDetail.release_date.split("-")[0]
    : "";
  const runtime =
    movieDetail.runtime > 0
      ? `${Math.floor(movieDetail.runtime / 60)}h ${movieDetail.runtime % 60}m`
      : "";

  return (
    <>
      <div className="detail-hero">
        <div
          className="detail-bg"
          style={{
            backgroundImage: `url(${imgBase}${movieDetail.backdrop_path})`,
          }}
        />
        <div className="detail-fog" />
        <div className="detail-content">
          <div>
            <Link to="/" className="detail-back">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              Back to browse
            </Link>
            <h1 className="detail-title a2">{movieDetail.title}</h1>
            {movieDetail.tagline && (
              <p className="detail-tagline a3">{movieDetail.tagline}</p>
            )}
            <div className="genre-row a3">
              {(movieDetail.genres || []).map((g) => (
                <span key={g.id} className="genre-pill">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
          <div className="a4">
            <div className="hero-meta">
              <div className="meta-blk">
                <div className="meta-lbl">Score</div>
                <div className="meta-score">
                  {Number(movieDetail.vote_average).toFixed(1)}
                  <span className="meta-score-sub">/10</span>
                </div>
              </div>
              {runtime && (
                <div className="meta-blk">
                  <div className="meta-lbl">Runtime</div>
                  <div className="meta-val">{runtime}</div>
                </div>
              )}
              {year && (
                <div className="meta-blk">
                  <div className="meta-lbl">Year</div>
                  <div className="meta-val">{year}</div>
                </div>
              )}
              <div className="meta-blk">
                <div className="meta-lbl">Votes</div>
                <div className="meta-val">{movieDetail.vote_count}</div>
              </div>
            </div>
            <div className="cta-row">
              <AddToListBtn
                movieData={movieDetail}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="detail-body">
          {movieDetail.poster_path && (
            <div className="detail-poster">
              <img
                src={`${posterBase}${movieDetail.poster_path}`}
                alt={movieDetail.title}
              />
            </div>
          )}
          <div className="detail-overview">
            <h2 className="sec-title">
              <em>Overview</em>
            </h2>
            <p className="detail-text">{movieDetail.overview}</p>

            <div className="detail-info-grid">
              {(movieDetail.production_companies || []).length > 0 && (
                <div>
                  <div className="meta-lbl">Production</div>
                  <div className="detail-info-val">
                    {movieDetail.production_companies
                      .map((c) => c.name)
                      .join(", ")}
                  </div>
                </div>
              )}
              {movieDetail.budget > 0 && (
                <div>
                  <div className="meta-lbl">Budget</div>
                  <div className="detail-info-val">
                    ${(movieDetail.budget / 1_000_000).toFixed(0)}M
                  </div>
                </div>
              )}
              {movieDetail.revenue > 0 && (
                <div>
                  <div className="meta-lbl">Revenue</div>
                  <div className="detail-info-val">
                    ${(movieDetail.revenue / 1_000_000).toFixed(0)}M
                  </div>
                </div>
              )}
              {movieDetail.release_date && (
                <div>
                  <div className="meta-lbl">Release Date</div>
                  <div className="detail-info-val">
                    {movieDetail.release_date}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieDetails;
