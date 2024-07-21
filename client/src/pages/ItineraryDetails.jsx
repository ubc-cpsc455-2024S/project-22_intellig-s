/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { APIProvider } from "@vis.gl/react-google-maps";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ControlledMap from "../components/ControlledMap";
import DayCard from "../components/DayCard";
import DayForm from "../components/DayForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchDays } from "../redux/daySlice";
import { getItinerariesAsync } from "../redux/itinerarySlice";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ItineraryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dayLists = useSelector((state) => state.days.dayLists);
  const days = dayLists[id] || [];
  const itineraries = useSelector((state) => state.itineraries.value);
  const itinerary = itineraries.find((itinerary) => itinerary.id === id);

  const [activeDay, setActiveDay] = useState(null);
  const [addDayFormOpen, setAddDayFormOpen] = useState(false);

  const [state, setState] = useState({ days: [] });

  const DayList = React.memo(function DayList({ days }) {
    return days.map((day, index) => (
      <Draggable
        key={day.dayNumber}
        draggableId={`${day.dayNumber}`}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DayCard
              day={{
                ...day,
                date: new Date(day.date),
              }}
              setActiveDay={setActiveDay}
              key={day.dayNumber}
            />
          </div>
        )}
      </Draggable>
    ));
  });

  function onBeforeCapture(result) {
    if (state.days.length === 0) setState({ days: days });
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const days2 = reorder(
      state.days,
      result.source.index,
      result.destination.index
    );

    setState({ days: days2 });
  }

  useEffect(() => {
    const fetchDaysFromDB = async () => {
      try {
        dispatch(fetchDays(id));
      } catch (error) {
        console.error("Error in dispatching fetchDays:", error);
      }
    };

    fetchDaysFromDB();
    dispatch(getItinerariesAsync());
  }, [dispatch, id]);

  const markers = days
    .map((day) => {
      return day.activities.map((activity) => {
        return {
          day: day.dayNumber,
          title: activity.activity,
          latitude: activity.coordinates.latitude,
          longitude: activity.coordinates.longitude,
        };
      });
    })
    .flat();

  return (
    <Box position={"absolute"} sx={{ top: 0, left: 0, height: "100vh" }}>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={9} sx={{ pt: "64px", width: "74vw", height: "100%" }}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            {itinerary ? (
              <ControlledMap
                bounds={itinerary.bounds}
                markers={markers}
                activeDay={activeDay}
              ></ControlledMap>
            ) : (
              <Typography>No map data available</Typography>
            )}
          </APIProvider>
        </Grid>
        <Grid
          item
          xs={3}
          container
          sx={{
            pt: "64px",
            height: "100%",
            overflow: "auto",
            px: 2,
          }}
        >
          <Grid item xs={12} sx={{ outline: "10px 10px 10px", mb: 1 }}>
            {itinerary ? (
              <Box sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: "500" }}>
                  {itinerary.location}
                </Typography>
                <Typography>
                  {new Date(itinerary.startDate).toLocaleDateString()}
                  {" - "}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h4" sx={{ fontWeight: "500", mb: "0.25em" }}>
                {id}
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => setAddDayFormOpen(true)}
            >
              Add Day
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveDay(null)}
              disabled={!activeDay}
            >
              Reset Map
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DragDropContext
              onDragEnd={onDragEnd}
              onBeforeCapture={onBeforeCapture}
            >
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {state.days.length > 0 ? (
                      <DayList days={state.days} />
                    ) : (
                      <DayList days={days} />
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
          <Grid item xs={4}>
            <DayForm
              itineraryId={id}
              open={addDayFormOpen}
              handleClose={() => setAddDayFormOpen(false)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryDetails;
