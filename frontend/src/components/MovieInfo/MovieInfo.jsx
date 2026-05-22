import React, { useEffect, useState } from "react";
import AddToWatchlistBtn from "../AddToWatchlistBtn/AddToWatchlistBtn";
import authService from "../../appwrite/auth";
import watchlistService from "../../appwrite/database";

function MovieInfo({list, mode}){
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const fetchWatchlist = async () => {
            const user = await authService.GetCurrentUser()
            const res = await watchlistService.getWatchList(user.$id)
            setWatchlist(res.documents)
            console.log(res)
        }
        fetchWatchlist()
    }, [])

    return(
        <>
            {
                list.map((movie) => {
                    return(
                        <div key={movie.id} className="my-5 mx-lg-4 container movie-card" >
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">

                                        <div className="col-lg-2">
                                            <img className="coverimg" src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.posterpath}`} alt="" />
                                        </div>

                                        <div className="col-lg-10 my-2">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h3 className="title">{movie.title}</h3>
                                                </div>

                                                <div className="col-12">
                                                    <p className="overview">{movie.overview}</p>
                                                </div>

                                                <div className="col-12">
                                                    <h6 className="releaseDate">{movie.release_date}</h6>
                                                </div>

                                                <div className="col-12 addBtnContainer">
                                                    <AddToWatchlistBtn movie={movie} watchlist={watchlist} setWatchlist={setWatchlist} mode={mode}/>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    )


                })
            }
        </>
    )
}

export default MovieInfo