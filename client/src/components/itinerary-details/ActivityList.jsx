import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import { reorderActivities } from "../../redux/daySlice";
import ActivityCard from "./ActivityCard";

// helper function to process activity data after drag and drop
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

export default function ActivityList({ itineraryId, dayId, isExplore }) {
  const dispatch = useDispatch();

  const selectActivities = useSelector(
    (state) =>
      state.days.dayLists[itineraryId].find((day) => day.id === dayId)
        .activities
  );
  let activityList = Array.from(selectActivities).sort(
    (a, b) => a.dayNumber - b.dayNumber
  );

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedActivities = reorder(
      activityList,
      result.source.index,
      result.destination.index
    );
    activityList = reorderedActivities;

    dispatch(
      reorderActivities({
        itineraryId: itineraryId,
        dayId: dayId,
        activities: reorderedActivities,
      })
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="day-list">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {activityList.map((activity, index) => (
              <Draggable
                key={activity.activityNumber}
                draggableId={`${activity.activityNumber}`}
                index={index}
                isDragDisabled={isExplore}
              >
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{ mx: 1, mb: 1 }}
                  >
                    <ActivityCard
                      activity={activity}
                      dragHandleProps={provided.dragHandleProps}
                      isExplore={isExplore}
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
  isExplore: PropTypes.bool,
};
