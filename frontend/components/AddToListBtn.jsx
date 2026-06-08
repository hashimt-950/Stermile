import { useNavigate } from "react-router-dom";

function AddToListBtn({ movieData }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const addToWatchlist = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/watchlist/watchlist",
        {
          method: "POST",

          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            movieId: movieData.id,
            title: movieData.title,
            overview: movieData.overview,
            poster_path: movieData.poster_path,
            backdrop_path: movieData.backdrop_path,
            release_date: movieData.release_date,
            vote_average: movieData.vote_average,
            vote_count: movieData.vote_count,
          }),
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("error while adding movie to watchlist: ", error.message);
    }
  };

  return (
    <div>
      <button onClick={addToWatchlist}>Add to List</button>
    </div>
  );
}

export default AddToListBtn;
