import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,

} from 'react';
import { useHistory, withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { getUsers } from '../../api/users';
import { InputButton } from '../../components/common/forms/custom-input/input';
import { Button } from 'semantic-ui-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomModal from '../../components/modal/modal';

import Table from '../../components/table/table';
import Dashboard from '../dashboard/dashboard';

import './users.styles.scss';

type InputProps = {
  user: string;
};

type UsersProps = {
  children?: ReactNode;
};

const Users = ({ children }: UsersProps) => {

  const [users, setUsers] = useState<any>([]);

  const { data } = useQuery(['users'], () =>
    getUsers()
  );

  const { handleSubmit } = useForm();
  let history = useHistory();

  const submitHandler: SubmitHandler<InputProps> = (data: any): void => {
    history.push('/adduser');
  };



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
        <form className='usersform' onSubmit={handleSubmit(submitHandler)}>
          <label className='userstitle'>Users</label>
          <CustomModal
            headerText='You are about to create your user account'
            contentText='Are you sure you want to create?'
            buttonTriggerText='Clear data?'
            onOpenCallback={() => setUsers([])}
            customComponent={<Button className='user-button-wrapper'>CREATE USER</Button>}
            onCloseButtonText='No'
            onOpenButtonText='Yes'
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
