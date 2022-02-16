import React, { ReactNode, useEffect } from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';

import { useAuth } from '../../context/auth-context';
import smsSent from '../../assets/images/sms/SMS-Sentcards.png';
import smsDelivered from '../../assets/images/sms/SMS-delivered.png';
import smsCurrentBal from '../../assets/images/sms/SMS-current-bal.png';
import graph from '../../assets/images/sms/graph.png';
import home from '../../assets/images/icons/home.png';
import contacts from '../../assets/images/icons/contacts.png';
import chart from '../../assets/images/icons/chart.png';
import message from '../../assets/images/icons/message.png';
import cog from '../../assets/images/icons/cog.png';
import './dashboard.styles.scss';

const listCards = [
  {
    image: smsSent,
    id: 1,
  },
  {
    image: smsDelivered,
    id: 2,
  },
  {
    image: smsCurrentBal,
    id: 3,
  },
];

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
  const { isAuth } = useAuth();

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
        <div className='cards'>
          {listCards.map((card) => {
            return (
              <div key={card.id} className='card'>
                <img
                  src={card.image}
                  alt={`img-${card.id}`}
                  height='100%'
                  width='65%'
                />
              </div>
            );
          })}
        </div>
        <div className='graph'>
          <img src={graph} alt='graph-img' style={{ height: 'auto', width: '100%' }} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default withRouter(Dashboard);
