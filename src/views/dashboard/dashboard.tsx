import React from 'react';
import { withRouter } from 'react-router';

import './dashboard.styles.scss';
import NavBar from './navigation/navigation-bar/navigation-bar';


const Dashboard = ({ isNavbar, children }: any) => {


  return (

    <div className='dashboard'>
      <NavBar />
      <div className='dashboard'>
        <div className='dashboard-content-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
