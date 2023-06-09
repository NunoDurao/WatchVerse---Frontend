/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import moviesService from "../Services/movies.service";

function AddMovie(props) {
  // 2) Write State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  const handleFileUpload = async (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    try {
      const uploadData = new FormData();

      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("image", e.target.files[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/upload`,
        uploadData
      );
      setImage(response.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // 4) and 5) Steps

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, year, image };

    moviesService
      .createMovie(requestBody)
      .then(() => {
        setTitle("");
        setYear("");
        setImage("");
        props.refreshMovies();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-movie">
      <h3 style={{ color: "white" }}>Add Movie</h3>

      <form onSubmit={handleSubmit}>
        <label style={{ color: "white" }}>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label style={{ color: "white" }}>Year:</label>
        <textarea
          type="text"
          name="description"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label htmlFor="image">
          {image && (
            <div>
              <h4 style={{ color: "white" }}>Uploaded Image:</h4>
              <img src={image} alt="Uploaded" />
            </div>
          )}
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </label>

        {/* Display the image if the imageUrl is available */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddMovie;
