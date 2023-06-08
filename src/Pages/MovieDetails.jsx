import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import moviesService from "../Services/movies.service";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "../../public/style/MoviesDetailsPage.css";

function MoviesDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState({ content: "", rating: "" });

  const { movieId } = useParams();

  const { user } = useContext(AuthContext);

  const getMovie = async () => {
    try {
      const response = await moviesService.getMovie(movieId);
      const oneMovie = response.data;
      console.log("Movie Data:", oneMovie);
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
          <img className="movie-details-image" src={movie.image} alt={movie.title} />
          <div className="movie-reviews">
            <h3>Reviews</h3>
            {movie && movie.reviews.length > 0 ? (
              movie.reviews.map((review) => {
                return (
                  <div className="review-item" key={review._id}>
                    <p>Review: {review.content}</p>
                    <p>Rating: {review.rating}</p>
                  </div>
                );
              })
            ) : (
              <p>No reviews available</p>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={review.content}
                onChange={(e) =>
                  setReview({ ...review, content: e.target.value })
                }
                placeholder="Add a review"
              />

              <Rating
                name="movie-rating"
                value={review.rating ? parseFloat(review.rating) : 0}
                onChange={(event, newValue) => {
                  setReview({ ...review, rating: newValue.toString() });
                }}
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

      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
    </div>
  );
}

export default MoviesDetailsPage;





