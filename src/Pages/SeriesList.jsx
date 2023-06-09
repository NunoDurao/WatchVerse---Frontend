import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import "./style/MoviesListPage.css";
import AddSeries from "./AddSeries";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;
const PAGE_SIZE = 12; // Number of series per page

function SeriesListPage() {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllSeries = () => {
    axios
      .get(`${API_URL}/api/series`)
      .then((response) => setSeries(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSeries();
  }, []);

  // Calculate total number of pages based on series count and page size
  const totalPages = Math.ceil(series.length / PAGE_SIZE);

  // Get the current page series based on the currentPage state
  const currentSeries = series.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="series-list-page" style={{ marginTop: "80px" }}>
      <AddSeries refreshSeries={getAllSeries} />
      <Grid container spacing={2}>
        {currentSeries.map((serie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={serie._id}>
            <Link to={`/series/${serie._id}`}>
              <div className="series-card">
                <CardMedia
                  component="img"
                  src={serie.image}
                  alt={serie.title}
                  className="series-image"
                />
                <div className="series-overlay">
                  {/* Add additional elements or information */}
                </div>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default SeriesListPage;
