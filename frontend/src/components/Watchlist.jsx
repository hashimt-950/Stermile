import React, { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo/MovieInfo";
import watchlistService from "../appwrite/database";
import authService from "../appwrite/auth";
import { useLoaderData } from "react-router-dom";


function Watchlist(){
    
    // const[watchlist, setWatchlist] = useState([])

    // useEffect(() => {
    //     const getWatchlist = async() => {
    //         try {
    //             const user = await authService.GetCurrentUser()
    //             const res = await watchlistService.getWatchList(user.$id)
    //             setWatchlist(res.documents)    
    //         } catch (error) {
    //             throw error
    //         }

    //     }
    //     getWatchlist()
    // },[])

    const watchlist = useLoaderData()
        


    return(
        <div>
            <h1 className=" mx-4 main-heading">"Your Watchlist"</h1>
            <MovieInfo list={watchlist} mode="watchlist"/>
        </div>
    )
}

export default Watchlist