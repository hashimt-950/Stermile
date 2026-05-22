import React from "react";
import AddToWatchlistBtn from "../AddToWatchlistBtn/AddToWatchlistBtn";


function TopTrendingPanel({list, mode,  watchlist , setWatchlist}){

        const numberone =  list[0]

    return(
            <div 
            className="hero-section" 
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${numberone.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "500px"
            }}
            >
                <div className="overlay mx-4">
                    <div className="content">
                        <h2 className="w-50 text-light nn">{numberone.title}</h2>
                        <div className="col-12 ">
                            <AddToWatchlistBtn movie={numberone} watchlist={watchlist} setWatchlist={setWatchlist} mode={mode} place="panel"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default TopTrendingPanel