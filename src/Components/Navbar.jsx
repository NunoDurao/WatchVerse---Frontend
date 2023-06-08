/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#000",
  zIndex: theme.zIndex.drawer + 1,
  width: "100%",
  top: 0,
  left: 0,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [moviesSearch, setMoviesSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filter = [];

    movies.forEach((movie) => {
      if (
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        filter.push(movie);
      }
    });

    setMoviesSearch(filter);
    console.log(searchQuery);
  };

  if (isHomePage) {
    return null; // Return null to hide the navbar on the homepage
  }

  return (
    <CustomAppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WatchVerse
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Home
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/movies" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Movies
                </Button>
              </Link>
              <Link to="/random-movies" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Random Movies
                </Button>
              </Link>
              <Link to="/series" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Series
                </Button>
              </Link>
              <Link to="/random-series" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Random Series
                </Button>
              </Link>
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={logOutUser}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Signup
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button color="inherit" sx={{ textTransform: "none" }}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            type="text"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Search>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
