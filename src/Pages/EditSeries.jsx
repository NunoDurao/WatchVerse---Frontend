/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

function EditSeriePage() {
  // Write State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // req.params => Express
  // useParams() => ReactJS

  const { serieId } = useParams();

  const navigate = useNavigate();

  // Have a Side-Effect after initial rendering of component
  useEffect(() => {
    axios
      .get(`${API_URL}/api/series/${serieId}`)
      .then((response) => {
        const oneSerie = response.data;
        setTitle(oneSerie.title);
        setYear(oneSerie.year);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serieId]);

  // Create a function that Handles Form Submit
  const handleFormSubmit = (e) => {
    // prevent the default action of the form => refreshing the page
    e.preventDefault();

    // store title, description that is going to be received
    // in ExpressJS as req.body.
    const requestBody = { title, year };

    // make a PUT request to update the project
    axios
      .put(`${API_URL}/api/series/${serieId}`, requestBody)
      .then((response) => {
        navigate(`/series/${serieId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create a delete project function
  const deleteSerie = () => {
    axios
      .delete(`${API_URL}/api/series/${serieId}`)
      .then(() => {
        navigate("/series");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-project-page">
      <h3 style={{ color: "white" }}>Edit Series</h3>

      <form onSubmit={handleFormSubmit} className="edit-form">
        <div className="form-group">
          <label style={{ color: "white" }}>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label style={{ color: "white" }}>Year:</label>
          <textarea
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="form-button">
          Edit
        </button>
      </form>
      <button onClick={deleteSerie} className="delete-button">
        Delete Series
      </button>
    </div>
  );
}

export default EditSeriePage;
