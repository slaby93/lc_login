import React from 'react';
import { connect } from 'react-redux';
import { USERS_LOGOUT } from 'ducks/user';
import Dashboard from './Dashboard';

export const DashboardContainer = ({ onLogout }) => {
  return (
    <Dashboard
      onLogout={onLogout}
    />
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(USERS_LOGOUT());
    },
  };
}

export default connect(null, mapDispatchToProps)(DashboardContainer);
