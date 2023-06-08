import React from "react";
import { Link } from "react-router-dom";
import "../style/Homepage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-background"></div>
      <div className="homepage-overlay"></div>
      <div className="text-white homepage-content center-content">
        <div className="right-aligned-content">
          <h1 className="white-text">WatchVerse</h1>
          <h2 className="white-text">
            WatchVerse and chill... with a random thrill!
          </h2>
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;

