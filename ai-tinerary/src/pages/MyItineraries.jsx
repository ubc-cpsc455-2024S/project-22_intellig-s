// src/pages/MyItineraries.js
import { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import { useNavigate } from "react-router-dom";

const initialItineraries = [
  {
    id: 1,
    name: "Trip to Paris",
    dates: "July 20 - July 30, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Explore Tokyo",
    dates: "August 15 - August 25, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1544885935-98dd03b09034?q=80&w=3059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "New York Adventure",
    dates: "September 5 - September 15, 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const MyItineraries = () => {
  const [itineraries, setItineraries] = useState(initialItineraries);
  const navigate = useNavigate();

  const addItinerary = () => {
    const newId = itineraries.length
      ? itineraries[itineraries.length - 1].id + 1
      : 1;
    const newItinerary = {
      id: newId,
      name: "New Destination",
      dates: "New Dates",
      imageUrl: "https://example.com/new.jpg",
    };
    setItineraries([...itineraries, newItinerary]);
  };

  const deleteItinerary = (id) => {
    setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
  };

  const openDetails = (id) => {
    navigate(`/itineraries/${id}`);
  };

  return (
    <Container
      style={{
        backgroundColor: "#EDE8F5",
        paddingTop: "20px",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        My Itineraries
      </Typography>
      <Button variant="contained" color="primary" onClick={addItinerary}>
        Add Itinerary
      </Button>
      <Grid container spacing={4}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
            <ItineraryCard
              itinerary={itinerary}
              onDelete={deleteItinerary}
              onOpen={openDetails}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyItineraries;
