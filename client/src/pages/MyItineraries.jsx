import { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, Container } from "@mui/material";
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
    <Box sx={{ position: "absolute", top: 0, left: 0 }}>
      <Box sx={{ pt: "64px", height: "100vh", width: "100vw" }}>
        <Box sx={{ height: "100%", overflow: "auto", pt: 2 }}>
          <Container>
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

            <Grid container spacing={2} sx={{ mb: 10 }}>
              {itineraries.map((itinerary) => (
                <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                  <ItineraryCard itinerary={itinerary} />
                </Grid>
              ))}
            </Grid>

            <SurveyForm
              open={formOpen}
              handleClose={() => setFormOpen(false)}
            />
            <LoadingDialog isOpen={itineraryStatus === "generating"}>
              Generating...
            </LoadingDialog>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MyItineraries;
