import React from 'react';
import { EditableInput } from '@binarycapsule/ui-capsules';
import { useUpdateTask } from '../api/useUpdateTask';

interface Props {
  taskId: string;
  sectionId: string;
  dayId: string;
  taskTitle: string;
}

export const EditableTaskTitle: React.FC<Props> = ({ taskId, sectionId, dayId, taskTitle }) => {
  const [updateTask] = useUpdateTask();

  const handleInputChange = (title: string) => {
    updateTask({
      taskId,
      body: {
        sectionId,
        dayId,
        payload: { title },
      },
    });
  };

  return (
    <div style={{ marginLeft: -14 }}>
      <EditableInput size="large" value={taskTitle} action={handleInputChange} />
    </div>
  );
};
