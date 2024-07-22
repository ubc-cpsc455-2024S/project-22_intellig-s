import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { reorderActivities } from "../redux/daySlice";
import ActivityCard from "./ActivityCard";
import { Box } from "@mui/material";

function reorder(activities, startIndex, endIndex) {
  const times = activities.map((day) => day.time);

  const result = Array.from(activities);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((activity, index) => {
    const adjustedActivity = {
      ...activity,
      activityNumber: index + 1,
      time: times[index],
    };
    return adjustedActivity;
  });
}

export default function ActivityList({
  itineraryId,
  initialActivities,
  dayId,
}) {
  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    activities: Array.from(initialActivities).sort(
      (a, b) => a.activityNumber - b.activityNumber
    ),
  });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedActivities = reorder(
      order.activities,
      result.source.index,
      result.destination.index
    );

    dispatch(
      reorderActivities({
        itineraryId: itineraryId,
        dayId: dayId,
        activities: reorderedActivities,
      })
    );
    setOrder({ activities: reorderedActivities });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="day-list">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {order.activities.map((activity, index) => (
              <Draggable
                key={activity.activityNumber}
                draggableId={`${activity.activityNumber}`}
                index={index}
              >
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.draggableProps}>
                    <ActivityCard
                      activity={activity}
                      dragHandleProps={provided.dragHandleProps}
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

ActivityList.propTypes = {
  itineraryId: PropTypes.string,
  dayId: PropTypes.string,
  initialActivities: PropTypes.array,
};
