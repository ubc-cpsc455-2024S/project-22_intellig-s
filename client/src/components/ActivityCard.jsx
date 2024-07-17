import PropTypes from "prop-types";
import { Typography, Card, CardContent, Box } from "@mui/material";

export default function ActivityCard({ activity }) {
  return (
    <Card
      variant="outlined"
      sx={{ m: 1 }}
      style={{ display: "flex", marginBottom: 8 }}
    >
      <CardContent
        className="day-card"
        style={{ display: "flex", alignItems: "top", objectFit: "fill" }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">{activity.activity}</Typography>
          <Typography>
            <strong>Time:</strong> {activity.time}
          </Typography>
          <Typography>
            <strong>Address:</strong> {activity.address}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = {
  activity: PropTypes.object,
};
