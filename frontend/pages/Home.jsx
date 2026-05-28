import Discover from "../components/Discover";
import MovieGrid from "../components/MovieGrid";
import Moviehero from "../components/MovieHero";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Moviehero />
      <MovieGrid />
      <Discover />
    </>
  );
}

export default Home;
