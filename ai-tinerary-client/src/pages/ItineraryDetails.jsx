import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import DayCard from "../components/DayCard";
import { useDispatch, useSelector } from "react-redux";
import { setDays } from "../redux/daySlice";
import { v4 as uuid } from "uuid"; // Corrected import
import DayForm from "../components/DayForm";

const ItineraryDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const days = dayLists[id] || [];

  // This section parses the initial itineraries from public/assets
  useEffect(() => {
    if (id) {
      const encodedId = encodeURIComponent(id); // Encode the id in case of spaces --> %20
      console.log(`/assets/${encodedId}.json`);
      fetch(`/assets/${encodedId}.json`)
        .then((response) => response.json())
        .then((data) => {
          const parsedDays = data.map((day) => ({
            id: uuid(),
            parentItineraryId: id,
            ...day,
            date: day.date, // Parse date strings into Date objects
          }));
          dispatch(setDays({ id, days: parsedDays }));
          console.log("Redux store days:", dayLists);
        })
        .catch((error) =>
          console.error("Error fetching itinerary data:", error)
        );
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Itinerary Details for: {id}
      </Typography>
      {days.map((day, index) => (
        <DayCard
          key={index}
          id={index}
          day={{ ...day, date: new Date(day.date) }}
        />
      ))}
      <DayForm itineraryId={id} />
    </Container>
  );
};

export default ItineraryDetails;
