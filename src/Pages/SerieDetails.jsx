import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import seriesService from "../Services/series.service";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "../Pages/style/SeriesDetailsPage.css";

function SeriesDetailsPage() {
  const [serie, setSerie] = useState(null);
  const [review, setReview] = useState({ content: "", rating: "" });

  const { serieId } = useParams();

  const { user } = useContext(AuthContext);

  const getSerie = async () => {
    try {
      const response = await seriesService.getSerie(serieId);
      const oneSerie = response.data;
      console.log("Serie Data:", oneSerie);
      setSerie(oneSerie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSerie();
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
    seriesService
      .addReview(serieId, requestBody)
      .then(() => {
        // Refresh the serie data
        getSerie();
        setReview({ content: "", rating: "" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="series-details">
      {serie && (
        <div>
          <h1 style={{ color: "white" }}>{serie.title}</h1>
          <p style={{ color: "white" }}>{serie.year}</p>
          <img
            className="series-details-image"
            src={serie.image}
            alt={serie.title}
          />
          <div className="series-reviews">
            <h3 style={{ color: "white" }}>Reviews</h3>
            {serie && serie.reviews.length > 0 ? (
              serie.reviews.map((review) => {
                return (
                  <div className="review-item" key={review._id}>
                    <p style={{ color: "white" }}>Review: {review.content}</p>
                    <p style={{ color: "white" }}>Rating: {review.rating}</p>
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
                name="series-rating"
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

      <Link to={`/series/edit/${serieId}`}>
        <button>Edit Series</button>
      </Link>

      <Link to="/series">
        <button>Back to Series</button>
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

export default SeriesDetailsPage;
