import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { IconButton, theme } from '@binarycapsule/ui-capsules';

const StyledIconButton = styled(IconButton)`
  svg {
    width: ${({ size }) => size} !important;
  }
`;

const Timer = ({
  taskId,
  taskTitle,
  taskTime,
  sectionId,
  activeTask,
  startTask,
  stopTask,
  size,
}) => {
  const handleClick = () => {
    if (activeTask.taskId === taskId) {
      stopTask(taskId, sectionId);
    } else {
      startTask(taskId, taskTitle, taskTime, sectionId);
    }
  };

  const renderColors = () => {
    if (activeTask.taskId === taskId) {
      if (activeTask.inBreak) {
        return [theme.blue100, theme.blue700, theme.blue200, theme.blue800];
      }
      return [theme.yellow400, theme.yellow900, theme.yellow500, theme.yellow900];
    }
    return undefined;
  };

  return (
    <StyledIconButton
      colors={renderColors()}
      icon={activeTask.taskId === taskId ? 'stop' : 'play'}
      onClick={handleClick}
      size={size}
    />
  );
};

Timer.defaultProps = {
  size: undefined,
};

Timer.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  taskTime: PropTypes.number.isRequired,
  sectionId: PropTypes.string.isRequired,
  activeTask: PropTypes.shape({
    taskId: PropTypes.string.isRequired,
    inBreak: PropTypes.bool.isRequired,
  }).isRequired,
  startTask: PropTypes.func.isRequired,
  stopTask: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default Timer;
