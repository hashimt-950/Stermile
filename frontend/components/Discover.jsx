import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function Discover({ watchlist, setWatchlist }) {
  return (
    <div>
      <MovieCard watchlist={watchlist} setWatchlist={setWatchlist} />
    </div>
  );
}

export default Discover;
