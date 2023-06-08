/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moviesService from "../Services/movies.service";

function RandomMovies() {
  const [randomMovieId, setRandomMovieId] = useState("");

  const getRandomMovieId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/movies`
      );
      const movies = response.data;
      console.log("api response", movies);
      const randomIndex = Math.floor(Math.random() * movies.length);
      console.log("random index", randomIndex);
      const movieId = movies[randomIndex]._id;
      console.log("movie id random", movieId);
      setRandomMovieId(movieId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomMovieId();
    console.log("useeffect", randomMovieId);
  }, []);

  return (
    <div>
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
