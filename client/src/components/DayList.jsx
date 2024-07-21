import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import DayCard from "./DayCard";

import PropTypes from "prop-types";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function DayList({ initialDays, setActiveDay }) {
  const [order, setOrder] = useState({ days: initialDays });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reordered_days = reorder(
      order.days,
      result.source.index,
      result.destination.index
    );

    setOrder({ days: reordered_days });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {order.days.map((day, index) => (
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DayList.propTypes = {
  initialDays: PropTypes.array,
  setActiveDay: PropTypes.func,
};
