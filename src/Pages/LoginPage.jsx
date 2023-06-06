/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import {useState, useContext, useEffect} from 'react'; 
import axios from 'axios'; 
import {Link, useNavigate} from 'react-router-dom'; 
import authService from '../Services/auth.service'
import { AuthContext } from '../Context/auth.context';
import firebase from '../firebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth"
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
const auth = firebase.auth()

function LoginPage() {
const [user] = useAuthState(auth)
console.log(user)

  // Write State 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage]= useState(undefined);

  const navigate = useNavigate();

  // destructuring the authContext Object
  const {storeToken, authenticateUser } = useContext(AuthContext);

  // Handle Functions that handle the change of inputs
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

  // Handle Submit of the form 
  const handleLoginSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {email, password};

    authService.login(requestBody)
        .then((response)=>{
            storeToken(response.data.authToken);
            console.log(response.data.authToken);
            // authenticate the User
            authenticateUser();

            navigate('/');
          
        })     
        .catch((error) =>{
            const errorDescription = error.response.data.message; 
            setErrorMessage(errorDescription);
        })

        const handleSocialAuth = async () => {
          const body = {
            name: user.displayName,
            email: user.email,
            password: user.uid,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/signup`,
            body
          );

          storeToken(response.authToken);
          authenticateUser();
          navigate("/home");
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


  }
    

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signInWithGithub}>Sign in with Github</button>
      <button onClick={() => auth.signOut()}>Logout</button>

      {user ? <p>You are logged in</p> : <p>You are logged out</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage
