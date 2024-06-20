import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import DayCard from "../components/DayCard";

const ItineraryDetails = () => {
  let { id } = useParams();
  const [days, setDays] = useState([]);

  // This section parses the initial itineraries from public/assets
  useEffect(() => {
    if (id) {
      console.log(`/assets/${id}.json`);
      const encodedId = encodeURIComponent(id); // Encode the id in case of spaces --> %20
      console.log(`/assets/${encodedId}.json`);
      fetch(`/assets/${encodedId}.json`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response data:", data); // Log response data
          const parsedData = data.map((day) => ({
            ...day,
            date: new Date(day.date), // Parse date strings into Date objects
          }));
          console.log(parsedData);
          setDays(parsedData);
        })
        .catch((error) =>
          console.error("Error fetching itinerary data:", error)
        );
    }
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Itinerary Details for: {id}
      </Typography>
      {days.map((day, index) => (
        <DayCard key={index} id={index} day={day} />
      ))}
    </Container>
  );
};

export default ItineraryDetails;
