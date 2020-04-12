import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@binarycapsule/ui-capsules';
import Timer from '../../Timer';
import TaskMenu from '../TaskMenu/TaskMenu.container';
import ScopeCode from '../../../common/ScopeCode/ScopeCode';
import { Control, Controls, StyledTask, TaskTitle } from './Task.styles';

const Task = ({
  taskRef,
  taskId,
  sectionId,
  isSelected,
  isActive,
  isInBreak,
  isCompleted,
  isDragging,
  handleTaskClick,
  handleTaskRename,
  handleTaskCompletedStateChange,
  children,
  scopeCode,
  ...other
}) => (
  <StyledTask
    ref={taskRef}
    isSelected={isSelected}
    isActive={isActive}
    isInBreak={isInBreak}
    isCompleted={isCompleted}
    isDragging={isDragging}
    onClick={() => handleTaskClick(taskId, sectionId)}
    {...other}
  >
    <Checkbox
      inputSize="large"
      checked={isCompleted}
      onChange={() => handleTaskCompletedStateChange(isActive, isCompleted, taskId, sectionId)}
    />
    <TaskTitle onDoubleClick={() => handleTaskRename()}>{children}</TaskTitle>
    <ScopeCode scopeCode={scopeCode} style={{ lineHeight: '23px' }} />
    {!isCompleted && (
      <Controls>
        <Timer taskId={taskId} sectionId={sectionId} />
        <Control>
          <TaskMenu taskId={taskId} sectionId={sectionId} />
        </Control>
      </Controls>
    )}
  </StyledTask>
);

Task.defaultProps = {
  taskRef: null,
};

Task.propTypes = {
  taskRef: PropTypes.func,
  taskId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  scopeCode: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isInBreak: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleTaskClick: PropTypes.func.isRequired,
  handleTaskRename: PropTypes.func.isRequired,
  handleTaskCompletedStateChange: PropTypes.func.isRequired,
};

export default Task;
