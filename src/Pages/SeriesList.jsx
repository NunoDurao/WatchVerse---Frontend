import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

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

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={1}
        color="primary"
      />
    </div>
  );
}

export default SeriesListPage;
