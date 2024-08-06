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
import { deleteItineraryAsync } from "../../redux/itinerarySlice";
import { useNavigate } from "react-router-dom";

function ItineraryCard({ itinerary, isExplore }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigate() {
    isExplore
      ? navigate(`/itinerary/explore/${itinerary.id}`)
      : navigate(`/itinerary/${itinerary.id}`);
  }

  return (
    <Card variant="outlined" sx={{ pb: isExplore ? 3 : 0 }}>
      <CardMedia
        component="img"
        height={140}
        image={itinerary.imageUrl}
        alt={`Image of ${itinerary.location}`}
        onClick={handleNavigate}
      />
      <CardContent
        sx={{ textOverflow: "ellipsis", height: "4em" }}
        onClick={handleNavigate}
      >
        <Typography noWrap={true} variant="h5" fontWeight={500}>
          {/* exclude country from location to maintain clean look */}
          {`${itinerary.location.split(",").slice(0, -1).join(",")}`}
        </Typography>
        <Typography noWrap={true} fontSize="0.9em">
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
        {!isExplore && (
          <Button
            size="small"
            onClick={() => {
              dispatch(deleteItineraryAsync(itinerary.id));
            }}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

ItineraryCard.propTypes = {
  itinerary: PropType.object,
  onDelete: PropType.func,
  onOpen: PropType.func,
  isExplore: PropType.bool,
};

export default ItineraryCard;
