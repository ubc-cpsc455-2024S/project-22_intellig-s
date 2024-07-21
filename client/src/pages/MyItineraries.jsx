// src/pages/MyItineraries.js
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import ItineraryCard from "../components/ItineraryCard";
import { useNavigate } from "react-router-dom";
import SurveyForm from "../components/SurveyForm";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItineraries,
  getItinerariesAsync,
  deleteItineraryAsync,
} from "../redux/itinerarySlice";

const MyItineraries = () => {
  const itineraries = useSelector(selectItineraries);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    dispatch(getItinerariesAsync());
  }, [dispatch]);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleDeleteItinerary = (id) => {
    dispatch(deleteItineraryAsync(id));
  };

  const openDetails = (id) => {
    navigate(`/itineraries/${id}`);
  };

  return (
    <Container
      style={{
        paddingTop: "20px",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        My Itineraries
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFormOpen}
        sx={{
          mb: 2,
        }}
      >
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
