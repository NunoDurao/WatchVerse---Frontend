import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moviesService from "../Services/movies.service";

function MoviesDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState("");

  const { movieId } = useParams();

  const getMovie = () => {
    moviesService
      .getMovie(movieId)
      .then((response) => {
        const oneMovie = response.data;
        setMovie(oneMovie);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMovie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a request to the backend to add the review
    const requestBody = {
      review: review,
      movieId: movieId,
    };

    // Make a POST request to add the review
    moviesService
      .addReview(requestBody)
      .then((response) => {
        // Refresh the movie data
        getMovie();
        setReview("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="movie-details">
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
          <div>
            <h3>Reviews</h3>
            {movie.reviews.map((review) => (
              <p key={review._id}>{review.review}</p>
            ))}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Add a review"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <Link to={`/movies/edit/${movieId}`}>
        <button>Edit Movie</button>
      </Link>

      <Link to="/movies">
        <button>Back to Movies</button>
      </Link>
    </div>
  );
}

export default MoviesDetailsPage;
