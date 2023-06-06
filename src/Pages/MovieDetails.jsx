/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../Context/auth.context';
import moviesService from "../Services/movies.service";

function MoviesDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState({ content: "", rating: "" });

  const { movieId } = useParams();

  const {user} = useContext(AuthContext);

  const getMovie = async () => {
    try {
      const response = await moviesService.getMovie(movieId);
      const oneMovie = response.data;
      setMovie(oneMovie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a request to the backend to add the review
    const requestBody = {
      content: review.content,
      rating: review.rating,
      user: user,
    };

    // Make a POST request to add the review
    moviesService
      .addReview(movieId, requestBody)
      .then(() => {
        // Refresh the movie data
        getMovie();
        setReview({ content: "", rating: "" });
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
              <div key={review._id}>
                <p>{review.content}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={review.content}
                onChange={(e) =>
                  setReview({ ...review, content: e.target.value })
                }
                placeholder="Add a review"
              />

              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: parseInt(e.target.value) })
                }
                placeholder="Rating (1-5)"
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
