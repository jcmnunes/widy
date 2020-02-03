import React from 'react';
import { PageDescription, PageTitle } from '../Page.styles';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePassword = () => (
  <div>
    <PageTitle>Change Password</PageTitle>
    <PageDescription>Change your password below</PageDescription>
    <div>
      <ChangePasswordForm />
    </div>
  </div>
);

export default ChangePassword;
