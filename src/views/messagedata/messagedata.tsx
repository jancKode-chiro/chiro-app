import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';
import { withRouter } from 'react-router';

import VerticalSpacer from '../../components/common/spacer/vertical-spacer';

import home from '../../assets/images/icons/home.png';
import contacts from '../../assets/images/icons/contacts.png';
import chart from '../../assets/images/icons/chart.png';
import message from '../../assets/images/icons/message.png';
import cog from '../../assets/images/icons/cog.png';

// import { Input as AntInput } from 'antd';
import { Input } from '../../components/common/inputsms/inputsms';
import { Intext } from '../../components/common/intext/intext';
import Button from '../../components/common/button/button';

import './messagedata.styles.scss';

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

const MessageData = ({ children }: DashboardProps) => {
  return (
    <div className='message-data'>
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
        <div className='smsform'>
          <span className='form-a'>SMS From:</span>
          <Input width='65vw' />
        </div>

        {VerticalSpacer('62px')}

        <div className='smstext'>
          <span className='text-a'>SMS text:</span>
          <Intext width='65vw' />
        </div>

        {VerticalSpacer('80px')}

        <div className='recepients'>
          <span className='recepients'>Recepients:</span>
          <Input width='63vw' />
        </div>

        {VerticalSpacer('49px')}

        <div className='smssend'>
          <span>Send SMS: </span>
          <input type='radio' value='Immediately' name='Immediately' />
          Immediately
          <input
            type='radio'
            value='Start sending at:'
            name='Start sending at:'
          />
          Start sending at:
          <Input width='6.2vw' />
          <div className='button-a'>
            <Button>SEND</Button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default withRouter(MessageData);
