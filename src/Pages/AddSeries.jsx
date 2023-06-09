/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import seriesService from "../Services/series.service";

function AddSeries(props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, year };

    seriesService
      .createSerie(requestBody)
      .then(() => {
        setTitle("");
        setYear("");
        props.refreshSeries();
      })
      .catch((error) => console.log(error));
  };

  return (
<div className="add-series">
  <div className="form-container">
    <h3 style={{ color: "white" }}>Add Series</h3>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" style={{ color: "white" }}>Title:</label>
        <input
          className="form-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: "white" }}>Year:</label>
        <input
          className="form-input"
          type="text"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <button className="form-button" type="submit">Submit</button>
    </form>
  </div>
</div>
  )
};

export default AddSeries;
