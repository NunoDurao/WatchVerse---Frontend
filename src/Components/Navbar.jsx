import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
 console.log(isLoggedIn)
  return (
    <nav>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          <Link to="/movies">
            <button>Movies</button>
          </Link>
          <Link to="/series">
            <button>Series</button>
          </Link>
          <Link to={`/profile/${user._id}`}>
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          {/*<p>{user && user.name}</p>*/}
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
