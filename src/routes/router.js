import React from 'react';
import { Switch } from 'react-router-dom';
import Authorize from './Authorize';
import Dashboard from './Dashboard';
import GlobalWrapper from './GlobalWrapper';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

export default () => {
  return (
    <GlobalWrapper>
      <Switch>
        <GuestRoute exact path="/" component={Authorize} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </GlobalWrapper>
  );
};
