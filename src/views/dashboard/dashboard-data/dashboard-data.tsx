import React from 'react';
import { withRouter } from 'react-router';
import Dashboard from '../dashboard';
import DashboardCard from '../dashboard-card/dashboard-card';



const DashboardData = () => {
  return (
    <Dashboard isNavbar >
      <DashboardCard />
    </Dashboard>
  );
};

export default withRouter(DashboardData);
