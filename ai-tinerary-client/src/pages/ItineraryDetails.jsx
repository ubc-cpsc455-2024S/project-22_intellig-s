import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import DayCard from "../components/DayCard";
import { useDispatch, useSelector } from "react-redux";
import { addDays } from "../daySlice";
import { v4 as uuid } from 'uuid'; // Corrected import

const ItineraryDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const days = useSelector((state) => state.days.days);

  // This section parses the initial itineraries from public/assets
  useEffect(() => {
    if (id && !days.some(day => day.parentItineraryId === id)) {
      const encodedId = encodeURIComponent(id); // Encode the id in case of spaces --> %20
      console.log(`/assets/${encodedId}.json`);
      fetch(`/assets/${encodedId}.json`)
        .then((response) => response.json())
        .then((data) => {
          const parsedData = data.map((day) => ({
            id: uuid(),
            parentItineraryId: id,
            ...day,
            date: day.date, // Parse date strings into Date objects
          }));
          console.log(parsedData);
          dispatch(addDays(parsedData));
          console.log("Redux store days:", days);
        })
        .catch((error) =>
          console.error("Error fetching itinerary data:", error)
        );
    }
  }, [id, days]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Itinerary Details for: {id}
      </Typography>
      {days.filter(day => day.parentItineraryId === id).map((day, index) => (
        <DayCard key={index} id={index} day={{...day, date: new Date(day.date)}} /> 
      ))}
    </Container>
  );
};

export default ItineraryDetails;
