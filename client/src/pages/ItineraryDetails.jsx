import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { APIProvider } from "@vis.gl/react-google-maps";
import ControlledMap from "../components/ControlledMap";
import DayCard from "../components/DayCard";
import DayForm from "../components/DayForm";
import { useDispatch, useSelector } from "react-redux";
import { setDays, fetchDays } from "../redux/daySlice";

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const days = dayLists[id] || [];

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        const result = await dispatch(fetchDays(id));
        if (fetchDays.fulfilled.match(result)) {
          console.log("Fetched days from DB:", result.payload.days);
          dispatch(setDays({ itineraryId: id, days: result.payload.days }));
        } else {
          console.error("Error fetching days from DB:", result.error.message);
        }
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
  }, [dispatch, id]);

  const markers = days
    .map((day) => {
      return day.activities.map((activity) => {
        return { latitude: activity.latitude, longitude: activity.longitude };
      });
    })
    .flat();
  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
          Itinerary Details for: {id}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <ControlledMap
            zoom={8}
            center={{ lat: 48.8575475, lng: 2.3513765 }}
            markers={markers}
          ></ControlledMap>
        </APIProvider>
      </Grid>
      <Grid item xs={3}>
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
      <Grid item xs={2}>
        <DayForm itineraryId={id} />
      </Grid>
    </Grid>
  );
};

export default ItineraryDetails;
