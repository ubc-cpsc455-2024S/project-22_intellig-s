// src/components/ItineraryCard.js
import React, { Component } from "react";
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from "@mui/material";

class ItineraryCard extends Component {
  render() {
    const { itinerary, onDelete, onOpen } = this.props;

    return (
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={itinerary.imageUrl}
          alt={`Image of ${itinerary.name}`}
        />
        <CardContent onClick={() => onOpen(itinerary.id)} style={{ cursor: 'pointer' }}>
          <Typography gutterBottom variant="h5" component="div">
            {itinerary.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itinerary.dates}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={(e) => {
            e.stopPropagation(); 
            onDelete(itinerary.id);
          }}>Delete</Button>
        </CardActions>
      </Card>
    );
  }
}

export default ItineraryCard;
