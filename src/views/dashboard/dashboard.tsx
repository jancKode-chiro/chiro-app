import React from 'react';
import { withRouter } from 'react-router';

import './dashboard.styles.scss';
import NavBar from './navigation-bar/navigation/navbar';
import MenuBar from './navigation/menu-bar/menu-bar';


const Dashboard = ({ isNavbar, children }: any) => {
  return (

    <div className='dashboard'>
      <NavBar />
      <MenuBar />
      <div className='dashboard'>
        <div className='dashboard-content-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
