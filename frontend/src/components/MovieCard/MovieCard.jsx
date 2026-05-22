import React from "react";
import AddToWatchlistBtn from "../AddToWatchlistBtn/AddToWatchlistBtn";

function MovieCard({list, mode , watchlist , setWatchlist, heading}){

    return(
            <div className="container my-5">
                <h3 className="mb-3 text-white">{heading}</h3>
                <div className="d-flex overflow-auto" style={{ gap: "13px" }}>
                    {list.map((movie) => (
                            <div key={movie.id}>
                                <div className="thumbnailContainer card text-white" style={{ minWidth: "150px", borderRadius: "10px" }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt="Movie Title"
                                        className="card-img-top "
                                        style={{ borderRadius: "10px" }}
                                    />
                                    <AddToWatchlistBtn movie={movie} watchlist={watchlist} setWatchlist={setWatchlist} mode={mode} place="card"/>

                                </div>
                                
                                
                            </div>
                        )
                    )}
                </div>
            </div>
    )
}

export default MovieCard