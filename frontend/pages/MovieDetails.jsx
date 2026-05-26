import { useParams } from "react-router-dom";
import MovieMeta from "../components/MovieMeta";
import { useEffect, useState } from "react";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);

  useEffect(() => {
    const getMovieById = async () => {
      try {
      } catch (error) {
        console.log("error while fetching movie details: ", error.message);
      }
      const response = await fetch(`http://localhost:3000/api/movies/${id}`);

      const data = await response.json();
      console.log(data);
      setMovieDetail(data);
    };

    getMovieById();
  }, []);

  return (
    <>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
          alt=""
        />
      </div>
      <div>
        <div>
          <h2>title:{movieDetail?.title}</h2>
          <p>overview: {movieDetail?.overview}</p>
        </div>
      </div>

      <div>
        <h6>Rating: {movieDetail?.vote_average}</h6>
        <h6>Total votes: {movieDetail?.vote_count}</h6>
        <h6>Date: {movieDetail?.release_date}</h6>
        <h6>Runtime: {movieDetail?.runtime}</h6>
        <button>Add to List </button>
      </div>
    </>
  );
}

export default MovieDetails;
