import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import MoviesListPage from "./Pages/MovieList";
import MoviesDetailsPage from "./Pages/MovieDetails";
import SeriesListPage from "./Pages/SeriesList";  
import SeriesDetailsPage from "./Pages/SerieDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/series" element={<SeriesListPage />} />
        <Route path="/movies/:movieId" element={<MoviesDetailsPage />} />
        <Route path="/series/:serieId" element={<SeriesDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />;
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
