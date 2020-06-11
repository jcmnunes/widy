import React, { FocusEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, ModalBody, ModalTitle, Select } from '@binarycapsule/ui-capsules';
import { suggestionsOptions, SuggestionOption } from './RegisterTimeModal.constants';
import {
  H3,
  Inputs,
  Label,
  StyledError,
  StyledInput,
  StyledModal,
  StyledModalFooter,
} from './RegisterTimeModal.styles';
import { useUpdateTask } from '../../api/useUpdateTask';

const validationSchema = Yup.object().shape({
  hours: Yup.number().min(0).max(24),
  minutes: Yup.number().min(0).max(1440),
});

interface Props {
  closeModal(): void;
}

export const RegisterTimeModal: React.FC<Props> = ({ closeModal }) => {
  const { taskId, sectionId, dayId } = useParams();
  const [suggestion, setSuggestion] = useState<SuggestionOption | null>(null);

  const [updateTask] = useUpdateTask();

  const formik = useFormik({
    initialValues: {
      hours: 0,
      minutes: 0,
    },
    validationSchema,
    onSubmit({ hours, minutes }) {
      if (!taskId || !sectionId || !dayId) return;

      const time = hours * 3600 + minutes * 60;

      updateTask({
        taskId,
        body: {
          sectionId,
          dayId,
          payload: {
            time,
          },
        },
      });

      closeModal();
    },
  });

  const handleBlur = (e: FocusEvent<HTMLInputElement>, field: string) => {
    const {
      target: { value },
    } = e;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      formik.setFieldValue(field, 0);
    }

    formik.handleBlur(e);
  };

  const handleSuggestionChange = (opt: SuggestionOption) => {
    const { h, min } = opt.value;
    formik.setFieldValue('hours', h);
    formik.setFieldValue('minutes', min);
    setSuggestion(opt);
  };

  useEffect(() => {
    setSuggestion(null);
  }, []);

  return (
    <StyledModal
      isOpen
      width="400px"
      onRequestClose={closeModal}
      contentLabel="Modal - Register task time"
    >
      <form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <ModalTitle>Insert new task time:</ModalTitle>
          <Inputs>
            <Label>
              <StyledInput
                value={formik.values.hours}
                type="number"
                name="hours"
                onChange={formik.handleChange}
                onBlur={e => handleBlur(e, 'hours')}
              />
              <span>h</span>
            </Label>
            <Label>
              <StyledInput
                value={formik.values.minutes}
                type="number"
                name="minutes"
                onChange={formik.handleChange}
                onBlur={e => handleBlur(e, 'minutes')}
              />
              <span>min</span>
            </Label>
          </Inputs>

          <StyledError>
            {formik.errors.hours && formik.touched.hours && <div>{formik.errors.hours}</div>}
            {formik.errors.minutes && formik.touched.minutes && <div>{formik.errors.minutes}</div>}
          </StyledError>

          <H3>Suggestions</H3>
          <Select
            onChange={opt => handleSuggestionChange(opt as SuggestionOption)}
            options={suggestionsOptions}
            value={suggestion}
          />
        </ModalBody>
        <StyledModalFooter>
          <Button appearance="secondary" size="large" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" size="large">
            Register time
          </Button>
        </StyledModalFooter>
      </form>
    </StyledModal>
  );
};
