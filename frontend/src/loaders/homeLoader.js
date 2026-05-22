    const Base_url = import.meta.env.VITE_TMDB_BASE_URL

    const options = {
        headers:{
            accept: "application/json" ,
            Authorization: import.meta.env.VITE_TMDB_TOKEN
        }
    }



const getTrending = async () => {
        const res = await fetch(`${Base_url}/3/trending/movie/day?language=en-US`,options)
        const data = await res.json()
        return data.results
}

const getpopular = async () => {
        const res = await fetch(`${Base_url}/3/movie/popular?language=en-US&page=1`,options)
        const data = await res.json()
        return data.results
}

const getTopRated = async () => {
        const res = await fetch(`${Base_url}/3/movie/top_rated?language=en-US&page=1`,options)
        const data = await res.json()
        return data.results
}


export const homeLoader = async () => {
    const [trending, popular,topRated, latest ] = await Promise.all([
        getTrending(),
        getpopular(),
        getTopRated(),
    ])

    return { trending, popular, topRated };
}