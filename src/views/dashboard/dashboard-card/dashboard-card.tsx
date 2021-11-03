import React from 'react';

import email from '../../../assets/images/icons/email.png';
import globe from '../../../assets/images/icons/globe.png';
import money from '../../../assets/images/icons/money.png';

import './dashboard-card.styles.scss';

type DashBoardCardProps = {
  icon: string;
  title?: string;
  amount?: string;
  class?: string;
};

const DashBoardCard = () => {
  const listItems: DashBoardCardProps[] = [
    {
      icon: email,
      title: 'SMS Sent',
      amount: '426',
      class: 'blue-card',
    },
    {
      icon: globe,
      title: 'SMS Deilvered',
      amount: '0',
      class: 'green-card',
    },

    {
      icon: money,
      title: 'Current Blast Balance',
      amount: '$123',
      class: 'dark-blue-card',
    },
  ];

  return (
    <div className='dashboardcard'>
      {listItems.map((item) => {
        return (
          <div className={`card ${item.class}`} key={item.title}>
            <img src={item.icon} alt={item.title} className='icon' />
            <div className='text-wrapper'>
              <span className='title'>{item.title}</span>
              <span className='amount'>{item.amount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashBoardCard;
