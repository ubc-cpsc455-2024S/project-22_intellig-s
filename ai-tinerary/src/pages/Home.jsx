import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container style={{ backgroundColor: "#EDE8F5", height: "100vh" }}>
      <Typography variant="h4" color="primary">
        Home Page
      </Typography>
      <Typography color="secondary">Welcome to the home page.</Typography>
    </Container>
  );
};

export default Home;
