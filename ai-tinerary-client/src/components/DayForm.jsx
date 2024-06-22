import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDay, updateDay } from "../daySlice";
import { v4 as uuid } from "uuid";
import { Button, TextField, Container } from "@mui/material";

const DayForm = ({ itineraryId, day }) => {
  const dispatch = useDispatch();
  const [dayNumber, setDayNumber] = useState(day ? day.dayNumber : "");
  const [date, setDate] = useState(
    day ? day.date.toISOString().substring(0, 10) : ""
  );
  const [overview, setOverview] = useState(day ? day.overview : "");
  const [imageUrl, setImageUrl] = useState(day ? day.imageUrl : "");
  const [activities, setActivities] = useState(
    day ? day.activities.join(", ") : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateObject = new Date(date);
    const newDay = {
      id: day ? day.id : uuid(),
      parentItineraryId: itineraryId,
      dayNumber: parseInt(dayNumber),
      date: dateObject.toLocaleDateString(),
      overview,
      imageUrl,
      activities: activities
        .split(",")
        .map((activity) => ({ time: "N/A", activity })),
    };

    if (day) {
      dispatch(
        updateDay({ itineraryId, dayNumber: newDay.dayNumber, changes: newDay })
      );
    } else {
      dispatch(addDay({ itineraryId, day: newDay }));
    }

    // Clear form after submit
    setDayNumber("");
    setDate("");
    setOverview("");
    setImageUrl("");
    setActivities("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Day Number"
          value={dayNumber}
          onChange={(e) => setDayNumber(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Overview"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Activities (comma separated)"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          {day ? "Update Day" : "Add Day"}
        </Button>
      </form>
    </Container>
  );
};

export default DayForm;
