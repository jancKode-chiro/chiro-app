import { withRouter } from 'react-router';
import React, { ReactNode } from 'react';
import CustomHeader from '../../components/header/header';

import './contactdata.styles.scss';

import contactdata from '../../assets/images/contactdata.png';
import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';

import Dashboard from '../dashboard/dashboard';

type DashboardProps = {
  children?: ReactNode;
};

const ContactData = ({ children }: DashboardProps) => {
  return (
    <Dashboard>
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
    </Dashboard>
  );
};

export default withRouter(ContactData);
