import { Typography, Card, CardContent } from "@mui/material";
import PropType from "prop-types";

function DayCard({ day }) {
  return (
    <Card variant="outlined" style={{ marginBottom: 8 }}>
      <CardContent>
        <Typography variant="h6">{day.title}</Typography>
        <Typography>{day.description}</Typography>
      </CardContent>
    </Card>
  );
}

DayCard.propTypes = {
  day: PropType.object,
};

export default DayCard;
