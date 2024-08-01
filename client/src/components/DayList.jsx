import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import DayCard from "./DayCard";

import { reorderDays } from "../redux/daySlice";

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

export default function DayList({ itineraryId, activeDay, setActiveDay }) {
  const dispatch = useDispatch();

  const selectDays = useSelector((state) => state.days.dayLists[itineraryId]);
  let dayList = Array.from(selectDays).sort(
    (a, b) => a.dayNumber - b.dayNumber
  );

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedDays = reorder(
      dayList,
      result.source.index,
      result.destination.index
    );
    dayList = reorderedDays;

    if (activeDay) setActiveDay(result.destination.index + 1);
    dispatch(
      reorderDays({
        itineraryId: itineraryId,
        days: reorderedDays,
      })
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="day-list">
        {(provided) => (
          <Grid
            container
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {dayList.map((day, index) => (
              <Draggable
                key={day.dayNumber}
                draggableId={`${day.dayNumber}`}
                index={index}
              >
                {(provided) => (
                  <Grid
                    item
                    xs={12}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <DayCard
                      day={{
                        ...day,
                        date: new Date(day.date),
                      }}
                      setActiveDay={setActiveDay}
                      dragHandleProps={provided.dragHandleProps}
                      key={day.dayNumber}
                    />
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DayList.propTypes = {
  itineraryId: PropTypes.string,
  activeDay: PropTypes.number,
  setActiveDay: PropTypes.func,
};
