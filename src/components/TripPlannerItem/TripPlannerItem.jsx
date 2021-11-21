import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { StartTripButton, DeleteButton } from "../Buttons";

import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function TripPlannerItem({ trip }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // directs user to the park's info page - uses route params
  const getParkInfo = () => {
    console.log(trip.parkCode);
    history.push(`/info/${trip.parkCode}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={getParkInfo}>
        <CardMedia
          component="img"
          width="345"
          image={trip.imagePath}
          alt={trip.parkCode}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {trip.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <DeleteButton trip={trip} />
        <StartTripButton trip={trip} />
      </CardActions>
    </Card>
  );
}
