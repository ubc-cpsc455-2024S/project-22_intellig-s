import { useState, useEffect } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import SurveyForm from "../components/SurveyForm";
import { useSelector, useDispatch } from "react-redux";
import LoadingDialog from "../components/LoadingDialog";
import { getItinerariesAsync } from "../redux/itinerarySlice";

const MyItineraries = () => {
  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const itineraryStatus = useSelector((state) => state.itineraries.status);
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userId = user != null ? user.id : "";

  useEffect(() => {
    dispatch(getItinerariesAsync(userId));
  }, [dispatch, userId]);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto", px: "20%", pt: 2 }}>
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

          <SurveyForm open={formOpen} handleClose={() => setFormOpen(false)} />
          <LoadingDialog isOpen={itineraryStatus === "generating"}>
            Generating...
          </LoadingDialog>
        </Box>
      </Box>
    </Box>
  );
};

export default MyItineraries;
