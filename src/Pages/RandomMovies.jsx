/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moviesService from "../Services/movies.service";
import "./App"

function RandomMovies() {
  const [randomMovieId, setRandomMovieId] = useState("");

  const getRandomMovieId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/movies`
      );
      const movies = response.data;
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movieId = movies[randomIndex]._id;
      setRandomMovieId(movieId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomMovieId();
  }, []);

  return (
    <div>
    <div className="random-movies-page-image"></div>
      <h1>Random Movies</h1>
      {randomMovieId && (
        <Link to={`/movies/${randomMovieId}`}>
          <button>Go to Random Movie</button>
        </Link>
      )}
    </div>
  );
}

export default RandomMovies;
