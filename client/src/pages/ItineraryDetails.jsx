import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";

import ControlledMap from "../components/ControlledMap";
import DayForm from "../components/DayForm";
import DayList from "../components/DayList";

import { fetchDays, generateNewDay } from "../redux/daySlice";
import { getItinerariesAsync } from "../redux/itinerarySlice";

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const days = useSelector((state) => state.days.dayLists[id]);
  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const itinerary = itineraries.find((itinerary) => itinerary.id === id);

  const [activeDay, setActiveDay] = useState(null);
  const [addDayFormOpen, setAddDayFormOpen] = useState(false);

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        dispatch(fetchDays(id));
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
    dispatch(getItinerariesAsync());
  }, [dispatch, id]);

  const markers = days
    ? days
        .map((day) => {
          return day.activities.map((activity) => {
            return {
              dayNumber: day.dayNumber,
              title: activity.activity,
              activityNumber: activity.activityNumber,
              latitude: activity.coordinates.latitude,
              longitude: activity.coordinates.longitude,
            };
          });
        })
        .flat()
    : [];

  return (
    <Box position={"absolute"} sx={{ top: 0, left: 0, height: "100vh" }}>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={9} sx={{ pt: "64px", width: "74vw", height: "100%" }}>
          <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            {itinerary && (
              <ControlledMap
                bounds={itinerary.bounds}
                markers={markers}
                activeDay={activeDay}
              ></ControlledMap>
            )}
          </APIProvider>
        </Grid>
        <Grid
          item
          xs={3}
          container
          sx={{
            pt: "80px",
            height: "100%",
            overflow: "auto",
            px: 2,
          }}
        >
          <Grid item xs={12} sx={{ outline: "10px 10px 10px", mb: 1 }}>
            {itinerary && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: "500" }}>
                  {itinerary.location}
                </Typography>
                <Typography>
                  {new Date(itinerary.startDate).toLocaleDateString()}
                  {" - "}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              sx={{ mr: 1, mb: 1 }}
              onClick={() => {
                dispatch(generateNewDay({ itineraryId: id }));
              }}
            >
              Generate New Day
            </Button>
            <Button
              variant="contained"
              sx={{ mr: 1, mb: 1 }}
              onClick={() => setAddDayFormOpen(true)}
            >
              Add Day
            </Button>
            <Button
              variant="contained"
              sx={{ mr: 1, mb: 1 }}
              onClick={() => setActiveDay(null)}
              disabled={!activeDay}
            >
              Reset Map
            </Button>
          </Grid>
          <Grid item xs={12}>
            {days && <DayList itineraryId={id} setActiveDay={setActiveDay} />}
          </Grid>
          <Grid item xs={4}>
            <DayForm
              itineraryId={id}
              open={addDayFormOpen}
              handleClose={() => setAddDayFormOpen(false)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryDetails;
