import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

  const handleLikeSeries = (seriesId) => {
    // Logic to add series to liked series
  };

  const handleCheckSeries = (seriesId) => {
    // Logic to add series to watched series
  };

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
    <div className="series-list-page">
      <Grid container spacing={2}>
        {currentSeries.map((serie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={serie._id}>
            <Link to={`/series/${serie._id}`}>
              <div style={{ position: "relative", height: "100%" }}>
                <CardMedia
                  component="img"
                  src={serie.image}
                  alt={serie.title}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                  }}
                >
                  <CheckSharpIcon
                    onClick={() => handleCheckSeries(serie._id)}
                    style={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: 5,
                      marginRight: 10,
                    }}
                  />
                  <FavoriteIcon
                    onClick={() => handleLikeSeries(serie._id)}
                    style={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: 5,
                    }}
                  />
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
