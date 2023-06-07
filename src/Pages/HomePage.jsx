import "../App.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="text-white homepage-content">
        <div className="right-aligned-content">
          <h1>WatchVerse</h1>
          <h2>Best & free tracker of movies and series</h2>
        </div>
        <div className="right-aligned-buttons">
          <a
            className="btn btn-outline-light btn-lg m-2"
            href="/signup"
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </a>
          <a
            className="btn btn-outline-light btn-lg m-2"
            href="/login"
            style={{ textDecoration: "none" }}
          >
            Login
          </a>
          <a
            className="btn btn-outline-light btn-lg m-2"
            href="/movies"
            style={{ textDecoration: "none" }}
          >
            Movies List
          </a>
          <a
            className="btn btn-outline-light btn-lg m-2"
            href="/series"
            style={{ textDecoration: "none" }}
          >
            Series List
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
