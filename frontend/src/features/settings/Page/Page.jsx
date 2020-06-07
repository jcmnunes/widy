import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@binarycapsule/ui-capsules';
import Account from './Account/Account';
import ChangePassword from './ChangePassword/ChangePassword';
import Scopes from './Scopes/Scopes';
import { ActionsTop, MenuButton, StyledPage } from './Page.styles';
import { settingsSliceActions } from '../Settings.slice';

const Page = () => {
  const { dayId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const openMenu = useCallback(() => {
    dispatch(settingsSliceActions.openSettingsSidebar());
  }, [dispatch]);

  return (
    <StyledPage>
      <ActionsTop>
        <IconButton
          icon="logout"
          isRound
          onClick={() => history.push(`/day${dayId ? `/${dayId}` : ''}`)}
          text="Exit Settings"
        />
      </ActionsTop>
      <Switch>
        <Route path="/settings/account">
          <Account />
        </Route>
        <Route path="/settings/changePassword">
          <ChangePassword />
        </Route>
        <Route path="/settings/scopes">
          <Scopes />
        </Route>
      </Switch>

      <MenuButton>
        <Button appearance="minimal" iconBefore="menu" onClick={openMenu} />
      </MenuButton>
    </StyledPage>
  );
};

export default Page;