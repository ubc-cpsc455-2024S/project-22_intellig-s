import { Container, Typography, Grid, Box, Card } from "@mui/material";
import ItineraryCard from "../components/my-itineraries/ItineraryCard";
import { useSelector } from "react-redux";

const Home = () => {
  const itineraries = useSelector(
    (state) => state.itineraries.exploreItineraries
  );

  return (
    <Box sx={{ pt: "64px", height: "100vh", width: "100vw" }}>
      <Box sx={{ height: "100%", overflow: "auto", pt: 2 }}>
        <Container>
          <Grid container spacing={4} alignItems={"center"}>
            {/* home page graphic + text */}
            <Grid item container xs={12}>
              <Grid item xs={12} md={5} sx={{ alignContent: "center" }}>
                <Typography
                  sx={{
                    typography: {
                      fontWeight: 600,
                      xs: { fontSize: 40, textAlign: "center" },
                      sm: { fontSize: 45 },
                      md: { fontSize: 50, textAlign: "left" },
                      lg: { fontSize: 60 },
                    },
                  }}
                  color="primary"
                >
                  Your Perfect Journey, Crafted by AI
                </Typography>
                <Typography
                  sx={{
                    typography: {
                      fontWeight: "200",
                      xs: { fontSize: 15, textAlign: "center" },
                      sm: { fontSize: 20 },
                      md: { fontSize: 25, textAlign: "left" },
                    },
                  }}
                >
                  Create itineraries based on your interests and view them in
                  real time.
                </Typography>
              </Grid>
              <Grid item xs={12} md={7} sx={{ justifyContent: "center" }}>
                <Box
                  component="img"
                  src="assets/home_page.png"
                  sx={{ width: "100%", justifyContent: "center" }}
                />
              </Grid>
            </Grid>

            {/* sample itineraries explore page */}
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Card variant="outlined" sx={{ py: 4, px: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        typography: {
                          xs: { fontSize: 35, fontWeight: 700 },
                          sm: { fontSize: 40, fontWeight: 800 },
                        },
                      }}
                    >
                      Explore
                    </Typography>
                  </Grid>
                  {itineraries.map((itinerary) => (
                    <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                      <ItineraryCard itinerary={itinerary} isExplore={true} />
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
