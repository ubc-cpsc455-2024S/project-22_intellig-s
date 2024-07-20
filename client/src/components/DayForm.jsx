import { useState } from "react";
import { addNewDay, updateDay } from "../redux/daySlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Button, Container, Dialog, TextField } from "@mui/material";

import PropType from "prop-types";

const DayForm = ({ itineraryId, day, open, handleClose }) => {
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
  );

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
      dispatch(addNewDay({ itineraryId, day: newDay }));
    }

    // Clear form after submit
    setDayNumber("");
    setDate("");
    setOverview("");
    setImageUrl("");
    setActivities("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container>
        <form onSubmit={handleSubmit} style={{ justifyItems: "center" }}>
          <TextField
            label="Day Number"
            value={dayNumber}
            onChange={(e) => setDayNumber(e.target.value)}
            required
            fullWidth
            sx={{ mt: 1, mb: 1 }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Activities (input JSON)"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            required
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 1 }}
          >
            {day ? "Update Day" : "Add Day"}
          </Button>
        </form>
      </Container>
    </Dialog>
  );
};

DayForm.propTypes = {
  itineraryId: PropType.string,
  day: PropType.object,
  open: PropType.bool,
  handleClose: PropType.func,
};

export default DayForm;
