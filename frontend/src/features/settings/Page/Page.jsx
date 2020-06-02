import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { IconButton } from '@binarycapsule/ui-capsules';
import Account from './Account/Account';
import ChangePassword from './ChangePassword/ChangePassword';
import Scopes from './Scopes/Scopes';
import { ActionsTop, StyledPage } from './Page.styles';

const Page = () => {
  const { dayId } = useParams();
  const history = useHistory();

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
    </StyledPage>
  );
};

export default Page;
