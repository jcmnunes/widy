import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Checkbox, Tooltip, IconButton, theme } from '@binarycapsule/ui-capsules';
import { Heading2 } from '../../common/Typography';
import { getCurrentPomodoroInfo } from '../../../helpers/pomodoro';
import { Header, StyledPopup, Time, Units } from './ActiveTaskPopup.styles';
import { StyledTask, TaskTitle } from '../Board/Task/Task.styles';
import { pomodoroSettingsSelector } from '../../../selectors/settings/settingsSelectors';

const ActiveTaskPopup = ({
  activeTask,
  selectedDayId,
  storeSelectedDay,
  getDay,
  stopTask,
  updateTask,
}) => {
  const pomodoro = useSelector(pomodoroSettingsSelector);

  const renderTime = () => {
    const { time, start } = activeTask;
    const newTime = time + moment().diff(start, 'seconds');
    const { inBreak, elapsedTime } = getCurrentPomodoroInfo(newTime, pomodoro);
    if (inBreak) return `${elapsedTime} / ${pomodoro.shortBreak}`;
    return `${elapsedTime} / ${pomodoro.pomodoroLength}`;
  };

  const handleStopButtonClick = e => {
    e.stopPropagation();
    stopTask();
  };

  const handleTaskClick = () => {
    const { dayId } = activeTask;
    storeSelectedDay(dayId);
    getDay(dayId);
  };

  const handleCheckClick = e => e.stopPropagation();

  const handleCheckChange = () => {
    const { taskId, sectionId, dayId } = activeTask;
    stopTask();
    updateTask(taskId, { completed: true, start: null }, { sectionId, dayId });
  };

  const getStopButtonColors = () => {
    if (activeTask.inBreak) {
      return [theme.blue100, theme.blue700, theme.blue200, theme.blue800];
    }
    return [theme.yellow400, theme.yellow900, theme.yellow500, theme.yellow900];
  };

  return selectedDayId && activeTask.dayId && selectedDayId !== activeTask.dayId ? (
    <StyledPopup data-test="active-task-popup">
      <Header>
        <Heading2>Working on:</Heading2>
        <Time>
          {renderTime()} <Units>min</Units>
        </Time>
      </Header>
      <StyledTask
        isActive
        isSelected
        isCompleted={false}
        isInBreak={activeTask.inBreak}
        onClick={handleTaskClick}
      >
        <Tooltip placement="top" tooltip="Complete the task">
          <Checkbox
            inputSize="large"
            checked={false}
            onChange={handleCheckChange}
            onClick={handleCheckClick}
            style={{ display: 'block' }}
          />
        </Tooltip>
        <TaskTitle>{activeTask.title}</TaskTitle>
        <Tooltip placement="top" tooltip="Stop the task">
          <IconButton icon="stop" colors={getStopButtonColors()} onClick={handleStopButtonClick} />
        </Tooltip>
      </StyledTask>
    </StyledPopup>
  ) : null;
};

ActiveTaskPopup.defaultProps = {
  selectedDayId: null,
};

ActiveTaskPopup.propTypes = {
  activeTask: PropTypes.shape({
    taskId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired,
    dayId: PropTypes.string.isRequired,
    inBreak: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    start: PropTypes.string,
  }).isRequired,
  selectedDayId: PropTypes.string,
  storeSelectedDay: PropTypes.func.isRequired,
  getDay: PropTypes.func.isRequired,
  stopTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default ActiveTaskPopup;
