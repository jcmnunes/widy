import React from 'react';
import { Dialog, DialogAction } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
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
  const { taskId: selectedTaskId } = useParams();
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
      message="Are you sure you want to schedule this task?"
    />
  );
};
