import React from 'react';
import { Action, Dialog } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { ScheduleTaskVariables, useScheduleTaskMutation } from '../api/useScheduleTaskMutation';
import { DayRouteParams } from '../dayTypes';

interface Props {
  dayId: string;
  sectionId: string;
  taskId: string;
  onRequestClose(): void;
}

export const ScheduleTaskDialog: React.FC<Props> = ({
  dayId,
  sectionId,
  taskId,
  onRequestClose,
}) => {
  const { taskId: selectedTaskId } = useParams<DayRouteParams>();

  const history = useHistory();

  const { mutate: scheduleTask } = useScheduleTaskMutation();

  const scheduleTaskAction = () => {
    const scheduleTaskVariables: ScheduleTaskVariables = {
      taskId,
      body: { dayId, sectionId },
    };
    onRequestClose();

    if (selectedTaskId === taskId) {
      history.push(`/day/${dayId}`);
    }

    return scheduleTask(scheduleTaskVariables);
  };

  const actions: Action[] = [
    {
      text: 'Cancel',
      variant: 'neutral',
      onClick: onRequestClose,
    },
    {
      text: 'Schedule',
      variant: 'primary',
      onClick: scheduleTaskAction,
    },
  ];

  return (
    <Dialog
      isOpen
      onRequestClose={onRequestClose}
      contentLabel="Schedule task dialog"
      actions={actions}
      title="Schedule task?"
      message="Are you sure you want to schedule this task?"
    />
  );
};
