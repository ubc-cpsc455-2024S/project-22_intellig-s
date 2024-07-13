import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import DayCard from "../components/DayCard";
import DayForm from "../components/DayForm";
import { useDispatch, useSelector } from "react-redux";
import { setDays, fetchDays } from "../redux/daySlice";

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const days = dayLists[id] || [];

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        const result = await dispatch(fetchDays(id));
        if (fetchDays.fulfilled.match(result)) {
          console.log("Fetched days from DB:", result.payload.days);
          dispatch(setDays({ itineraryId: id, days: result.payload.days }));
        } else {
          console.error("Error fetching days from DB:", result.error.message);
        }
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
  }, [dispatch, id]);

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
        Itinerary Details for: {id}
      </Typography>
      {days.length > 0 ? (
        days.map((day, index) => (
          <DayCard
            key={index}
            id={index}
            day={{ ...day, date: new Date(day.date) }}
          />
        ))
      ) : (
        <Typography variant="h6">
          No days available for this itinerary.
        </Typography>
      )}
      <DayForm itineraryId={id} />
    </Container>
  );
};

export default ItineraryDetails;
