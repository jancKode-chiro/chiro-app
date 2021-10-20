import React from 'react';

import email from '../../../assets/images/icons/email.png';
import globe from '../../../assets/images/icons/globe.png';
import money from '../../../assets/images/icons/money.png';

import './dashboard-card.styles.scss';

type DashBoardCardProps = {
  icon?: string;
  title?: string;
  amount?: string;
  class?: string;
};

const DashBoardCard = ({ amount, title }: DashBoardCardProps) => {
  const listItems: DashBoardCardProps[] = [
    {
      icon: email,
      title: title,
      amount: amount,
      class: 'blue-card',
    },
    {
      icon: globe,
      title: title,
      amount: amount,
      class: 'green-card',
    },

    {
      icon: money,
      title: title,
      amount: amount,
      class: 'dark-blue-card',
    },
  ];

  return (
    <div className='dashboardcard'>
      {listItems.map((item) => {
        return (
          <div className={`card ${item.class}`}>
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
