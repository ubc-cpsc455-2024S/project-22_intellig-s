import { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, Container, Card } from "@mui/material";
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
    <Box sx={{ position: "absolute", top: 0, left: 0 }}>
      <Box sx={{ pt: "64px", height: "100vh", width: "100vw" }}>
        <Box sx={{ height: "100%", overflow: "auto", pt: 2 }}>
          <Container sx={{ mb: 2 }}>
            <Card variant="outlined" sx={{ p: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    color="primary"
                    gutterBottom
                    fontWeight={800}
                  >
                    My Itineraries
                  </Typography>
                </Grid>
                <Grid item xs={0} sm={2} md={4} />
                <Grid item xs={12} sm={8} md={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setFormOpen(true)}
                    sx={{
                      mb: 2,
                    }}
                  >
                    Add Itinerary
                  </Button>
                </Grid>
                <Grid item xs={0} sm={2} md={4} />

                {itineraries.map((itinerary) => (
                  <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                    <ItineraryCard itinerary={itinerary} />
                  </Grid>
                ))}

                <SurveyForm
                  open={formOpen}
                  handleClose={() => setFormOpen(false)}
                />
                <LoadingDialog isOpen={itineraryStatus === "generating"}>
                  Generating...
                </LoadingDialog>
              </Grid>
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MyItineraries;
