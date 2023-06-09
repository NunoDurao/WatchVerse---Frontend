/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

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
      <div className="form-box">
        <h3 style={{ color: "white" }}>Edit Movie</h3>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year:</label>
            <textarea
              className="form-input"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <button className="form-button" type="submit">
            Edit
          </button>
        </form>
        <button className="delete-button" onClick={deleteMovie}>
          Delete Movie
        </button>
      </div>
    </div>
  );
}
export default EditMoviePage;
