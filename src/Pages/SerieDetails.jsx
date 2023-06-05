/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import seriesService from "../Services/series.service";

function SeriesDetailsPage() {
  // write state. By default it'll be null because we don't have
  // the series
  const [serie, setSeries] = useState(null);
  const [review, setReview] = useState("");

  // grab the seriesId from route params
  const { serieId } = useParams();

  // function to call axios to do a GET request
  // to find a series by the Id.
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

  // Side-effect after initial render of the component.
  // The empty array must be as a parameter to tell to React that
  // it'll happen after it renders the component

  useEffect(() => {
    getSerie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a request to the backend to add the review
    const requestBody = {
      review: review,
      serieId: serieId,
    };

    // Make a POST request to add the review
    seriesService
      .addReview(requestBody)
      .then((response) => {
        // Refresh the serie data
        getSerie();
        setReview("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="serie-details">
      {serie && (
        <div>
          <h1>{serie.title}</h1>
          <p>{serie.year}</p>
          <img src={serie.image} />
          <div>
            <h3>Reviews</h3>
            {serie.reviews.map((review) => (
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

      <Link to={`/series/edit/${serieId}`}>
        <button>Edit series</button>
      </Link>

      <Link to="/series">
        <button>Back to series</button>
      </Link>
    </div>
  );
}

export default SeriesDetailsPage;