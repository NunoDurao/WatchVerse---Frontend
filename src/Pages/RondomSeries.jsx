/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import seriesService from "../Services/series.service";

function RandomSeries() {
  const [randomseriesId, setRandomseriesId] = useState('');

  const getRandomSeriesId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/series`
      );
      const series = response.data;
      const randomIndex = Math.floor(Math.random() * series.length);
      const seriesId = series[randomIndex]._id;
      setRandomseriesId(seriesId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomSeriesId();
  }, []);

  return (
    <div>
    <div className="random-series-page-image"></div>
      <h1>Random Series</h1>
      {randomseriesId && (
        <Link to={`/series/${randomseriesId}`}>
          <button>Go to Random series</button>
        </Link>
      )}
    </div>
  );
}

export default RandomSeries;
