import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';

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
  const { mutate: updateTask } = useUpdateTaskMutation();

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
      <ModalHeader>Rename the task</ModalHeader>

      <ModalCloseButton onClick={onRequestClose} />

      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            size="large"
            autoFocus
            error={formik.errors.title}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" size="large" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button type="submit" size="large">
            Rename task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
