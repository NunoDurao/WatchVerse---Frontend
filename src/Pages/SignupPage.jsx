import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authService from "../Services/auth.service";
import Box from "@mui/material/Box";
//import "../style/HomePage.css"

const defaultTheme = createTheme();

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
    <ThemeProvider theme={defaultTheme}>
       <div className="homepage-background-signup"></div>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative", 
            zIndex: 2
          }}
        >
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
            InputProps={{
                style: { backgroundColor: "white" },
              }}
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
            InputProps={{
                style: { backgroundColor: "white" },
              }}
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
            InputProps={{
                style: { backgroundColor: "white" },
              }}
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
      </Box>
    </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;
