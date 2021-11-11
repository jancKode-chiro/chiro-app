import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';
import { StyledLink } from '../../components/link/link';
import {
  CONTACTDATA_PATH,
  SEND_SMS_PATH,
  SMS_PATH,
} from '../../constants/paths';

import home from '../../assets/images/icons/home.png';
import contacts from '../../assets/images/icons/contacts.png';
import chart from '../../assets/images/icons/chart.png';
import message from '../../assets/images/icons/message.png';
import cog from '../../assets/images/icons/cog.png';
import './dashboard.styles.scss';
import DashBoardCard from './dashboard-card/dashboard-card';

const listNavOptions = [
  {
    icon: home,
    label: 'Home',
    id: 1,
    path: '/dashboard',
  },
  {
    icon: contacts,
    label: 'Contacts',
    id: 2,
    path: CONTACTDATA_PATH,
  },
  {
    icon: chart,
    label: 'Campaigns',
    id: 3,
    path: SMS_PATH,
  },
  {
    icon: message,
    label: 'Messages',
    id: 4,
    path: SEND_SMS_PATH,
  },
  {
    icon: cog,
    label: 'Settings',
    id: 5,
    path: '/',
  },
];

type DashboardProps = {
  children?: ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div>
      <CustomHeader title='Logo here' />
      <div className='dashboard'>
        <div className='navbar'>
          {listNavOptions.map((nav) => {
            return (
              <div key={nav.id}>
                <div className='nav-menu'>
                  <img
                    src={nav.icon}
                    alt={`icon-${nav.label}`}
                    className='nav-icon'
                  />
                  <StyledLink to={nav.path as string} className='label'>
                    {nav.label}
                  </StyledLink>
                </div>
              </div>
            );
          })}
        </div>
        <div className='dashboard-content-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
