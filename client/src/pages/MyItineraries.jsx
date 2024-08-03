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
    <Box>
      <Box sx={{ pt: "64px", height: "100vh", width: "100vw" }}>
        <Box sx={{ height: "100%", overflow: "auto", pt: 2 }}>
          <Container sx={{ mb: 2 }}>
            <Card variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      typography: {
                        xs: { fontSize: 35, fontWeight: 700 },
                        sm: { fontSize: 40, fontWeight: 800 },
                      },
                    }}
                    color="primary"
                    fontWeight={800}
                  >
                    My Itineraries
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setFormOpen(true)}
                  >
                    Add Itinerary
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => setFormOpen(true)}
                  >
                    Set Preferences
                  </Button>
                </Grid>

                {itineraries.map((itinerary) => (
                  <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                    <ItineraryCard itinerary={itinerary} />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Container>
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
