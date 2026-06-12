const nowPlaying = async (req, res) => {
  const pages = [1, 2, 3, 4, 5];
  try {
    const responses = await Promise.all(
      pages.map((page) =>
        fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
          },
        ),
      ),
    );

    const data = await Promise.all(responses.map((r) => r.json()));
    const movies = data.flatMap((item) => item.results);
    res.json({ results: movies });
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

const discover = async (req, res) => {
  const pages = [1, 2, 3, 4, 5];
  try {
    const response = await Promise.all(
      pages.map((page) =>
        fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        }),
      ),
    );

    const data = await Promise.all(response.map((res) => res.json()));

    const movies = data.flatMap((item) => item.results);
    console.log(movies);
    res.json(movies);
  } catch (error) {
    console.log("error while fetching movies: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const movieById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      },
      ``,
    );

    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log("failed to fetch movie by id: ", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

const byGenre = async (req, res) => {
  const genreId = req.params.genreId;
  const pages = [1, 2, 3, 4, 5];
  try {
    const responses = await Promise.all(
      pages.map((page) =>
        fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=200&language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
          },
        ),
      ),
    );

    const data = await Promise.all(responses.map((r) => r.json()));
    const movies = data.flatMap((item) => item.results);
    res.json({ results: movies });
  } catch (error) {
    console.log("error while fetching by genre: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const searchMovies = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "query parameter is required" });
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
      },
    );
    const data = await response.json();
    res.json(data.results || []);
  } catch (error) {
    console.log("error while searching movies: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { nowPlaying, topRated, discover, movieById, byGenre, searchMovies };
