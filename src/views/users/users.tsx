import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,

} from 'react';
import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';


import { getUsers } from '../../api/users';
import { InputButton } from '../../components/common/forms/custom-input/input';

import Table from '../../components/table/table';
import Dashboard from '../dashboard/dashboard';

import './users.styles.scss';
// import { getContacts } from '../../api/contacts';


type UsersProps = {
  children?: ReactNode;
};

const Users = ({ children }: UsersProps) => {

  const [users, setUsers] = useState<any>([]);

  const { data } = useQuery(['users'], () =>
    getUsers()
  );

  useEffect(() => {
    if (!isEmpty(data)) setUsers(data);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: 'first_name',
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
        accessor: 'create_date',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },

    ],
    []
  );



  return (
    <Dashboard isNavbar={true}>
      <div className='users'>
        <form className='usersform'>
          <label className='userstitle'>Users</label>
          <InputButton
            value='CREATE USER'
            type='submit'
            className='bg-green text-white'
            width='12rem'
          />
        </form>
        <div>
          <Table columns={columns} data={users} />
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(Users);
