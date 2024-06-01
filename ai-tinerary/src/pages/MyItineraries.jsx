import React from "react";
import { Container, Typography } from "@mui/material";

const MyItineraries = () => {
  return (
    <Container style={{ backgroundColor: "#EDE8F5", height: "100vh" }}>
      <Typography variant="h4" color="primary">
        My Itineraries
      </Typography>
      <Typography color="secondary">Here are your itineraries.</Typography>
    </Container>
  );
};

export default MyItineraries;
