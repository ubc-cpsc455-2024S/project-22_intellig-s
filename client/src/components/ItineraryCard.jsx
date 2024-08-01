import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

import PropType from "prop-types";
import { useDispatch } from "react-redux";
import { deleteItineraryAsync } from "../redux/itinerarySlice";
import { useNavigate } from "react-router-dom";

function ItineraryCard({ itinerary }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardMedia
        component="img"
        height={140}
        image={itinerary.imageUrl}
        alt={`Image of ${itinerary.location}`}
        onClick={() => navigate(`/itineraries/${itinerary.id}`)}
      />

      <CardContent
        sx={{ textOverflow: "ellipsis", height: "4em" }}
        onClick={() => navigate(`/itineraries/${itinerary.id}`)}
      >
        <Typography noWrap={true} variant="h5" fontWeight={500}>
          {itinerary.location}
        </Typography>
        <Typography noWrap={true} fontSize={"0.9em"}>
          {new Date(itinerary.startDate).getMonth() ===
          new Date(itinerary.endDate).getMonth()
            ? new Date(itinerary.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : `${new Date(itinerary.startDate).toLocaleDateString("en-US", {
                month: "long",
              })} - 
              ${new Date(itinerary.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}`}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => {
            dispatch(deleteItineraryAsync(itinerary.id));
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
