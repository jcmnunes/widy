import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { logoutRequest } from '../auth/Logout/Logout.actions';
import { dayStateActions } from '../day/dayState/dayStateSlice';
import { DayRouteParams } from '../day/dayTypes';
import { isLoadingSelector as isLogoutLoadingSelector } from '../auth/Logout/Logout.selectors';

export const UserMenu = () => {
  const { dayId } = useParams<DayRouteParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogoutLoading = useSelector(isLogoutLoadingSelector);

  const showSchedule = () => {
    dispatch(dayStateActions.showSchedule());
  };

  return (
    <Menu
      placement="left"
      trigger={
        <Button
          leftIcon="user_circle"
          rightIcon="chev_down"
          variant="ghost"
          variantColor="neutral"
        />
      }
    >
      <MenuItem text="Schedule" leftIcon="calendar" onClick={showSchedule} />

      <MenuItem
        text="Settings"
        leftIcon="cog"
        onClick={() => history.push(`/settings/account${dayId ? `/${dayId}` : ''}`)}
      />

      <MenuItem
        text="Log out"
        leftIcon="logout"
        onClick={() => dispatch(logoutRequest())}
        isLoading={isLogoutLoading}
        closeOnAction={false}
      />
    </Menu>
  );
};
