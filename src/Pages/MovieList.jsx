import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;
const PAGE_SIZE = 12; // Number of movies per page

function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]); 
  const getAllMovies = () => {
    const url = `${API_URL}/api/movies`;

    axios
      .get(url)
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllMovies();
  }, []);


 const handleLikeMovie = (movieId) => {
   // Find the movie in the movies array based on the movieId
   const likedMovie = movies.find((movie) => movie._id === movieId);
   setLikedMovies((prevLikedMovies) => [...prevLikedMovies, likedMovie]);
 };

 const handleCheckMovie = (movieId) => {
   // Find the movie in the movies array based on the movieId
   const watchedMovie = movies.find((movie) => movie._id === movieId);

   setWatchedMovies((prevWatchedMovies) => [
     ...prevWatchedMovies,
     watchedMovie,
   ]);
 };


  // Calculate total number of pages based on movies count and page size
  const totalPages = Math.ceil(movies.length / PAGE_SIZE);

  // Get the current page movies based on the currentPage state
  const currentMovies = movies.slice(
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
    <div className="movie-list-page">
      <Grid container spacing={2}>
        {currentMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <div style={{ position: "relative", height: "100%" }}>
                <CardMedia
                  component="img"
                  src={movie.image}
                  alt={movie.title}
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
                    onClick={() => handleCheckMovie(movie._id)}
                    style={{
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: 5,
                      marginRight: 10,
                    }}
                  />
                  <FavoriteIcon
                    onClick={() => handleLikeMovie(movie._id)}
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

export default MoviesListPage;
