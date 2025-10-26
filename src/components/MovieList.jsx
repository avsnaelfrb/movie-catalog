import React, { useState, useEffect } from "react";
import "../style/MovieList.css";
import axiosInstance from "../api/axiosConfig"; 

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/movies");

        setMovies(response.data);

        const genresFromData = response.data.map((movie) => movie.genre);
        const uniqueGenres = [
          ...new Set(genresFromData.filter((genre) => genre)),
        ];
        setAllGenres(uniqueGenres); 

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); 

  const filteredMovies =
    selectedGenres.length === 0
      ? movies 
      : movies.filter(
          (movie) => selectedGenres.includes(movie.genre) 
        );

  const handleGenreClick = (genreName) => {
    const isSelected = selectedGenres.includes(genreName);
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };


  if (loading) return <p>Loading film...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="genre-filter-container">
      <div className="genre-buttons">
        {allGenres.map((genre) => {
          const isActive = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              className={`genre-button ${isActive ? "active" : ""}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
