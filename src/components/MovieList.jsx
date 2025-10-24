import React, { useState } from "react";
import "../style/MovieList.css"; 
import inceptionPoster from "../assets/Inception Poster.jpeg";
import AvengerPoster from "../assets/The Avengers.jpeg";
import LaLaLandPoster from "../assets/La La Land.jpeg";
import BladeRunnerPoster from "../assets/Blade Runner 2049 Poster.jpeg";
import JurrasickParkPoster from "../assets/Jurrasic Park.jpeg";
import TitanicPoster from "../assets/Titanic.jpeg";
import SupermanPoster from "../assets/Superman Poster.jpeg";
import VenomPoster from "../assets/Venom Poster.jpeg";

const ALL_GENRES = [
  "Action",
  "Adventure",
  "Thriller",
  "Romance",
  "Sci-Fi",
  "Comedy",
  "Drama",
  "Horror",
  "Fantasy",
];

const ALL_MOVIES = [
  {
    id: 1,
    title: "Inception",
    genres: ["Action", "Thriller", "Sci-Fi"],
    imageUrl: inceptionPoster,
  },
  {
    id: 2,
    title: "The Avengers",
    genres: ["Action", "Adventure", "Sci-Fi"],
    imageUrl: AvengerPoster,
  },
  {
    id: 3,
    title: "La La Land",
    genres: ["Romance"],
    imageUrl: LaLaLandPoster,
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    genres: ["Sci-Fi", "Thriller"],
    imageUrl: BladeRunnerPoster,
  },
  {
    id: 5,
    title: "Jurassic Park",
    genres: ["Adventure", "Sci-Fi"],
    imageUrl: JurrasickParkPoster,
  },
  {
    id: 6,
    title: "Titanic",
    genres: ["Romance", "Adventure"],
    imageUrl: TitanicPoster,
  },
  {
    id: 7,
    title: "Superman",
    genres: ["Action", "Fantasy", "Sci-Fi"],
    imageUrl: SupermanPoster,
  },
  {
    id: 8,
    title: "Venom",
    genres: ["Action", "Fantasy", "Sci-Fi"],
    imageUrl: VenomPoster,
  },
];

function MovieList({ kategori }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genreName) => {
    const isSelected = selectedGenres.includes(genreName);

    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  const filteredMovies =
    selectedGenres.length === 0
      ? ALL_MOVIES
      : ALL_MOVIES.filter((movie) =>
          movie.genres.some((genre) => selectedGenres.includes(genre))
        );

  return (
    <div className="genre-filter-container">
      <div className="genre-buttons">
        {ALL_GENRES.map((genre) => {
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
              src={movie.imageUrl}
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
