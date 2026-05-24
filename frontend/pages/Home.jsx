import MovieGrid from "../components/MovieGrid";
import Moviehero from "../components/MovieHero";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Moviehero />
      <MovieGrid />
    </>
  );
}

export default Home;
