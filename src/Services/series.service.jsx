import axios from "axios";

/* Axios Service that deals with Project Requests */

class SeriesService {
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

  // POST /api/series
  createSerie = (requestBody) => {
    return this.api.post("/api/series", requestBody);
  };

  // GET /api/series
  getAllSeries = () => {
    return this.api.get("/api/series");
  };

  // GET /api/series/:id
  getSerie = (id) => {
    return this.api.get(`/api/series/${id}`);
  };

  // PUT /api/series/:id
  updateSerie = (id, requestBody) => {
    return this.api.put(`/api/series/${id}`, requestBody);
  };

  // DELETE /api/series/:id
  deleteSerie = (id) => {
    return this.api.delete(`/api/series/${id}`);
  };
}

// Create one instance object
const seriesService = new SeriesService();

export default seriesService;