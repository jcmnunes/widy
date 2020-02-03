import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const DraggableTask = ({
  taskId,
  sectionId,
  selectedTaskId,
  activeTask,
  index,
  isCompleted,
  taskTitle,
  handleTaskClick,
  handleTaskRename,
  handleTaskCompletedStateChange,
  scopeCode,
}) => (
  <Draggable draggableId={taskId} index={index}>
    {(provided, snapshot) => (
      <Task
        taskRef={provided.innerRef}
        taskId={taskId}
        sectionId={sectionId}
        scopeCode={scopeCode}
        isSelected={taskId === selectedTaskId}
        isCompleted={isCompleted}
        isActive={activeTask.taskId === taskId}
        isInBreak={activeTask.taskId === taskId && activeTask.inBreak}
        isDragging={snapshot.isDragging}
        handleTaskClick={handleTaskClick}
        handleTaskRename={handleTaskRename}
        handleTaskCompletedStateChange={handleTaskCompletedStateChange}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {taskTitle}
      </Task>
    )}
  </Draggable>
);

DraggableTask.defaultProps = {
  scopeCode: null,
};

DraggableTask.propTypes = {
  index: PropTypes.number.isRequired,
  sectionId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  scopeCode: PropTypes.string,
  selectedTaskId: PropTypes.string.isRequired,
  activeTask: PropTypes.shape({
    taskId: PropTypes.string.isRequired,
    inBreak: PropTypes.bool.isRequired,
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
  taskTitle: PropTypes.string.isRequired,
  handleTaskClick: PropTypes.func.isRequired,
  handleTaskRename: PropTypes.func.isRequired,
  handleTaskCompletedStateChange: PropTypes.func.isRequired,
};

export default DraggableTask;
