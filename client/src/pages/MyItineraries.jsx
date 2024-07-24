import { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import SurveyForm from "../components/SurveyForm";
import { useSelector, useDispatch } from "react-redux";
import { getItinerariesAsync } from "../redux/itinerarySlice";
import LoadingDialog from "../components/LoadingDialog";

const MyItineraries = () => {
  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const itineraryStatus = useSelector((state) => state.itineraries.status);

  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    dispatch(getItinerariesAsync());
  }, [dispatch]);

  return (
    <Container
      style={{
        marginTop: "80px",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        My Itineraries
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormOpen(true)}
        sx={{
          mb: 2,
        }}
      >
        Add Itinerary
      </Button>
      <Grid container spacing={4}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
            <ItineraryCard itinerary={itinerary} />
          </Grid>
        ))}
      </Grid>
      <SurveyForm open={formOpen} handleClose={() => setFormOpen(false)} />
      <LoadingDialog isOpen={itineraryStatus === "loading"}>
        Generating...
      </LoadingDialog>
    </Container>
  );
};

export default MyItineraries;
