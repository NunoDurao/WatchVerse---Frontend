/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

import moviesService from "../Services/movies.service";

function AddMovie(props) {
  // 2) Write State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // 4) and 5) Steps

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, year };

    moviesService
      .createMovie(requestBody)
      .then(() => {
        setTitle("");
        setYear("");
        props.refreshMovies();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-movie">
      <h3>Add Movie</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Year:</label>
        <textarea
          type="text"
          name="description"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddMovie;