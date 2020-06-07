import React from 'react';
import { PageDescription, PageTitle } from '../Page.styles';
import ChangePasswordForm from './ChangePasswordForm';
import { PageWrapper } from '../../Settings.styles';

const ChangePassword = () => (
  <PageWrapper>
    <PageTitle>Change Password</PageTitle>
    <PageDescription>Change your password below</PageDescription>
    <div>
      <ChangePasswordForm />
    </div>
  </PageWrapper>
);

export default ChangePassword;
