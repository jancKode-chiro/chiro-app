import { withRouter } from 'react-router';
import React, { ReactNode } from 'react';

import './users.styles.scss';

import { Input } from '../../components/common/forms/custom-input/input';

import searchdata from '../../assets/images/searchdata.png';
import Dashboard from '../dashboard/dashboard';

type UsersProps = {
  children?: ReactNode;
};

const Users = ({ children }: UsersProps) => {
  return (
    <Dashboard>
      <div className='searchbar-a'>
        <form>
          <Input placeholder='Search' width='20rem' />
        </form>
      </div>

      <div className='search-data-image'>
        <img src={searchdata} alt='graph-img' width='80%' height='80%' />
      </div>
    </Dashboard>
  );
};

export default withRouter(Users);
