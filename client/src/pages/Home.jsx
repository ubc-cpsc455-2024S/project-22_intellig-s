import { useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import { useSelector, useDispatch } from "react-redux";
import { getItinerariesAsync } from "../redux/itinerarySlice";

const Home = () => {
  const dispatch = useDispatch();
  const userId = "66afb602f4473e78404aced1";

  const itineraries = useSelector((state) => state.itineraries.itineraryList);

  useEffect(() => {
    dispatch(getItinerariesAsync(userId));
  }, [dispatch, userId]);

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0 }}>
      <Box sx={{ pt: "64px", height: "100vh", width: "100vw" }}>
        <Box sx={{ height: "100%", overflow: "auto", pt: 2 }}>
          <Container sx={{ height: "100%" }} maxWidth="xl">
            <Grid container sx={{ height: "100%" }}>
              <Grid item xs={12} md={5} sx={{ alignContent: "center" }}>
                <Typography
                  sx={{
                    typography: {
                      fontWeight: 600,
                      xs: { fontSize: 40, textAlign: "center" },
                      md: { fontSize: 80, textAlign: "left" },
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
                      md: { fontSize: 30, textAlign: "left" },
                    },
                    textAlign: "left",
                  }}
                >
                  Create itineraries based on your interests and view them in
                  real time.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Box
                  component="img"
                  src="src/assets/home_page.png"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="secondary">
                  Explore
                </Typography>
                <Grid container spacing={4}>
                  {itineraries.map((itinerary) => (
                    <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
                      <ItineraryCard
                        itinerary={itinerary}
                        showDeleteButton={false}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
