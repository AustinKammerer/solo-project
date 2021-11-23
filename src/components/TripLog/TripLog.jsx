import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { EndTripButton, DeleteButton } from "../Buttons";
import JournalList from "../JournalList/JournalList";
import JournalListItem from "../JournalListItem/JournalListItem";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function TripLog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();

  const { tripLog } = useSelector((store) => store.log);
  // const { tripHistory } = useSelector((store) => store.trip);

  // useEffect(
  //   () => dispatch({ type: "FETCH_TRIP_LISTS", payload: tripId }),
  //   [dispatch]
  // );

  useEffect(
    () => dispatch({ type: "FETCH_TRIP_LOG", payload: tripId }),
    [dispatch]
  );

  // const thisTrip = tripHistory?.find((trip) => trip.id === tripId);

  // directs user to the park's info page - uses route params
  const getParkInfo = () => {
    console.log(tripLog.parkCode);
    history.push(`/info/${tripLog.parkCode}`);
  };

  console.log("tripLog:", tripLog);

  return (
    <Container component="main">
      <Box>
        <img src={tripLog?.coverImage} />
        <Typography component="h2" variant="h4">
          {tripLog?.name}
        </Typography>
        {tripLog?.isCurrent ? (
          <EndTripButton tripId={tripLog.tripId} />
        ) : (
          <DeleteButton tripLog={tripLog} />
        )}
        <Button onClick={getParkInfo}>Info</Button>
        <Button variant="contained" color="secondary">
          Photos
        </Button>
        <Button
          variant="contained"
          onClick={() => history.push(`/journal/new/${tripId}`)}
        >
          Add Note
        </Button>
        {/* <JournalList tripLog={tripLog} /> */}
        {tripLog.entries?.length > 0 && (
          <Grid
            container
            flexDirection="column"
            spacing={2}
            justifyContent="center"
          >
            {tripLog.entries?.map((entry) => (
              <Grid item key={entry.logId}>
                <JournalListItem entry={entry} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
