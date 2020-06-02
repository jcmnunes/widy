import React from 'react';
import { Dialog, DialogAction } from '@binarycapsule/ui-capsules';
import { useDeleteTask } from '../api/useDeleteTask';

interface Props {
  dayId: string;
  sectionId: string;
  taskId: string;
  onRequestClose(): void;
}

export const DeleteTaskDialog: React.FC<Props> = ({ dayId, sectionId, taskId, onRequestClose }) => {
  const [deleteTask] = useDeleteTask();

  const deleteAction = () => {
    deleteTask({
      taskId,
      body: { dayId, sectionId },
    });

    onRequestClose();
  };

  const actions: DialogAction[] = [
    {
      name: 'Cancel',
      appearance: 'secondary',
      action: onRequestClose,
    },
    {
      name: 'Delete',
      appearance: 'error',
      action: deleteAction,
    },
  ];

  return (
    <Dialog
      isOpen
      onRequestClose={onRequestClose}
      contentLabel="Example dialog"
      actions={actions}
      title="Delete task?"
      message="Are you sure you want to delete this task?"
    />
  );
};
