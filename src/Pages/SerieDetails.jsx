import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import seriesService from "../Services/series.service";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

function SeriesDetailsPage() {
  const [serie, setSeries] = useState(null);
  const [review, setReview] = useState({ content: "", rating: "" });
  const { serieId } = useParams();

  const getSerie = () => {
    seriesService
      .getSerie(serieId)
      .then((response) => {
        const oneSerie = response.data;
        console.log("one serie info", oneSerie);
        setSeries(oneSerie);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSerie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      content: review.content,
      rating: review.rating,
      serieId: serieId,
    };

    seriesService
      .addReview(requestBody)
      .then((response) => {
        getSerie();
        setReview({ content: "", rating: "" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="serie-details">
      {serie && (
        <div>
          <h1>{serie.title}</h1>
          <p>{serie.year}</p>
          <img src={serie.image} alt={serie.title} />
          <div>
            <h3>Reviews</h3>
            {serie.reviews.map((review) => (
              <p key={review._id}>{review.review}</p>
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

              <Rating
                name="serie-rating"
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
        <button>Edit series</button>
      </Link>

      <Link to="/series">
        <button>Back to series</button>
      </Link>

      <Box sx={{ width: 200, display: "flex", alignItems: "center" }}></Box>
    </div>
  );
}

export default SeriesDetailsPage;
