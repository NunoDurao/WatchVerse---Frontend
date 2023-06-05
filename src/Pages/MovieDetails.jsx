import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moviesService from "../Services/movies.service";

function MoviesDetailsPage() {
  // write state. By default it'll be null because we don't have
  // the movies
  const [movie, setMovies] = useState(null);

  // grab the moviesId from route params
  const { movieId } = useParams();

  // function to call axios to do a GET request
  // to find a movies by the Id.
  const getMovie = () => {
    moviesService
      .getMovie(movieId)
      .then((response) => {
        const oneMovie = response.data;
        console.log("one movie info", oneMovie);
        setMovies(oneMovie);
      })
      .catch((error) => console.log(error));
  };

  // Side-effect after initial render of the component.
  // The empty array must be as a parameter to tell to React that
  // it'll happen after it renders the component

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="movie-details">
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.year}</p>
          <img src={movie.image} />
        </div>
      )}

      <Link to={`/movies/edit/${movieId}`}>
        <button>Edit movies</button>
      </Link>

      <Link to="/movies">
        <button>Back to movies</button>
      </Link>
    </div>
  );
}

export default MoviesDetailsPage;
