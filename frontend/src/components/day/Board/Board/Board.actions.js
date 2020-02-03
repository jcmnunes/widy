import { addTaskAtIndex, removeTask, reorderTasksArray } from '../../../../actions/sections';
import { moveTask, updateTaskInStore } from '../../../../actions/tasks';
import { resetActiveTask } from '../../../../actions/activeTask';

// eslint-disable-next-line import/prefer-default-export
export const onDragEnd = (result, sectionsById, activeTaskId) => dispatch => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  const fromSectionId = source.droppableId;
  const toSectionId = destination.droppableId;
  const fromIndex = source.index;
  const toIndex = destination.index;

  if (fromSectionId === toSectionId && fromIndex === toIndex) return;

  // Same section
  if (destination.droppableId === source.droppableId) {
    dispatch(reorderTasksArray(fromSectionId, fromIndex, toIndex));
  } else {
    // When moving a task to the Plan we should stop it
    if (sectionsById[toSectionId].isPlan) {
      dispatch(updateTaskInStore(draggableId, { time: 0, start: null }));
      // The task was active
      if (draggableId === activeTaskId) {
        dispatch(resetActiveTask());
      }
    }
    dispatch(removeTask(fromSectionId, fromIndex));
    dispatch(addTaskAtIndex(toSectionId, toIndex, draggableId));
  }

  // Make API call
  dispatch(moveTask(draggableId, fromSectionId, toSectionId, fromIndex, toIndex));
};
