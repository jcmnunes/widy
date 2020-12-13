import React from 'react';
import { Action, Dialog } from '@binarycapsule/ui-capsules';
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

  const actions: Action[] = [
    {
      text: 'Cancel',
      variant: 'neutral',
      onClick: onRequestClose,
    },
    {
      text: 'Delete',
      variant: 'error',
      onClick: deleteAction,
    },
  ];

  return (
    <Dialog
      isOpen
      onRequestClose={onRequestClose}
      contentLabel="Delete task dialog"
      actions={actions}
      title="Delete task?"
      message="Are you sure you want to delete this task?"
    />
  );
};
