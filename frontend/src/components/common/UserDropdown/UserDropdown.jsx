import React from 'react';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutRequest } from '../../auth/Logout/Logout.actions';
import { isLoadingSelector as isLogoutLoadingSelector } from '../../auth/Logout/Logout.selectors';

const UserDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogoutLoading = useSelector(isLogoutLoadingSelector);

  return (
    <Dropdown
      placement="right"
      trigger={<IconButton hasBackground hasChev icon="USER_CIRCLE" isRound />}
    >
      <DropdownItem
        text="Settings"
        icon="SETTINGS"
        handleAction={() => history.push('/settings/account')}
      />
      <DropdownItem
        text="Log out"
        icon="LOGOUT"
        handleAction={() => dispatch(logoutRequest())}
        isLoading={isLogoutLoading}
        closeOnAction={false}
      />
    </Dropdown>
  );
};

export default UserDropdown;
