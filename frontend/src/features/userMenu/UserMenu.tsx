import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { logoutRequest } from '../auth/Logout/Logout.actions';
import { dayStateActions } from '../day/dayState/dayStateSlice';
import { DayRouteParams } from '../day/dayTypes';

export const UserMenu = () => {
  const { dayId } = useParams<DayRouteParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  // const isLogoutLoading = useSelector(isLogoutLoadingSelector);

  const showSchedule = () => {
    dispatch(dayStateActions.showSchedule());
  };

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
        text="Schedule"
        leftAddon={<Icon icon="calendar" size="18px" />}
        onClick={showSchedule}
      />

      <MenuItem
        text="Settings"
        leftAddon={<Icon icon="cog" size="18px" />}
        onClick={() => history.push(`/settings/account${dayId ? `/${dayId}` : ''}`)}
      />

      <MenuItem
        text="Log out"
        leftAddon={<Icon icon="logout" size="18px" />}
        onClick={() => dispatch(logoutRequest())}
        closeOnAction={false}
      />
    </Menu>
  );
};
