import React from 'react';
import { withRouter } from 'react-router';
import Dashboard from '../dashboard';
import DashBoardCard from '../dashboard-card/dashboard-card';



const DashboardData = () => {
  return (
    <Dashboard isNavbar >
      <DashBoardCard />
    </Dashboard>
  );
};

export default withRouter(DashboardData);
