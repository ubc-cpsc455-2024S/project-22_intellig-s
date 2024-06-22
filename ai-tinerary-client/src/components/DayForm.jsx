import React, { useState } from "react";
import { addDay, updateDay } from "../redux/daySlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Button, TextField, Container, Typography } from "@mui/material";

const DayForm = ({ itineraryId, day }) => {
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const [dayNumber, setDayNumber] = useState(day ? day.dayNumber : "");
  const [date, setDate] = useState(
    day ? day.date.toISOString().substring(0, 10) : ""
  );
  const [overview, setOverview] = useState(day ? day.overview : "");
  const [imageUrl, setImageUrl] = useState(day ? day.imageUrl : "");
  const [activities, setActivities] = useState(
    day ? JSON.stringify(day.activities, null, 2) : ""
  ); // default to JSON string

  const handleSubmit = (e) => {
    e.preventDefault();

    let parsedActivities;
    try {
      parsedActivities = JSON.parse(activities);
      if (!Array.isArray(parsedActivities)) {
        throw new Error("Activities should be an array");
      }
    } catch (err) {
      alert(`Invalid JSON format: ${err.message}`);
      return;
    }

    const dateObject = new Date(date);

    let existingDayIndex;
    let existingDay;
    const days = dayLists[itineraryId] || [];
    if (days) {
      existingDayIndex = days.findIndex(
        (day) => day.dayNumber === parseInt(dayNumber)
      );
      existingDay = days[existingDayIndex];
      console.log("in updater mode; ", days, existingDayIndex, existingDay);
    }

    const newDay = {
      id: existingDay ? existingDay.id : uuid(),
      parentItineraryId: itineraryId,
      dayNumber: parseInt(dayNumber),
      date: dateObject.toLocaleDateString(),
      overview,
      imageUrl,
      activities: parsedActivities,
    };

    if (existingDay) {
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
          label="Activities (input JSON)"
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
