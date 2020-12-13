import React from 'react';
import { Dialog } from '@binarycapsule/ui-capsules';
import { DialogAction } from '@binarycapsule/ui-capsules/dist/Dialog/Dialog';
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
      appearance: 'neutral',
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
      contentLabel="Delete task dialog"
      actions={actions}
      title="Delete task?"
      message="Are you sure you want to delete this task?"
    />
  );
};
