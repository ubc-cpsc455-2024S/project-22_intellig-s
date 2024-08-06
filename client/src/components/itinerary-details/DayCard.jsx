import { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  CardMedia,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess, Place, Delete } from "@mui/icons-material";
import { removeDay } from "../../redux/daySlice";
import { useDispatch, useSelector } from "react-redux";
import ActivityList from "./ActivityList";
import { decrementItineraryEndDate } from "../../redux/itinerarySlice";

export default function DayCard({
  day,
  setActiveDay,
  dragHandleProps,
  isExplore,
}) {
  const [showActivities, setShowActivities] = useState(false);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.days.status);

  const toggleActivities = () => {
    setShowActivities(!showActivities);
  };

  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        sx={{ height: 200, "&:hover": { cursor: isExplore && "grab" } }}
        image={day.imageUrl}
        alt="Day Image"
        {...dragHandleProps}
      />
      <CardContent
        className="day-card"
        sx={{
          position: "relative",
          alignItems: "top",
          objectFit: "fill",
          ":last-child": { pb: 2 },
        }}
      >
        <Typography variant="h6">
          Day {day.dayNumber}:{" "}
          {day.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        {/* button used to show only this day's markers on map */}
        <Button
          variant="contained"
          sx={{ display: { xs: "none", md: "flex" }, my: 1, pl: 1 }}
          onClick={() => setActiveDay(day.dayNumber)}
        >
          <Place sx={{ mr: 0.75 }} />
          Show on Map
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Activities</Typography>
          {/* button used to expand day card to show activities */}
          <IconButton
            onClick={toggleActivities}
            sx={{
              ml: 1,
              width: 40,
              height: 30,
              borderRadius: 1,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
            }}
          >
            {showActivities ? (
              <ExpandLess color="primary" />
            ) : (
              <ExpandMore color="primary" />
            )}
          </IconButton>
        </Box>
      </CardContent>

      <Collapse in={showActivities} timeout="auto" unmountOnExit>
        <ActivityList
          itineraryId={day.parentItineraryId}
          dayId={day.id}
          initialActivities={day.activities}
          isExplore={isExplore}
        />
        <Box sx={{ mb: 1 }}>
          {!isExplore && (
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 1, pl: 1 }}
              onClick={() => {
                // collapse activities on
                setShowActivities(false);
                dispatch(
                  removeDay({ itineraryId: day.parentItineraryId, id: day.id })
                )
                  .unwrap()
                  .then(() => {
                    if (status === "succeeded")
                      // if delete is successful, decrement the end date of the itinerary
                      dispatch(
                        decrementItineraryEndDate({
                          itineraryId: day.parentItineraryId,
                        })
                      );
                  });
              }}
            >
              <Delete sx={{ mr: 0.75 }} />
              Delete
            </Button>
          )}
        </Box>
      </Collapse>
    </Card>
  );
}

DayCard.propTypes = {
  day: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentItineraryId: PropTypes.string.isRequired,
    dayNumber: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date),
    overview: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        activity: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setActiveDay: PropTypes.func,
  dragHandleProps: PropTypes.object,
  isExplore: PropTypes.bool,
};
