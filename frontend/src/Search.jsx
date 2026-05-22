import React, { useState } from "react";
import MovieInfo from './components/MovieInfo/MovieInfo'
import SearchBar from './components/SearchBar/SearchBar'

function Search() {
    const [input, setInput] = useState('')
    const[searchedMovie, setSearchedMovie] = useState([])

    const Base_url = import.meta.env.VITE_TMDB_BASE_URL
    const options = {
        headers:{
            accept: "application/json" ,
            Authorization: import.meta.env.VITE_TMDB_TOKEN
        }
    }

    const handleSearch = async () => {
        try {
            const res = await fetch(`${Base_url}/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,options)
            const movies = await res.json()
            setSearchedMovie(movies.results)
            setInput('')
            
        } catch (error) {
            throw error
        }
    }

    return(
        <div>
          <SearchBar onSearch={handleSearch} input={input} setInput={setInput} placeholder="Search Movies here" />
          <MovieInfo list={searchedMovie}/>
        </div>
        
    )
}

export default Search