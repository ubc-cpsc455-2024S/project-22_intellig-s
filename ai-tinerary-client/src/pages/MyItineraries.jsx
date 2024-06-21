// src/pages/MyItineraries.js
import { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import { useNavigate } from "react-router-dom";

const initialItineraries = [
  {
    id: 1,
    name: "Trip to Paris",
    dates: "June 11 - June 13, 2024",
    imageUrl:
      "https://www.travelandleisure.com/thmb/QBWOr5wx42xqoO3KYhfAKZN0lQk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3-paris-social-niche1115-470f7989143d49f7a3def0ac3940988d.jpg",
  },
  {
    id: 2,
    name: "Explore Tokyo",
    dates: "August 14 - August 20, 2024",
    imageUrl:
      "https://www.travelandleisure.com/thmb/vY0D56r18tUFYQOttVCF0ouKsXA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tokyo-japan-TOKYOTG0621-52012ff551dc46c4a87ac8e3151307a4.jpg",
  },
  {
    id: 3,
    name: "New York Adventure",
    dates: "September 5 - September 15, 2024",
    imageUrl:
      "https://www.travelandleisure.com/thmb/3oPWFmA6fi9sjAyWzigwaUKD8P8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg",
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
