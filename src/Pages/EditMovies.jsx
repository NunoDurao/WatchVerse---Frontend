/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditMoviePage() {
  // Write State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // req.params => Express
  // useParams() => ReactJS

  const { movieId } = useParams();

  const navigate = useNavigate();

  // Have a Side-Effect after initial rendering of component
  useEffect(() => {
    axios
      .get(`${API_URL}/api/movies/${movieId}`)
      .then((response) => {
        const oneMovie = response.data;
        setTitle(oneMovie.title);
        setYear(oneMovie.year);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  // Create a function that Handles Form Submit
  const handleFormSubmit = (e) => {
    // prevent the default action of the form => refreshing the page
    e.preventDefault();

    // store title, description that is going to be received
    // in ExpressJS as req.body.
    const requestBody = { title, year };

    // make a PUT request to update the project
    axios
      .put(`${API_URL}/api/movies/${movieId}`, requestBody)
      .then((response) => {
        navigate(`/movies/${movieId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create a delete project function
  const deleteMovie = () => {
    axios
      .delete(`${API_URL}/api/movies/${movieId}`)
      .then(() => {
        navigate("/movies");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-project-page">
      <h3>Edit Movie</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Year:</label>
        <textarea
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button type="submit">Edit</button>
      </form>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default EditMoviePage;
