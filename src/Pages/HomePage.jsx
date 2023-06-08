import { color } from "@mui/system";
import "../App.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-overlay"></div>
      <div className="text-white homepage-content center-content">
        <div className="right-aligned-content">
          <h1 className="white-text">WatchVerse</h1>
          <h2 className="white-text">WatchVerse and chill... with a random thrill!</h2>
        </div>
        <div className="right-aligned-buttons">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-primary btn-lg m-2">
              Sign Up
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-primary btn-lg m-2">
              Login
            </button>
          </Link>
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-primary btn-lg m-2">
              Movies List
            </button>
          </Link>
          <Link to="/series" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-primary btn-lg m-2">
              Series List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
