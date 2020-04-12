import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import { Day as DayNew } from '../features/day/Day';
import Settings from '../components/settings/Settings';
import Report from '../components/report/Report';
import Forgot from '../components/auth/Forgot/Forgot.container';
import Reset from '../components/auth/Reset/Reset.container';
import LoginCard from '../components/auth/LoginCard/LoginCard.component';
import RedirectRoot from './RedirectRoot';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={RedirectRoot} />
    <PrivateRoute exact path="/day/:dayId?/:sectionId?/:taskId?" component={DayNew} />
    <PrivateRoute exact path="/settings/:pageId" component={Settings} />
    <PrivateRoute exact path="/report/:dayId" component={Report} />
    <AuthRoute exact path="/login" component={LoginCard} />
    <AuthRoute exact path="/forgot" component={Forgot} />
    <AuthRoute path="/reset/:token" component={Reset} />
    <Route component={RedirectRoot} />
  </Switch>
);

export default Routes;
