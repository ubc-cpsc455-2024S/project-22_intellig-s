// src/pages/MyItineraries.js
import { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import { useNavigate } from "react-router-dom";
import SurveyForm from "../components/SurveyForm";
import { useSelector, useDispatch } from "react-redux";
import { deleteItinerary } from "../redux/itinerarySlice";

const MyItineraries = () => {
  const itineraries = useSelector((state) => state.itineraries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleDeleteItinerary = (id) => {
    dispatch(deleteItinerary(id));
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
      <Button variant="contained" color="primary" onClick={handleFormOpen}>
        Add Itinerary
      </Button>
      <Grid container spacing={4}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary.id}>
            <ItineraryCard
              itinerary={itinerary}
              onDelete={handleDeleteItinerary}
              onOpen={openDetails}
            />
          </Grid>
        ))}
      </Grid>
      <SurveyForm open={formOpen} handleClose={handleFormClose} />
    </Container>
  );
};

export default MyItineraries;
