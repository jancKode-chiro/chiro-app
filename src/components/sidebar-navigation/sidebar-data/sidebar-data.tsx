import React from 'react';
import { withRouter } from 'react-router';

import SideBar from '../sidebar-navigation';



const SideBarData = () => {
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default withRouter(SideBarData);
