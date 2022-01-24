import React from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';
import { StyledLink } from '../../components/link/link';
import {
  CONTACTS_PATH,
  SEND_SMS_PATH,
  SMS_PATH,
  USERS_PATH,
} from '../../constants/paths';


import home from '../../assets/images/icons/home.png';
import user from '../../assets/images/icons/user.png'
import contacts from '../../assets/images/icons/contacts.png';
import chart from '../../assets/images/icons/chart.png';
import message from '../../assets/images/icons/message.png';
import cog from '../../assets/images/icons/cog.png';
import './dashboard.styles.scss';
import NavBar from './navigation-bar/navigation/navbar';

const listNavOptions = [
  {
    icon: home,
    label: 'Home',
    id: 1,
    path: '/dashboard',
  },

  {
    icon: user,
    label: 'Users',
    id: 2,
    path: USERS_PATH
  },

  {
    icon: contacts,
    label: 'Contacts',
    id: 3,
    path: CONTACTS_PATH,
  },
  {
    icon: chart,
    label: 'Campaigns',
    id: 4,
    path: SMS_PATH,
  },
  {
    icon: message,
    label: 'Messages',
    id: 5,
    path: SEND_SMS_PATH,
  },
  {
    icon: cog,
    label: 'Settings',
    id: 6,
    path: '/',
  },
];

// interface DashboardProps {
//   isNavbar?: boolean;
//   children?: ReactElement;
// };

const Dashboard = ({ isNavbar, children }: any) => {
  return (
    <div>
      <div className='dashboard'>
        <NavBar />
        <div className='dashboard-content-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
