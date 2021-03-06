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
  Text,
} from '@binarycapsule/ui-capsules';
import { useCreateTaskMutation } from '../../api/useCreateTaskMutation';
import { useScopesOptions } from '../../api/useScopesQuery';
import { ScopeSelect } from '../../ScopeSelect/ScopeSelect';

interface ScopeOption {
  value: string;
  label: string;
  shortCode: string;
}

interface FormValues {
  title: string;
  scope: ScopeOption | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('You need to enter the task summary.'),
});

const initialValues: FormValues = {
  title: '',
  scope: null,
};

interface Props {
  dayId: string;
  sectionId: string;
  onRequestClose(): void;
}

export const AddTaskModal: React.FC<Props> = ({ dayId, sectionId, onRequestClose }) => {
  const scopesOptions = useScopesOptions();

  const { mutate: createTask } = useCreateTaskMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ title, scope }) => {
      onRequestClose();

      return createTask({
        dayId,
        sectionId,
        title,
        scope: scope ? { id: scope.value, name: scope.label, shortCode: scope.shortCode } : null,
      });
    },
  });

  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      contentLabel="Modal - Add a new task"
      shouldCloseOnEsc={false}
    >
      <ModalHeader>Add Task</ModalHeader>

      <ModalCloseButton onClick={onRequestClose} />

      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Text variant="label" mb="4">
            What will you be working on?
          </Text>

          <Input
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            size="large"
            autoFocus
            placeholder="Task summary"
            error={formik.errors.title}
          />

          <Text variant="label" mt="24" mb="4">
            Scope
          </Text>
          <ScopeSelect
            value={formik.values.scope}
            options={scopesOptions}
            onChange={opt => formik.setFieldValue('scope', opt)}
            isInsideModal
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" size="large" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button type="submit" size="large">
            Add Task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
