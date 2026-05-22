import React from "react";
import AddToWatchlistBtn from "../AddToWatchlistBtn/AddToWatchlistBtn";
import { useState, useEffect } from "react";

function Number1({list, mode}){

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
                <div className="overlay">
                    <div className="content">
                        <h2 className="w-50 mx-5">{numberone.title}</h2>
                        <button className=" mx-5">Watch Now</button>
                        <div className="col-12 addBtnContainer">
                            <AddToWatchlistBtn movie={numberone} watchlist={watchlist} setWatchlist={setWatchlist} mode={mode}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Number1