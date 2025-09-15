import MovieCard from "../components/ScreenSeeker";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import { useLocation } from "react-router-dom"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation()

    useEffect(() => {
      const loadPopularMovies = async () => {
        
        try {
          setLoading(true)
          const popularMovies = await getPopularMovies();
          console.log("TMDB movies: ", popularMovies)
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("Failed to load movies...");
        } finally {
          setLoading(false);
        }
      };

      if(location.pathname ==="/") {
        loadPopularMovies()
      }
    }, [location.pathname]);

    const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return
      if (loading) return
      setLoading(true)
      
      try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
      } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
      } finally {
        setLoading(false)
      }
    };

    return (
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    );
  }

export default Home;