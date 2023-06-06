/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

import moviesService from "../Services/movies.service";

function AddMovie(props) {
  // 2) Write State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // 4) and 5) Steps

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, year };

    moviesService
      .createMovie(requestBody)
      .then(() => {
        setTitle("");
        setYear("");
        setImageUrl("");
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

        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddMovie;
