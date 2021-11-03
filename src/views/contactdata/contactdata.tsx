import { withRouter } from 'react-router';
import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';

import './contactdata.styles.scss';

import home from '../../assets/images/icons/home.png';
import contacts from '../../assets/images/icons/contacts.png';
import chart from '../../assets/images/icons/chart.png';
import message from '../../assets/images/icons/message.png';
import cog from '../../assets/images/icons/cog.png';
import contactdata from '../../assets/images/contactdata.png';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

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

const ContactData = ({ children }: DashboardProps) => {
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
        <div className='searchbar'>
          <form>
            <Input placeholder='Search' width='20rem' />
          </form>
          <InputButton
            value='ADD CONTACT'
            type='submit'
            className='bg-green text-white'
            width='12rem'
          />
        </div>

        <div className='contact-data-image'>
          <img src={contactdata} alt='graph-img' width='80%' height='80%' />
        </div>
      </div>

      {children}
    </div>
  );
};

export default withRouter(ContactData);