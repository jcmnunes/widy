import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { IconButton, theme } from '@binarycapsule/ui-capsules';
import { useActiveTask } from '../../api/useActiveTask';
import { TaskDto } from '../../api/useDay';
import { sidebarSliceActions } from '../../SideBar/SidebarSlice';
import { useUpdateTask } from '../../api/useUpdateTask';

export const colors = {
  active: [theme.yellow400, theme.yellow900, theme.yellow500, theme.yellow900],
};

interface Props {
  task: TaskDto;
  sectionId: string;
  size?: string;
}

export const TimerButton: React.FC<Props> = ({ size, task, sectionId }) => {
  const { dayId } = useParams();
  const { status, data: activeTaskData } = useActiveTask();
  const [updateTask, { isLoading }] = useUpdateTask();
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
    <IconButton
      colors={isActive ? colors.active : undefined}
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
    />
  );
};
