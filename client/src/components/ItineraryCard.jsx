// src/components/ItineraryCard.js
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

import PropType from "prop-types";

function ItineraryCard({ itinerary, onDelete, onOpen }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={itinerary.imageUrl}
        alt={`Image of ${itinerary.location}`}
      />
      <CardContent
        onClick={() => onOpen(itinerary.id)}
        style={{ cursor: "pointer" }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {itinerary.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {itinerary.dates}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(itinerary.id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

ItineraryCard.propTypes = {
  itinerary: PropType.object,
  onDelete: PropType.func,
  onOpen: PropType.func,
};

export default ItineraryCard;
