import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/*import Addserie from '../Addserie';*/

// Pass the API_URL

const API_URL = "http://localhost:5005";

function SeriesListPage() {
  const [series, setSeries] = useState([]);

  // function that gets series via axios
  const getAllSeries = () => {
    axios
      .get(`${API_URL}/api/series`)
      .then((response) => setSeries(response.data))
      .catch((error) => console.log(error));
  };
  // setting a side-effect after initial rendering of component that is
  // calling getAllseries function
  useEffect(() => {
    getAllSeries();
  }, []);
  console.log("frontend call", series);
  return (
    <div className="serie-list-page">
      {/* <Addserie refreshseries={getAllseries} />*/}
      {series.map((serie) => {
        return (
          <div className="serie-card card" key={serie._id}>
            <Link to={`/series/${serie._id}`}>
              <h3>{serie.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SeriesListPage;