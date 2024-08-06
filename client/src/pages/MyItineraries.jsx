import { useState } from "react";
import { Typography, Grid, Button, Box, Container, Card } from "@mui/material";
import ItineraryCard from "../components/my-itineraries/ItineraryCard";
import AddItineraryForm from "../components/my-itineraries/AddItineraryForm";
import { useSelector } from "react-redux";
import LoadingDialog from "../components/common/LoadingDialog";
import PersonalizationForm from "../components/user/PersonalizationForm";

const MyItineraries = () => {
  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const itineraryStatus = useSelector((state) => state.itineraries.status);
  const user = useSelector((state) => state.auth.user);

  const [generateItineraryFormOpen, setGenerateItineraryFormOpen] =
    useState(false);
  const [personalizationFormOpen, setPersonalizationFormOpen] = useState(false);

  return (
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

              {/* action buttons */}
              <Grid item xs={12} sm={5}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setGenerateItineraryFormOpen(true)}
                >
                  Add Itinerary
                </Button>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => setPersonalizationFormOpen(true)}
                >
                  Set Preferences
                </Button>
              </Grid>

              {itineraries.map((itinerary) => (
                <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                  <ItineraryCard
                    itinerary={itinerary}
                    personalItinerary={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Container>

        <AddItineraryForm
          open={generateItineraryFormOpen}
          handleClose={() => setGenerateItineraryFormOpen(false)}
        />
        {user && (
          <PersonalizationForm
            open={personalizationFormOpen}
            handleClose={() => setPersonalizationFormOpen(false)}
            initialFormValues={user.preferences}
          />
        )}

        {/* loading dialog used for generating itinerary */}
        <LoadingDialog isOpen={itineraryStatus === "generating"}>
          Generating...
        </LoadingDialog>
      </Box>
    </Box>
  );
};

export default MyItineraries;
