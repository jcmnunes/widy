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
import { FormHeading, Section } from '../../../../components/modals/AddTask/AddTask.styles';
import { useCreateTask } from '../../api/useCreateTask';
import { useScopesOptions } from '../../api/useScopes';
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
  title: Yup.string().required('You need to enter the task name.'),
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

  const [createTask] = useCreateTask();

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
    <Modal isOpen onRequestClose={onRequestClose} contentLabel="Modal - Add a new task">
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Section>
            <ModalTitle>What will you be working on?</ModalTitle>
            <Input
              name="title"
              type="text"
              value={formik.values.title}
              placeholder="Task name"
              onChange={formik.handleChange}
              inputSize="large"
              autoFocus
              error={formik.errors.title}
            />
          </Section>

          <FormHeading>Task scope</FormHeading>
          <ScopeSelect
            value={formik.values.scope}
            options={scopesOptions}
            onChange={opt => formik.setFieldValue('scope', opt)}
            isInsideModal
          />
        </ModalBody>
        <ModalFooter>
          <Button appearance="secondary" size="large" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={false} appearance="primary" size="large">
            Add task
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
