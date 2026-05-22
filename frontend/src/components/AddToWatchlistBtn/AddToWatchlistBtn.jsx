import React from "react";
import watchlistService from "../../appwrite/database";
import authService from "../../appwrite/auth";
import { toast } from "react-toastify";

function AddToWatchlistBtn({movie, watchlist, setWatchlist, mode, place}){

    const handleAdd = async() => {
        try {
            const user = await authService.GetCurrentUser()
            await watchlistService.addToWatchlist(user.$id, movie )
            // alert("succesfully added to wachlist")
            toast.success("succesfully added your wachlist")
            setWatchlist((prev) => [...prev, {movieId : String(movie.id)}])
            
        } catch (error) {
            throw error
        }
    }

    const handleRemove = async () => {
        try {
            await watchlistService.removeFromWatchlist(movie.$id)
            // alert("succesfully removed from wachlist")
            toast.success("succesfully removed from wachlist")
            setWatchlist((prev) => prev.filter((m) => m.$id !== movie.$id))       
        } catch (error) {
            throw error
        }

    }

    const isInWatchlist = watchlist.some(item => item.movieId=== String(movie.id || movie.movieId))


    return(
        <>

        {(mode=== "home")?
            (place === "card")?
                !isInWatchlist ?
                    
                <div className="d-flex align-items-center justify-content-center">
                <button className="cardBtn" onClick={handleAdd}><span className="material-symbols-outlined my-1">add</span></button>
                <label className="p-2 mx-2 cardFont ">Add to Watchlist</label>
                </div>
                : 
                <div className="d-flex align-items-center justify-content-center">
                <label className="p-2 cardFont">Already In Watchlist</label>
                </div>  
                :
                !isInWatchlist ?
                <button className="panelBtn" onClick={handleAdd}>Add to Watchlist</button>
                :
                <label className="panelLabel" >Already in Watchlist</label>

                

        : 
                !isInWatchlist ?
                <div className="d-flex">
                    <button className="addbtn d-inline-flex align-items-center justify-content-center" onClick={handleAdd}><span className="material-symbols-outlined ">add</span></button>
                    <label className="label mx-2">add to Watchlist</label>
                </div> : 
                
                <div className="d-flex">
                    <button className="addbtn d-inline-flex align-items-center justify-content-center" onClick={handleRemove}><span className="material-symbols-outlined ">close</span></button>
                    <label className="label mx-2">remove from Watchlist</label>
                </div>
        
        }



        </>
    )
}

export default AddToWatchlistBtn