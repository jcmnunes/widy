import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components/macro';
import MainBar from '../MainBar';
import Navigation from '../Navigation';
import Board from '../Board/Board/Board.container';
import Sidebar from '../Sidebar';
import ActiveTaskPopup from '../ActiveTaskPopup/ActiveTaskPopup.container';
import { getCurrentPomodoroInfo } from '../../../helpers/pomodoro';
import { pomodoroSettingsSelector } from '../../../selectors/settings/settingsSelectors';

const StyledDay = styled.div`
  display: grid;
  grid-template-columns: 15px 105px 3fr 2fr;
  height: 100vh;
  transition: all 0.3s ease;
  min-width: ${props => props.theme.bp_xlarge};

  @media (min-width: ${props => props.theme.bp_xlarge}) {
    grid-template-columns: 15px 254px 1fr 1fr;
  }
`;

let timer = null;

const Day = ({
  activeTaskId,
  activeTaskTime,
  activeTaskStart,
  activeTaskTitle,
  updateActiveTask,
}) => {
  const pomodoro = useSelector(pomodoroSettingsSelector);

  const renderDocTitle = (inBreak, elapsedTime) => {
    if (!activeTaskId) {
      document.title = 'WIDY';
      return;
    }
    let renderedTime;
    let symbol;
    renderedTime = `${elapsedTime} / ${pomodoro.pomodoroLength}`;
    symbol = '🔶';
    if (inBreak) {
      renderedTime = `${elapsedTime} / ${pomodoro.shortBreak}`;
      symbol = '🔷';
    }
    document.title = `${symbol} ${renderedTime} min • ${activeTaskTitle}`;
  };

  const updateTaskState = () => {
    const time = activeTaskTime + moment().diff(activeTaskStart, 'seconds');
    const { inBreak, elapsedTime } = getCurrentPomodoroInfo(time, pomodoro);
    renderDocTitle(inBreak, elapsedTime);
    updateActiveTask({ inBreak }); // TODO ➜ Dispatch only when inBreak changes
  };

  updateTaskState(); // TODO ➜ This issues a warning

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (activeTaskId) {
      timer = setInterval(updateTaskState, 1000);
    }
    return () => clearInterval(timer);
    // TODO ➜ Fix linter warning below
  }, [activeTaskId, activeTaskTime, activeTaskStart]); // eslint-disable-line

  return (
    <StyledDay>
      <MainBar />
      <Navigation />
      <Board />
      <Sidebar />
      <ActiveTaskPopup />
    </StyledDay>
  );
};

Day.defaultProps = {
  activeTaskStart: null,
};

Day.propTypes = {
  activeTaskId: PropTypes.string.isRequired,
  activeTaskTime: PropTypes.number.isRequired,
  activeTaskTitle: PropTypes.string.isRequired,
  activeTaskStart: PropTypes.string,
  updateActiveTask: PropTypes.func.isRequired,
};

export default Day;
