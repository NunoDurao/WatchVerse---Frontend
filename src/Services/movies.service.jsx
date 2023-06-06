import axios from "axios";

/* Axios Service that deals with Project Requests */

class MoviesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  //POST upload images
  uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

  // POST /api/movies
  createMovie = (requestBody) => {
    return this.api.post("/api/movies", requestBody);
  };

  // GET /api/movies
  getAllmovies = () => {
    return this.api.get("/api/movies");
  };

  // GET /api/movies/:id
  getMovie = (id) => {
    return this.api.get(`/api/movies/${id}`);
  };

  // PUT /api/movies/:id
  updateMovie = (id, requestBody) => {
    return this.api.put(`/api/movies/${id}`, requestBody);
  };

  // DELETE /api/movies/:id
  deleteMovie = (id) => {
    return this.api.delete(`/api/movies/${id}`);
  };

  addReview = (movieId, requestBody) => {
    return this.api.post(`api/movies/${movieId}/reviews`, requestBody);
  };

  getReviews(movieId) {
    return this.api.get(`/api/movies/${movieId}/reviews`);
  }
}
// Create one instance object
const moviesService = new MoviesService();

export default moviesService;
