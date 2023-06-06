import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddMovie from "./AddMovies";
import Grid from "@mui/material/Grid";

const API_URL = "http://localhost:5005";

function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const getAllMovies = () => {
    const url = selectedYear
      ? `${API_URL}/api/movies?year=${selectedYear}`
      : `${API_URL}/api/movies`;

    axios
      .get(url)
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="movie-list-page">
      <div>
        <label htmlFor="year">Filter by Year:</label>
        <input
          type="text"
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
        />
        <button onClick={getAllMovies}>Filter</button>
      </div>
      <AddMovie refreshMovies={getAllMovies} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <Card sx={{ height: "100%" }}>
              <Link to={`/movies/${movie._id}`}>
                <CardMedia
                  component="img"
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    objectFit: "contain",
                    maxHeight: "300px", // Adjust the maxHeight as per your preference
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MoviesListPage;
