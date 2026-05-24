function MovieMeta({ nowPlaying }) {
  const singleMovie = nowPlaying[Math.floor(Math.random() * 11)];
  return (
    <div>
      <h6>score:singleMovie?.vote_average</h6>
      <h6>Total votes: {singleMovie?.vote_count}</h6>
      <h6>Date: {singleMovie?.release_date}</h6>
      <button>Add to List </button>
    </div>
  );
}

export default MovieMeta;
