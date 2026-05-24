function MovieOverview({ nowPlaying }) {
  const singleMovie = nowPlaying[Math.floor(Math.random() * 11)];
  return (
    <div>
      <h2>title:{singleMovie?.title}</h2>
      <p>overview: {singleMovie?.overview}</p>
    </div>
  );
}

export default MovieOverview;
