import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddSeries from "./AddSeries";
import Grid from "@mui/material/Grid";

const API_URL = "http://localhost:5005";

function SeriesListPage() {
  const [series, setSeries] = useState([]);

  const getAllSeries = () => {
    axios
      .get(`${API_URL}/api/series`)
      .then((response) => setSeries(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSeries();
  }, []);

  return (
    <div className="series-list-page">
      <AddSeries refreshSeries={getAllSeries} />
      <Grid container spacing={2}>
        {series.map((serie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={serie._id}>
            <Card sx={{ height: "100%" }}>
              <Link to={`/series/${serie._id}`}>
                <CardMedia
                  component="img"
                  src={serie.image}
                  alt={serie.title}
                  style={{
                    objectFit: "contain",
                    maxHeight: "300px", // Adjust the maxHeight as per your preference
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {serie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Add other series details here */}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SeriesListPage;
