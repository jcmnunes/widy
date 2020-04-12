import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@binarycapsule/ui-capsules';
import { Actions, StyledForm, StyledLabel } from '../Page.styles';
import { changePassword } from './ChangePassword.actions';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter your current password'),
  password: Yup.string().required('Please enter your new password'),
  confirm: Yup.string()
    .required('Please confirm your new password')
    // eslint-disable-next-line func-names
    .test('dontMatch', 'Password do not match', function (value) {
      return this.parent.password === value;
    }),
});

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirm: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      dispatch(changePassword(values, formik.initialValues, { resetForm, setSubmitting }));
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledLabel>
        Current password
        <Input
          id="oldPassword"
          type="password"
          name="oldPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your current password"
          inputSize="large"
          value={formik.values.oldPassword}
          error={
            formik.errors.oldPassword && formik.touched.oldPassword ? formik.errors.oldPassword : ''
          }
        />
      </StyledLabel>
      <StyledLabel>
        New password
        <Input
          id="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter a new password"
          inputSize="large"
          value={formik.values.password}
          error={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
        />
      </StyledLabel>
      <StyledLabel>
        Repeat new password
        <Input
          id="confirm"
          type="password"
          name="confirm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm your new password"
          inputSize="large"
          value={formik.values.confirm}
          error={formik.errors.confirm && formik.touched.confirm ? formik.errors.confirm : ''}
        />
      </StyledLabel>
      <Actions>
        <Button type="submit" appearance="primary" size="large" isLoading={formik.isSubmitting}>
          Change Password
        </Button>
      </Actions>
    </StyledForm>
  );
};

export default ChangePasswordForm;
