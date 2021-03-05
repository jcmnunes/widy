import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DaysNav } from '../daysNav/DaysNav';
import { StyledDay } from './Day.styles';
import { useDays } from '../daysNav/hooks/useDays';
import { Board } from './Board/Board';
import { SideBar } from './SideBar/SideBar';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { ActiveTaskPopup } from './ActiveTaskPopup/ActiveTaskPopup';
import { activeTaskActions } from './activeTask/activeTaskSlice';
import { useActiveTaskQuery } from './api/useActiveTaskQuery';
import { dayStateActions } from './dayState/dayStateSlice';
import { DayRouteParams } from './dayTypes';

let timer: number | undefined;

interface Props {}

export const Day: React.FC<Props> = () => {
  const { dayId, sectionId: selectedSectionId } = useParams<DayRouteParams>();

  const history = useHistory();

  const dispatch = useDispatch();

  const { data: days } = useDays();

  const { data: activeTaskData } = useActiveTaskQuery();

  const activeTaskId = activeTaskData ? activeTaskData.taskId : null;

  useEffect(() => {
    if (!dayId && days && days.length > 0) {
      history.replace(`/day/${days[0].id}`);
    }
  }, [dayId, days, history]);

  useEffect(() => {
    if (selectedSectionId === 'schedule') {
      dispatch(dayStateActions.showSchedule());
    }
  }, [selectedSectionId, dispatch]);

  // Start active task ticking
  useEffect(() => {
    // Active task id changed. Clear the timer if it exists
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    // If there is an active task ➜ start ticking
    if (activeTaskId) {
      timer = window.setInterval(() => dispatch(activeTaskActions.activeTaskTick()), 1000);
    }
    return () => clearInterval(timer);
  }, [activeTaskId, dispatch]);

  return (
    <StyledDay>
      <StatusBar status={activeTaskId ? 'working' : undefined} />

      <DaysNav />

      <Board dayId={dayId} />

      <SideBar />

      <ActiveTaskPopup />
    </StyledDay>
  );
};
