import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Card, CardContent, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function DayCard({ day, id }) {
  const [showActivities, setShowActivities] = useState(false);

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
          <Typography variant="h6">
            Day {day.dayNumber}: {day.date.toLocaleDateString()}
          </Typography>
          <Typography>{day.overview}</Typography>
          <div>
            <Typography variant="h6">Activities</Typography>
            <IconButton onClick={toggleActivities}>
              {showActivities ? <ExpandLess /> : <ExpandMore />}
            </IconButton>

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
        </div>
      </CardContent>
    </Card>
  );
}

DayCard.propTypes = {
  day: PropTypes.shape({
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
