import HomeMovieInfo from "./MovieInfo/HomeMovieInfo";


function Home() {

    // const [trendingList, setTrendingList] = useState([])

    // useEffect(()=> {
    //     const getTrending = async() => {
    //         const res = await fetch(`${Base_url}/3/trending/movie/day?language=en-US`,options)
    //         const data = await res.json()
    //         console.log(data)
    //         setTrendingList(data.results)
    //     }
    //     getTrending()
    // }, [])

    

    return(
        <div>
            <HomeMovieInfo mode="home" />
            {/* <HomeMovieInfo list={popular} mode="home" />
            <HomeMovieInfo list={topRated} mode="home" />
            <HomeMovieInfo list={latest} mode="home" /> */}
        </div>

    )
}

export default Home