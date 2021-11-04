import React, { ReactNode } from 'react';

import { withRouter } from 'react-router';

import './profiledata.styles.scss';

import VerticalSpacer from '../../components/common/spacer/vertical-spacer';
import profile from '../../assets/images/icons/profile.png';
import NoDashBoard from '../nodashboard/nodashboard';

type DashboardProps = {
  children?: ReactNode;
};

const ProfileData = ({ children }: DashboardProps) => {
  return (
    <NoDashBoard>
      <div className='profiledata'>
        <title className='profile-a'>Profile</title>
        <img src={profile} alt='graph-img' width='157px' height='157px' />

        <div className='info-a'>
          <span>Username:</span>
          <span>Address</span>
        </div>

        <div className='info-a1'>
          <span>James Smith:</span>
          <span>1111 Charles Street</span>
        </div>

        {VerticalSpacer('20px')}

        <div className='info-b'>
          <span>Email:</span>
          <span>Phone number:</span>
        </div>

        <div className='info-b1'>
          <span>myawesome@gmail.com</span>
          <span>+1122345986</span>
        </div>

        {VerticalSpacer('20px')}

        <div className='info-c'>
          <span>First name:</span>
        </div>

        <div className='info-c1'>
          <span>James</span>
        </div>

        {VerticalSpacer('20px')}

        <div className='info-d'>
          <span>Last name:</span>
        </div>

        <div className='info-d1'>
          <span>Smith</span>
          <button className='button-a'>Update Profile</button>
        </div>
      </div>
    </NoDashBoard>
  );
};

export default withRouter(ProfileData);
