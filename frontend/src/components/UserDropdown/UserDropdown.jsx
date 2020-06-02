import React from 'react';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutRequest } from '../../features/auth/Logout/Logout.actions';
import { isLoadingSelector as isLogoutLoadingSelector } from '../../features/auth/Logout/Logout.selectors';

const UserDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogoutLoading = useSelector(isLogoutLoadingSelector);

  return (
    <Dropdown
      placement="right"
      trigger={<IconButton hasBackground hasChev icon="user_circle" isRound />}
    >
      <DropdownItem
        text="Settings"
        icon="settings"
        handleAction={() => history.push('/settings/account')}
      />
      <DropdownItem
        text="Log out"
        icon="logout"
        handleAction={() => dispatch(logoutRequest())}
        isLoading={isLogoutLoading}
        closeOnAction={false}
      />
    </Dropdown>
  );
};

export default UserDropdown;
