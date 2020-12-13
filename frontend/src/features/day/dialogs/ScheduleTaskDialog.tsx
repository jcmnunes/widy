import React from 'react';
import { Dialog } from '@binarycapsule/ui-capsules';
import { DialogAction } from '@binarycapsule/ui-capsules/dist/Dialog/Dialog';
import { useHistory, useParams } from 'react-router';
import { ScheduleTaskVariables, useScheduleTask } from '../api/useScheduleTask';
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

  const [scheduleTask] = useScheduleTask();

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

  const actions: DialogAction[] = [
    {
      name: 'Cancel',
      appearance: 'neutral',
      action: onRequestClose,
    },
    {
      name: 'Schedule',
      appearance: 'primary',
      action: scheduleTaskAction,
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
