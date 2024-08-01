import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { AutoAwesome, CalendarMonth, RestartAlt } from "@mui/icons-material";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";

import ControlledMap from "../components/ControlledMap";
import DayList from "../components/DayList";
import LoadingDialog from "../components/LoadingDialog";

import { fetchDays, generateNewDay } from "../redux/daySlice";
import { incrementItineraryEndDate } from "../redux/itinerarySlice";

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const days = useSelector((state) => state.days.dayLists[id]);
  const dayStatus = useSelector((state) => state.days.status);

  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const itinerary = itineraries.find((itinerary) => itinerary.id === id);

  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        dispatch(fetchDays(id));
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
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
    <Box sx={{ position: "absolute", top: 0, left: 0, height: "100vh" }}>
      <Grid container sx={{ height: "100vh", pt: "64px" }}>
        <Grid item xs={9} sx={{ width: "74vw", height: "100%" }}>
          <APIProvider
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            {itinerary && (
              <ControlledMap
                bounds={itinerary.bounds}
                markers={markers}
                activeDay={activeDay}
                resetButton={
                  <Button
                    variant="contained"
                    sx={{ m: 2, pl: 1 }}
                    onClick={() => setActiveDay(null)}
                    disabled={!activeDay}
                  >
                    <RestartAlt sx={{ mr: 0.75 }} />
                    Reset Markers
                  </Button>
                }
              ></ControlledMap>
            )}
          </APIProvider>
        </Grid>

        <Grid
          item
          xs={3}
          container
          spacing={2}
          sx={{ height: "100%", overflow: "auto", p: 2 }}
        >
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 3 }}>
              {itinerary && (
                <>
                  <Typography variant="h4" sx={{ fontWeight: "900" }}>
                    {itinerary.location}
                  </Typography>
                  <Typography>
                    {new Date(itinerary.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(itinerary.endDate).toLocaleDateString()}
                  </Typography>
                </>
              )}
              <Button
                variant="contained"
                sx={{ mr: 1, mb: 1, pl: 1 }}
                onClick={() => {
                  dispatch(generateNewDay({ itineraryId: id }))
                    .unwrap()
                    .then(() => {
                      dispatch(incrementItineraryEndDate({ itineraryId: id }));
                    });
                }}
              >
                <AutoAwesome sx={{ mr: 0.75 }} />
                Generate New Day
              </Button>
              <Button
                variant="outlined"
                sx={{ mr: 1, mb: 1, pl: 1 }}
                onClick={() => {
                  window.open(
                    `${import.meta.env.VITE_BACKEND_URL}/itineraries/cal/${id}`
                  );
                }}
              >
                <CalendarMonth sx={{ mr: 0.75 }} />
                Add to Calendar
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12}>
            {days && (
              <DayList
                itineraryId={id}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <LoadingDialog isOpen={dayStatus === "generating"}>
        Generating...
      </LoadingDialog>
    </Box>
  );
};

export default ItineraryDetails;
