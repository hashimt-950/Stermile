const nowPlaying = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("error while fetching movies: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const topRated = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("error while fetching data: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { nowPlaying, topRated };
