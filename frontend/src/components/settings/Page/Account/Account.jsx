import React from 'react';
import { useSelector } from 'react-redux';
import { PageDescription, PageTitle } from '../Page.styles';
import AccountForm from './Account.form';
import { accountInformationSelector } from '../../../auth/Init/init.selectors';

const Account = () => {
  const account = useSelector(accountInformationSelector);

  return (
    <div>
      <PageTitle>Account</PageTitle>
      <PageDescription>Change your account information</PageDescription>
      <div>
        <AccountForm account={account} />
      </div>
    </div>
  );
};

export default Account;
