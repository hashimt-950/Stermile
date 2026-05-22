import React, { useEffect, useState } from "react";
import authService from "../../appwrite/auth";
import watchlistService from "../../appwrite/database";
import MovieCard from "../MovieCard/MovieCard";
import TopTrendingPanel from "../TopTrendingPanel/TopTrendingPanel";
import { useLoaderData } from "react-router-dom";

function HomeMovieInfo({mode}){
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
 
    const {trending, popular,topRated }= useLoaderData()

    return(
        <>
            <TopTrendingPanel list={trending} mode={mode} watchlist={watchlist} setWatchlist={setWatchlist}/>
            <MovieCard list={trending} mode={mode} watchlist={watchlist} setWatchlist={setWatchlist} heading="Trending"/>
            <MovieCard list={popular} mode={mode} watchlist={watchlist} setWatchlist={setWatchlist} heading="Popular"/>
            <MovieCard list={topRated} mode={mode} watchlist={watchlist} setWatchlist={setWatchlist} heading="Top-Rated"/>
        </>
    )
}

export default HomeMovieInfo




