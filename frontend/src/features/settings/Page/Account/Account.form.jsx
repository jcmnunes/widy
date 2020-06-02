import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@binarycapsule/ui-capsules';
import { Actions, StyledForm, StyledLabel } from '../Page.styles';
import { saveAccountSettings } from './Account.actions';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('"First Name" is required'),
  lastName: Yup.string().required('"Last Name" is required'),
});

const AccountForm = ({ account: { firstName, lastName, email } }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      dispatch(saveAccountSettings(values, formik.initialValues, { resetForm, setSubmitting }));
    },
  });

  const isSavingAccount = formik.isSubmitting;

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledLabel>
        First Name
        <Input
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="First name"
          inputSize="large"
          value={formik.values.firstName}
          error={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : ''}
        />
      </StyledLabel>
      <StyledLabel>
        Last Name
        <Input
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Last name"
          inputSize="large"
          value={formik.values.lastName}
          error={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : ''}
        />
      </StyledLabel>
      <StyledLabel>
        Email
        <Input inputSize="large" value={email} isDisabled />
      </StyledLabel>
      <Actions>
        {formik.dirty && (
          <Button size="large" onClick={formik.handleReset} disabled={isSavingAccount}>
            Reset
          </Button>
        )}
        <Button
          type="submit"
          appearance="primary"
          size="large"
          isLoading={isSavingAccount}
          disabled={!formik.dirty || isSavingAccount}
        >
          Save Changes
        </Button>
      </Actions>
    </StyledForm>
  );
};

AccountForm.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountForm;
