import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { APIProvider } from "@vis.gl/react-google-maps";
import ControlledMap from "../components/ControlledMap";
import DayCard from "../components/DayCard";
import DayForm from "../components/DayForm";
import { useDispatch, useSelector } from "react-redux";
import { setDays, fetchDays } from "../redux/daySlice";
import { getItinerariesAsync } from "../redux/itinerarySlice";

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const days = dayLists[id] || [];
  const itineraries = useSelector((state) => state.itineraries.value);
  const itinerary = itineraries.find((itinerary) => itinerary.id === id);

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        const result = await dispatch(fetchDays(id));
        dispatch(setDays({ itineraryId: id, days: result.payload.days }));
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
    dispatch(getItinerariesAsync());
  }, [dispatch, id]);

  const markers = days
    .map((day) => {
      return day.activities.map((activity) => {
        return {
          latitude: activity.coordinates.latitude,
          longitude: activity.coordinates.longitude,
        };
      });
    })
    .flat();

  return (
    <Box position={"absolute"} sx={{ top: 0, left: 0, height: "100vh" }}>
      <Grid container spacing={2} sx={{ pt: "80px", height: "100vh" }}>
        <Grid item sx={{ width: "50vw", height: "100%" }}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            {itinerary ? (
              <ControlledMap
                bounds={itinerary.bounds}
                markers={markers}
              ></ControlledMap>
            ) : (
              <Typography>No map data available</Typography>
            )}
          </APIProvider>
        </Grid>
        <Grid item xs={6} container sx={{ height: "100%", overflow: "auto" }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: "0.25em" }}>
              Itinerary Details for: {itinerary ? itinerary.location : id}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {days.length > 0 ? (
              days.map((day, index) => (
                <DayCard
                  key={index}
                  id={index}
                  day={{ ...day, date: new Date(day.date) }}
                />
              ))
            ) : (
              <Typography variant="h6">
                No days available for this itinerary.
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            <DayForm itineraryId={id} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryDetails;
