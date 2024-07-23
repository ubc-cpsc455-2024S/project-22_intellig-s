import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import DayCard from "./DayCard";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { reorderDays } from "../redux/daySlice";
import { Box } from "@mui/material";

function reorder(days, startIndex, endIndex) {
  const dates = days.map((day) => day.date);

  const result = Array.from(days);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((day, index) => {
    const adjustedDay = {
      ...day,
      dayNumber: index + 1,
      date: dates[index],
    };
    return adjustedDay;
  });
}

export default function DayList({ initialDays, setActiveDay }) {
  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    days: Array.from(initialDays).sort((a, b) => a.dayNumber - b.dayNumber),
  });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedDays = reorder(
      order.days,
      result.source.index,
      result.destination.index
    );

    const itineraryId = initialDays[0].parentItineraryId;

    dispatch(
      reorderDays({
        itineraryId: itineraryId,
        days: reorderedDays,
      })
    );
    setOrder({ days: reorderedDays });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="day-list">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {order.days.map((day, index) => (
              <Draggable
                key={day.dayNumber}
                draggableId={`${day.dayNumber}`}
                index={index}
              >
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.draggableProps}>
                    <DayCard
                      day={{
                        ...day,
                        date: new Date(day.date),
                      }}
                      setActiveDay={setActiveDay}
                      dragHandleProps={provided.dragHandleProps}
                      key={day.dayNumber}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DayList.propTypes = {
  initialDays: PropTypes.array,
  setActiveDay: PropTypes.func,
};
