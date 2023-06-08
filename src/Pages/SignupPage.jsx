import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import authService from "../Services/auth.service";
//import "../style/HomePage.css"

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  // Handle Change of Inputs
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  // Handle the Submission of the Form
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    authService
      .signup(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
       <div className="homepage-background-signup"></div>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="signup-page">
        <Typography component="h1" variant="h5" color="white">
          Sign Up
        </Typography>

        <form onSubmit={handleSignupSubmit} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmail}
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
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            value={name}
            onChange={handleName}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>

        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        <Typography color="light-blue">
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography>
      </div>
    </Container>
    </>
  );
}

export default SignUpPage;
