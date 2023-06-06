/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/auth.context';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WatchVerse
        </Typography>
        <Box>
          <Link to="/">
            <Button color="inherit">Home</Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/movies">
                <Button color="inherit">Movies</Button>
              </Link>
              <Link to="/series">
                <Button color="inherit">Series</Button>
              </Link>
              <Link to={`/profile/${user._id}`}>
                <Button color="inherit">Profile</Button>
              </Link>
              <Button color="inherit" onClick={logOutUser}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button color="inherit">Signup</Button>
              </Link>
              <Link to="/login">
                <Button color="inherit">Login</Button>
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
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;

