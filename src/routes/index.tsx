import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import ResetPassword from '../pages/ResetPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={SignIn} path="/" exact />
      <Route component={SignUp} path="/signup" />
      <Route component={ForgotPassword} path="/forgot_password" />
      <Route component={ResetPassword} path="/reset_password" />

      <Route component={Dashboard} path="/dashboard" isPrivate />
      <Route component={Profile} path="/profile" isPrivate />
    </Switch>
  );
};

export default Routes;
