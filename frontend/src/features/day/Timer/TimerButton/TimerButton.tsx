import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { IllustratedIcon } from '@binarycapsule/ui-capsules';
import { useTheme } from '@emotion/react';
import { useActiveTaskQuery } from '../../api/useActiveTaskQuery';
import { TaskDto } from '../../api/useDayQuery';
import { sidebarSliceActions } from '../../SideBar/SidebarSlice';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { DayRouteParams } from '../../dayTypes';

interface Props {
  task: TaskDto;
  sectionId: string;
  size?: number;
}

export const TimerButton: React.FC<Props> = ({ size, task, sectionId }) => {
  const theme = useTheme();

  const { dayId } = useParams<DayRouteParams>();

  const { status, data: activeTaskData } = useActiveTaskQuery();

  const { mutate: updateTask, isLoading } = useUpdateTaskMutation();

  const history = useHistory();

  const dispatch = useDispatch();

  if (status === 'loading' || !dayId) {
    return null;
  }

  if (!activeTaskData) {
    return null;
  }

  const isActive = task.id === activeTaskData.taskId;

  return (
    <IllustratedIcon
      icon={isActive ? 'stop' : 'play'}
      onClick={() => {
        // Debounce to prevent simultaneous requests
        if (isLoading) {
          return;
        }

        const payload = isActive
          ? {
              start: null,
              time: task.time + moment.utc().diff(task.start, 'seconds'),
            }
          : {
              start: moment.utc().toISOString(),
            };

        updateTask({
          taskId: task.id,
          body: {
            sectionId,
            dayId,
            payload,
          },
        });

        if (!isActive) {
          history.push(`/day/${dayId}/${sectionId}/${task.id}`);
          dispatch(sidebarSliceActions.openSidebar());
        }
      }}
      size={size}
      primaryColor={isActive ? theme.colors.yellow['400'] : theme.colors.neutral['200']}
      primaryColorHover={isActive ? theme.colors.yellow['500'] : theme.colors.neutral['300']}
      secondaryColor={isActive ? theme.colors.yellow['900'] : theme.colors.neutral['500']}
      secondaryColorHover={isActive ? theme.colors.yellow['900'] : theme.colors.neutral['600']}
    />
  );
};
