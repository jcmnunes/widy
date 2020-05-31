import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import { isLoadingSelector as isLogoutLoadingSelector } from '../auth/Logout/Logout.selectors';
import { logoutRequest } from '../auth/Logout/Logout.actions';

export const UserMenu = () => {
  const { dayId } = useParams();
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
        handleAction={() => history.push(`/settings/account${dayId ? `/${dayId}` : ''}`)}
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
