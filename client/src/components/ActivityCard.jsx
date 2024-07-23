import PropTypes from "prop-types";
import { Typography, Card, CardContent, Box, IconButton } from "@mui/material";
import { DragHandle } from "@mui/icons-material";

export default function ActivityCard({ activity, dragHandleProps }) {
  return (
    <Card
      variant="outlined"
      sx={{ m: 1 }}
      style={{ display: "flex", marginBottom: 8 }}
    >
      <CardContent className="day-card" sx={{ pt: 1, width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <IconButton
            variant="outlined"
            sx={{
              top: 1,
              left: "50%",
              transform: "translateX(-50%)",
              p: 0,
            }}
            {...dragHandleProps}
          >
            <DragHandle color="primary"></DragHandle>
          </IconButton>

          <Typography variant="h6">{activity.activity}</Typography>
          <Typography>
            <Box component="span" fontWeight="1000">
              Time:
            </Box>{" "}
            {activity.time}
          </Typography>
          <Typography>
            <Box component="span" fontWeight="1000">
              Address:
            </Box>{" "}
            {activity.address}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

ActivityCard.propTypes = {
  activity: PropTypes.object,
  dragHandleProps: PropTypes.object,
};
