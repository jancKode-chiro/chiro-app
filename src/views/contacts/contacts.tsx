import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
} from 'react';
import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { useAsyncDebounce } from 'react-table';

import {
  Input,
  InputButton,
} from '../../components/common/forms/custom-input/input';
import Dashboard from '../dashboard/dashboard';
import Table from '../../components/table/table';
import { useAuth } from '../../context/auth-context';
import { getContacts } from '../../api/contacts';
import './contacts.styles.scss';

import { useForm } from 'react-hook-form';

type DashboardProps = {
  children?: ReactNode;
};

const ContactData = ({ children }: DashboardProps) => {
  const { register } = useForm();
  const { currentUserId, setCurrentUserId } = useAuth();
  const [contacts, setContacts] = useState<any>([]);
  const [searchContact, setSearchContact] = useState('');
  const [filter, setFilter] = useState('');

  const { isLoading, isError, data, error } = useQuery(['contacts'], () =>
    getContacts(currentUserId)
  );

  useEffect(() => {
    if (!isEmpty(data)) setContacts(data);
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
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
      },
      {
        Header: 'Group',
        accessor: 'group',
      },
      {
        Header: 'Date Added',
        accessor: 'date_added',
      },
    ],
    []
  );
  type FilterProps = {
    filterValue: string;
    prefilteredRows: any;
    setFilter: any;
  };

  return (
    <Dashboard>
      <div className='contacts'>
        <form className='contacts-form'>
          <label className='title'>Contacts</label>
          <InputButton
            value='ADD CONTACT'
            type='submit'
            className='bg-green text-white'
            width='12rem'
          />
        </form>

        <div className='contact-data-image'>
          <Table columns={columns} data={contacts} />
          {console.log('contacts data', contacts)}
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(ContactData);
