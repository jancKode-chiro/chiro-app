import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';

import graph from '../../assets/images/sms/graph.png';
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
  },
  {
    icon: contacts,
    label: 'Contacts',
    id: 2,
  },
  {
    icon: chart,
    label: 'Campaigns',
    id: 3,
  },
  {
    icon: message,
    label: 'Messages',
    id: 4,
  },
  {
    icon: cog,
    label: 'Settings',
    id: 5,
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
                  <span className='label'>{nav.label}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className='dashboard-cards-wrapper'>
          <DashBoardCard />
        </div>
        <div className='graph'>
          <img src={graph} alt='graph-img' width='95%' height='100%' />
        </div>
      </div>

      {children}
    </div>
  );
};

export default withRouter(Dashboard);
