import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Card,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  AutoAwesome,
  CalendarMonth,
  Close,
  PictureAsPdf,
  Place,
  RestartAlt,
} from "@mui/icons-material";

import { APIProvider } from "@vis.gl/react-google-maps";

import ControlledMap from "../components/itinerary-details/ControlledMap";
import DayList from "../components/itinerary-details/DayList";
import LoadingDialog from "../components/common/LoadingDialog";

import { fetchDays, fetchExploreDays, generateNewDay } from "../redux/daySlice";
import {
  getItineraryCalendar,
  getItineraryPdf,
  incrementItineraryEndDate,
} from "../redux/itinerarySlice";

const ItineraryDetails = () => {
  const { explore, id } = useParams();
  const isExplore = explore === "explore";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const days = useSelector((state) => state.days.dayLists[id]);
  const dayStatus = useSelector((state) => state.days.status);

  const itineraries = useSelector((state) => state.itineraries.itineraryList);
  const exploreItineraries = useSelector(
    (state) => state.itineraries.exploreItineraries
  );
  const itineraryStatus = useSelector((state) => state.itineraries.status);
  const itinerary = isExplore
    ? exploreItineraries.find((itinerary) => itinerary.id === id)
    : itineraries.find((itinerary) => itinerary.id === id);

  const [activeDay, setActiveDay] = useState(null);
  const [mapMode, setMapMode] = useState(false);
  const [showAlert, setShowAlert] = useState(!user);

  useEffect(() => {
    isExplore ? dispatch(fetchExploreDays(id)) : dispatch(fetchDays(id));
  }, [dispatch, id, isExplore]);

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
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Grid container sx={{ height: "100vh", pt: "64px" }}>
        {/* map */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            height: "100%",
            display: {
              xs: mapMode ? "block" : "none",
              md: "block",
            },
          }}
        >
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
                    sx={{ display: { xs: "none", md: "flex" }, m: 2, pl: 1 }}
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
          xs={12}
          md={3}
          sx={{
            height: "100%",
            overflow: "auto",
            p: 2,
            display: {
              xs: mapMode ? "none" : "block",
              md: "block",
            },
          }}
        >
          {/* itinerary info */}
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 3, mb: 2 }}>
              {itinerary && (
                <>
                  <Typography variant="h4" sx={{ fontWeight: "900" }}>
                    {itinerary.location}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {new Date(itinerary.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(itinerary.endDate).toLocaleDateString()}
                  </Typography>
                </>
              )}

              {/* itinerary utility buttons (only loaded if not homepage itinerary) */}
              <Box sx={{ mt: 1.5 }}>
                {!isExplore && (
                  <>
                    <Button
                      variant="contained"
                      sx={{ mr: 1, mb: 1, pl: 1 }}
                      onClick={() => {
                        dispatch(generateNewDay({ itineraryId: id }))
                          .unwrap()
                          .then(() => {
                            dispatch(
                              incrementItineraryEndDate({ itineraryId: id })
                            );
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
                        dispatch(getItineraryCalendar(id));
                      }}
                    >
                      <CalendarMonth sx={{ mr: 0.75 }} />
                      Add to Calendar
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1, mb: 1, pl: 1 }}
                      onClick={() => {
                        dispatch(getItineraryPdf(id));
                      }}
                    >
                      <PictureAsPdf sx={{ mr: 0.75 }} />
                      Save as PDF
                    </Button>
                  </>
                )}
              </Box>
            </Card>
          </Grid>

          {/* day list */}
          <Grid item xs={12}>
            {days && (
              <DayList
                itineraryId={id}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                isExplore={isExplore}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* loading dialog for generating new day */}
      <LoadingDialog isOpen={dayStatus === "generating"}>
        Generating new day...
      </LoadingDialog>

      {/* loading dialog for downloading pdf/calendar invites */}
      <LoadingDialog isOpen={itineraryStatus === "downloading"}>
        Downloading...
      </LoadingDialog>

      {/* alert to create account if exploring */}
      {showAlert && (
        <Alert
          variant="filled"
          icon={false}
          color="primary"
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            zIndex: 1070,
          }}
          action={
            <Grid container alignItems="center" sx={{ height: "100%", mr: 3 }}>
              <Grid item xs={11}>
                <Button
                  size="small"
                  sx={{ color: "white" }}
                  onClick={() => navigate("/signup")}
                >
                  I&#39;m convinced, sign me up!
                </Button>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  size="small"
                  onClick={() => setShowAlert(false)}
                  sx={{ color: "white" }}
                >
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          }
        >
          <Box sx={{ height: "100%", alignItems: "center", p: 0 }}>
            Looking to create your own personalized itineraries? Create an
            account now!
          </Box>
        </Alert>
      )}

      {/* Mobile buttons */}
      <Fab
        variant="extended"
        size="medium"
        disabled={activeDay === null}
        sx={{
          display: { xs: mapMode ? "flex" : "none", md: "none" },
          position: "fixed",
          bottom: 100,
          right: 10,
          backgroundColor: "white",
          color: "primary.main",
          border: "2px solid",
        }}
        onClick={() => setActiveDay(null)}
      >
        Reset Markers
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        sx={{
          display: { xs: mapMode ? "flex" : "none", md: "none" },
          position: "fixed",
          bottom: 55,
          right: 10,
          backgroundColor: "white",
          color: "primary.main",
          border: "2px solid",
          pl: 1,
        }}
        onClick={() =>
          setActiveDay(() => {
            if (activeDay === null) return 1;
            const currentIndex = days.findIndex(
              (day) => day.dayNumber === activeDay
            );
            if (days[currentIndex + 1]) return days[currentIndex + 1].dayNumber;
            return 1;
          })
        }
      >
        <Place sx={{ mr: 1, ml: 0 }} />
        {activeDay ? `Day: ${activeDay}` : "Day: All Days"}
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
        onClick={() => setMapMode(!mapMode)}
      >
        {mapMode ? `View List` : `View Map`}
      </Fab>
    </Box>
  );
};

export default ItineraryDetails;
