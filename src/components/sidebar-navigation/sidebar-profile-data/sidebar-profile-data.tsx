import React from 'react';
import { withRouter } from 'react-router';


import SideBarProfile from '../sidebar-profile-navigation/sidebar-profile-navigation';



const SideBarDataProfile = () => {
  return (
    <div>
      <SideBarProfile />
    </div>
  );
};

export default withRouter(SideBarDataProfile);
