
import {useState, useEffect} from 'react'; 
import axios from 'axios';
import {Link} from 'react-router-dom';

/*import AddMovie from '../Addmovie';*/

// Pass the API_URL

const API_URL = "http://localhost:5005/";


function MoviesListPage(){
    const [movies, setMovies] = useState([]);

    // function that gets movies via axios
    const getAllMovies = () => {
        axios.get(`${API_URL}/api/movies`)
        .then((response)=> setMovies(response.data))
        .catch((error)=>console.log(error));
    }; 
    // setting a side-effect after initial rendering of component that is 
    // calling getAllmovies function
    useEffect(()=>{
        getAllMovies();
    }, []);

    return(
        <div className="movie-list-page">
       {/* <AddMovie refreshMovies={getAllMovies} />*/}
        {movies.map((movie)=>{
            return(
                <div className="movie-card card" key={movie._id}>
                    <Link to={`/movies/${movie._id}`}>
                        <h3>{movie.title}</h3>
                    </Link>
                </div>
            )
        })}
        </div>
    )

}

export default MoviesListPage;