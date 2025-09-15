import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/ScreenSeeker";

function Favourites() {

  const {favourites} = useMovieContext()

  if(favourites) {
    return (
    <div className="favourites">
      <h2>Your Favourite Movies</h2>
    <div className="movies-grid">
      {favourites.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
    </div>
    </div>)
  }
}

export default Favourites;