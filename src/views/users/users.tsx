import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,

} from 'react';
import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';

import { useAuth } from '../../context/auth-context';
import { getContacts } from '../../api/contacts';
import { InputButton } from '../../components/common/forms/custom-input/input';

import Table from '../../components/table/table';

import Dashboard from '../dashboard/dashboard';

import './users.styles.scss';

type UsersProps = {
  children?: ReactNode;
};

const Users = ({ children }: UsersProps) => {

  const { currentUserId, setCurrentUserId } = useAuth();
  const [users, setUsers] = useState<any>([]);


  const { data } = useQuery(['users'], () =>
    getContacts(currentUserId)
  );

  useEffect(() => {
    if (!isEmpty(data)) setUsers(data);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'user_name',
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => (
          <>
            {original.first_name} {original.last_name}
          </>
        ),
      },
      {
        Header: 'Create Date',
        accessor: 'date_added',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
    ],
    []
  );



  return (
    <Dashboard>
      <div className='users'>
        <form className='usersform'>
          <label className='userstitle'>Users</label>
          <InputButton
            value='ADD USERS'
            type='submit'
            className='bg-green text-white'
            width='12rem'
          />
        </form>
        <div className='search-data-image'>
          <Table columns={columns} data={users} />
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(Users);
