import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Card, CardContent, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { removeDay } from "../daySlice";
import { useDispatch } from "react-redux";

export default function DayCard({ day, id }) {
  const [showActivities, setShowActivities] = useState(false);
  const dispatch = useDispatch();

  const toggleActivities = () => {
    setShowActivities(!showActivities);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: 8 }}>
      <CardContent
        className="day-card"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={day.imageUrl}
          alt={day.imageUrl}
          style={{ marginRight: 16 }}
        />
        <div>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">
              Day {day.dayNumber}: {day.date.toLocaleDateString()}
            </Typography>
          </div>
          <Typography>{day.overview}</Typography>
          <div>
            <div style={{ display: "flex" }}>
              <Typography variant="h6">Activities</Typography>
              <IconButton onClick={toggleActivities}>
                {showActivities ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
            {showActivities && (
              <ul>
                {day.activities.map((activity, index) => (
                  <li key={index}>
                    {activity.time} - {activity.activity}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() =>
              dispatch(
                removeDay({ itineraryId: day.parentItineraryId, id: day.id })
              )
            }
          >
            ❌
          </button>
        </div>
      </CardContent>
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
};
