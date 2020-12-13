import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import { Day } from '../features/day/Day';
import Settings from '../features/settings/Settings';
import Report from '../features/report/Report';
import Forgot from '../features/auth/Forgot/Forgot.container';
import Reset from '../features/auth/Reset/Reset.container';
import LoginCard from '../features/auth/LoginCard/LoginCard.component';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={() => <Redirect to="/day" />} />
    <PrivateRoute exact path="/day/:dayId?/:sectionId?/:taskId?" component={Day} />
    <PrivateRoute exact path="/settings/:pageId/:dayId?" component={Settings} />
    <PrivateRoute exact path="/report/:dayId" component={Report} />
    <AuthRoute exact path="/login" component={LoginCard} />
    <AuthRoute exact path="/forgot" component={Forgot} />
    <AuthRoute path="/reset/:token" component={Reset} />
    <Route component={() => <Redirect to="/day" />} />
  </Switch>
);

export default Routes;
