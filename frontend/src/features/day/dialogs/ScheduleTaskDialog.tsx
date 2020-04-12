import React from 'react';
import { Dialog, DialogAction } from '@binarycapsule/ui-capsules';
import { ScheduleTaskVariables, useScheduleTask } from '../api/useScheduleTask';

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
  const [scheduleTask] = useScheduleTask();

  const scheduleTaskAction = () => {
    const scheduleTaskVariables: ScheduleTaskVariables = {
      taskId,
      body: { dayId, sectionId },
    };
    onRequestClose();

    return scheduleTask(scheduleTaskVariables);
  };

  const actions: DialogAction[] = [
    {
      name: 'Cancel',
      appearance: 'secondary',
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
      contentLabel="schedule-task-dialog"
      actions={actions}
      title="Schedule task?"
      message=" Are you sure you want to schedule this task?"
    />
  );
};
