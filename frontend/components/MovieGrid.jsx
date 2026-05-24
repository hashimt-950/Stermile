import MovieTiles from "./MovieTiles";

function MovieGrid() {
  return (
    <>
      <div>
        <MovieTiles />
      </div>

      <div>
        <div>
          <MovieTiles />
        </div>
        <div>
          <MovieTiles />
        </div>
      </div>
    </>
  );
}

export default MovieGrid;
