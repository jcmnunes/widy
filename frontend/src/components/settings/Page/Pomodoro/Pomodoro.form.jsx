import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@binarycapsule/ui-capsules';
import { savePomodoroSettings } from './Pomodoro.actions';
import { Actions, StyledForm, StyledLabel } from '../Page.styles';

const validationSchema = Yup.object().shape({
  pomodoroLength: Yup.number()
    .typeError('"Pomodoro length" must be a number')
    .integer('Must be an integer number')
    .positive('Must be a positive number')
    .required('This field is required'),
  shortBreak: Yup.number()
    .typeError('"Short break" must be a number')
    .integer('Must be an integer number')
    .positive('Must be a positive number')
    .required('This field is required'),
  longBreak: Yup.number()
    .typeError('"Long break" must be a number')
    .integer('Must be an integer number')
    .positive('Must be a positive number')
    .required('This field is required'),
  longBreakAfter: Yup.number()
    .typeError('"Long break after" must be a number')
    .integer('Must be an integer number')
    .positive('Must be a positive number')
    .required('This field is required'),
});

const PomodoroForm = ({
  pomodoroSettings: { pomodoroLength, shortBreak, longBreak, longBreakAfter },
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      pomodoroLength,
      shortBreak,
      longBreak,
      longBreakAfter,
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      dispatch(savePomodoroSettings(values, formik.initialValues, { resetForm, setSubmitting }));
    },
  });

  const isSavingPomodoroSettings = formik.isSubmitting;

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledLabel>
        Length (mins)
        <Input
          id="pomodoroLength"
          name="pomodoroLength"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Pomodoro length"
          inputSize="large"
          value={formik.values.pomodoroLength}
          error={
            formik.errors.pomodoroLength && formik.touched.pomodoroLength
              ? formik.errors.pomodoroLength
              : ''
          }
        />
      </StyledLabel>
      <StyledLabel>
        Short break (mins)
        <Input
          id="shortBreak"
          name="shortBreak"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Short break"
          inputSize="large"
          value={formik.values.shortBreak}
          error={
            formik.errors.shortBreak && formik.touched.shortBreak ? formik.errors.shortBreak : ''
          }
        />
      </StyledLabel>
      <StyledLabel>
        Long break (mins)
        <Input
          id="longBreak"
          name="longBreak"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Long break"
          inputSize="large"
          value={formik.values.longBreak}
          error={formik.errors.longBreak && formik.touched.longBreak ? formik.errors.longBreak : ''}
        />
      </StyledLabel>
      <StyledLabel>
        Long break after (pomodoros)
        <Input
          id="longBreakAfter"
          name="longBreakAfter"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Long break"
          inputSize="large"
          value={formik.values.longBreakAfter}
          error={
            formik.errors.longBreakAfter && formik.touched.longBreakAfter
              ? formik.errors.longBreakAfter
              : ''
          }
        />
      </StyledLabel>
      <Actions>
        {formik.dirty && (
          <Button size="large" onClick={formik.handleReset}>
            Reset
          </Button>
        )}
        <Button
          type="submit"
          appearance="primary"
          size="large"
          isLoading={isSavingPomodoroSettings}
          disabled={!formik.dirty || isSavingPomodoroSettings}
        >
          Save Changes
        </Button>
      </Actions>
    </StyledForm>
  );
};

PomodoroForm.propTypes = {
  pomodoroSettings: PropTypes.shape({
    pomodoroLength: PropTypes.number.isRequired,
    shortBreak: PropTypes.number.isRequired,
    longBreak: PropTypes.number.isRequired,
    longBreakAfter: PropTypes.number.isRequired,
  }).isRequired,
};

export default PomodoroForm;
