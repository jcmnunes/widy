import React from 'react';
import { useParams } from 'react-router';
import { Button, IllustratedIcon, Tooltip } from '@binarycapsule/ui-capsules';
import { TaskDto, useDay } from '../api/useDay';
import { useMoveTask } from '../api/useMoveTask';
import { useSchedule } from '../api/useSchedule';
import { DayRouteParams } from '../dayTypes';
import { useTheme } from '@emotion/react';

interface Props {
  isButton?: boolean;
  task: TaskDto;
}

export const AddToPlan: React.FC<Props> = ({ isButton, task }) => {
  const theme = useTheme();

  const { dayId } = useParams<DayRouteParams>();

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
        <Button variant="ghost" variantColor="neutral" leftIcon="plus_c" onClick={moveToPlan}>
          Add to Plan
        </Button>
      ) : (
        <IllustratedIcon
          icon="circle_add"
          onClick={moveToPlan}
          primaryColor={theme.colors.neutral['200']}
          secondaryColor={theme.colors.neutral['400']}
          primaryColorHover="#CFBCF2"
          secondaryColorHover="#653CAD"
        />
      )}
    </Tooltip>
  );
};
