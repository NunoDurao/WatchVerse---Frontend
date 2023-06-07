import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddMovie from "./AddMovies";
import Grid from "@mui/material/Grid";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

  const handleLikeMovie = (movieId) => {
    // Logic to add movie to liked movies
  };

  const handleCheckMovie = (movieId) => {
    // Logic to add movie to watched movies
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
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Link to={`/movies/${movie._id}`}>
                <div style={{ position: "relative", flex: 1 }}>
                  <CardMedia
                    component="img"
                    src={movie.image}
                    alt={movie.title}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                    }}
                  />
                  <CheckSharpIcon
                    onClick={() => handleCheckMovie(movie._id)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: 5,
                      zIndex: 1, // Ensure the button is positioned above the card
                    }}
                  />
                  <FavoriteIcon
                    onClick={() => handleLikeMovie(movie._id)}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: 5,
                      zIndex: 1, // Ensure the button is positioned above the card
                    }}
                  />
                </div>
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
