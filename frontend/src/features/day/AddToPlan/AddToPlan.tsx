import React from 'react';
import { useParams } from 'react-router';
import { Button, IconButton, theme, Tooltip } from '@binarycapsule/ui-capsules';
import { TaskDto, useDay } from '../api/useDay';
import { useMoveTask } from '../api/useMoveTask';
import { useSchedule } from '../api/useSchedule';

const colors = [theme.neutral200, theme.neutral400, '#CFBCF2', '#653CAD'];

interface Props {
  isButton?: boolean;
  task: TaskDto;
}

export const AddToPlan: React.FC<Props> = ({ isButton, task }) => {
  const { dayId } = useParams();
  const { data: day } = useDay(dayId);
  const [moveTask] = useMoveTask();
  const { data: schedule } = useSchedule();

  if (!schedule) return null;

  const taskIndex = schedule.tasks.findIndex(({ id }) => id === task.id);

  const moveToPlan = () => {
    if (day) {
      const toSectionId = day.sections.find(({ isPlan }) => isPlan)?.id;

      if (!toSectionId) return;

      moveTask({
        taskId: task.id,
        body: {
          dayId,
          fromIndex: taskIndex,
          fromSectionId: 'schedule',
          toSectionId,
          toIndex: null,
        },
      });
    }
  };

  return (
    <Tooltip tooltip="Add task to Plan" delayShow={1000}>
      {isButton ? (
        <Button appearance="minimal" iconBefore="plus_c" onClick={moveToPlan}>
          Add to Plan
        </Button>
      ) : (
        <IconButton colors={colors} icon="circle_add" onClick={moveToPlan} />
      )}
    </Tooltip>
  );
};
