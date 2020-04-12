import React from 'react';
import { IconButton, theme } from '@binarycapsule/ui-capsules';
import { useParams } from 'react-router';
import { useActiveTask } from '../../api/useActiveTask';
import { TaskDto } from '../../api/useDay';
import { useToggleActiveTask } from '../../api/useToggleActiveTask';

const colors = {
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
  const toggleActiveTask = useToggleActiveTask();

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
      onClick={() => toggleActiveTask({ dayId, sectionId, task })}
      size={size}
    />
  );
};
