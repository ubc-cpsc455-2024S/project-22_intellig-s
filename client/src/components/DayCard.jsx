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
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { removeDay } from "../redux/daySlice";
import { useDispatch, useSelector } from "react-redux";
import ActivityList from "./ActivityList";
import { decrementItineraryEndDate } from "../redux/itinerarySlice";

export default function DayCard({ day, setActiveDay, dragHandleProps }) {
  const [showActivities, setShowActivities] = useState(false);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.days.status);

  const toggleActivities = () => {
    setShowActivities(!showActivities);
  };

  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        sx={{ height: 200 }}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Activities</Typography>
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
        />
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 1, mr: 1 }}
          onClick={() => {
            setShowActivities(false);
            dispatch(
              removeDay({ itineraryId: day.parentItineraryId, id: day.id })
            )
              .unwrap()
              .then(() => {
                if (status === "succeeded")
                  dispatch(
                    decrementItineraryEndDate({
                      itineraryId: day.parentItineraryId,
                    })
                  );
              });
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ mb: 1 }}
          onClick={() => setActiveDay(day.dayNumber)}
        >
          Show on Map
        </Button>
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
};
