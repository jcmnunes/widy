import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDay';
import { useUpdateTask } from '../../api/useUpdateTask';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('You need to enter the new task name.'),
});

interface FormValues {
  title: string;
}

interface Props {
  dayId: string;
  sectionId: string;
  task: TaskDto;
  onRequestClose(): void;
}

export const RenameTaskModal: React.FC<Props> = ({ dayId, sectionId, task, onRequestClose }) => {
  const initialValues: FormValues = {
    title: task.title,
  };
  const [updateTask] = useUpdateTask();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ title }) => {
      updateTask({
        taskId: task.id,
        body: {
          dayId,
          sectionId,
          payload: { title },
        },
      });

      onRequestClose();
    },
  });

  return (
    <Modal isOpen onRequestClose={onRequestClose} contentLabel="Modal - Rename a task">
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <ModalTitle>Rename the task</ModalTitle>
          <Input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            inputSize="large"
            autoFocus
            error={formik.errors.title}
          />
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Rename task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
