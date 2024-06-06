import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import DayCard from "../components/DayCard";

const ItineraryDetails = () => {
  let { id } = useParams();

  const days = [
    { title: "Day 1", description: "Arrival and settling in." },
    { title: "Day 2", description: "City tour." },
  ];

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Itinerary Details for: {id}
      </Typography>
      {days.map((day, index) => (
        <DayCard key={index} day={day} />
      ))}
    </Container>
  );
};

export default ItineraryDetails;
