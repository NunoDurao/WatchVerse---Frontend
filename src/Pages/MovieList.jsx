import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddMovie from "./AddMovies";

const API_URL = "http://localhost:5005";

function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const getAllMovies = () => {
    const url = selectedYear
      ? `${API_URL}/api/movies?year=${selectedYear}`
      : `${API_URL}/api/movies`;

    axios
      .get(url)
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="movie-list-page">
      <div>
        <label htmlFor="year">Filter by Year:</label>
        <input
          type="text"
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
        />
        <button onClick={getAllMovies}>Filter</button>
      </div>
      <AddMovie refreshMovies={getAllMovies} />
      {movies.map((movie) => {
        return (
          <div className="movie-card card" key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <h3>{movie.title}</h3>
              <img className="list-image" src={movie.image} alt={movie.title} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesListPage;
