import React from 'react';
import styled from 'styled-components/macro';
import { Route, Switch, useHistory } from 'react-router';
import { IconButton } from '@binarycapsule/ui-capsules';
import Account from './Account/Account';
import ChangePassword from './ChangePassword/ChangePassword';
import Scopes from './Scopes/Scopes';

const StyledPage = styled.div`
  flex: 1;
  padding: 48px 32px;
  overflow-y: auto;
  position: relative;
`;

const ActionsTop = styled.div`
  position: absolute;
  top: 48px;
  right: 32px;
`;

const Page = () => {
  const history = useHistory();

  return (
    <StyledPage>
      <ActionsTop>
        <IconButton
          icon="logout"
          isRound
          onClick={() => history.push('/day')}
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
