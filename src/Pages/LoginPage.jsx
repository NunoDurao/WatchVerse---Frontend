/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../Context/auth.context";

const auth = firebase.auth();

const defaultTheme = createTheme();

function LoginPage() {
  const [user] = useAuthState(auth);
  console.log(user);

  // Write State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  // Handle Functions that handle the change of inputs
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  // Handle Submit of the form
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(
        `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`,
        requestBody
      ) /*{import.meta.env.VITE_API_URL} instead of localhost with the backend */
      .then((response) => {
        console.log(response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/movies");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleSocialAuth = async () => {
    if (user) {
      const body = {
        name: user.displayName,
        email: user.email,
        password: user.uid,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_SERVER_URL}/auth/signup`,
          body
        );

        console.log(response.data);
        navigate("/home");
      } catch (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
  };

  useEffect(() => {
    handleSocialAuth();
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" color="white">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
            color="white"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmail}
              color="white"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
              color="white"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            {user ? (
              <Typography component="p" variant="body2" color="white">
                You are logged in
              </Typography>
            ) : (
              <Typography component="p" variant="body2" color="white">
                You are logged out
              </Typography>
            )}
            {errorMessage && (
              <Typography
                component="p"
                variant="body2"
                color="error"
                sx={{ mt: 2 }}
              >
                {errorMessage}
              </Typography>
            )}
            <Grid container justifyContent="center">
              <Grid item>
                <Typography component="p" variant="body2" color="white">
                  Don't have an account yet? <Link to={"/signup"}>Sign Up</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
