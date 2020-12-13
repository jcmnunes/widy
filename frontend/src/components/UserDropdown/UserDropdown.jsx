import React from 'react';
import { Button, Icon, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutRequest } from '../../features/auth/Logout/Logout.actions';

const UserDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // const isLogoutLoading = useSelector(isLogoutLoadingSelector);

  return (
    <Menu
      placement="right"
      trigger={
        <Button
          leftIcon="user_circle"
          rightIcon="chev_down"
          variant="ghost"
          variantColor="neutral"
        />
      }
    >
      <MenuItem
        text="Settings"
        leftAddon={<Icon icon="adjustments" size="18px" />}
        onClick={() => history.push('/settings/account')}
      />
      <MenuItem
        text="Log out"
        leftAddon={<Icon icon="login" size="18px" />}
        onClick={() => dispatch(logoutRequest())}
        closeOnAction={false}
      />
    </Menu>
  );
};

export default UserDropdown;
