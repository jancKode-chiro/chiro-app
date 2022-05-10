import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,

} from 'react';

import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { Payment } from '../../models';
import { InputButton } from '../../components/common/forms/custom-input/input';

import Table from '../../components/table/table';
import Dashboard from '../dashboard/dashboard';

import './payment-history.styles.scss';

type PaymentProps = {
  children?: ReactNode;
}

const PaymentHistory = ({ children }: PaymentProps) => {

  const [payment, setPayment] = useState<any>([]);

  const { data } = useQuery(['payment'], () =>
    Payment
  )

  useEffect(() => {
    if (!isEmpty(data)) setPayment(data);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Payment Type',
        accessor: 'payment_type',
      },
      {
        Header: 'Payment Date',
        accessor: 'payment_date',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
      {
        Header: 'UserID',
        accessor: 'userID',
      },
      {
        Header: 'Created At',
        accessor: 'createAt',
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
      }

    ],
    []
  );


  return (
    <Dashboard isNavbar={true}>
      <div className='payment'>
        <form className='paymentform'>
          <label className='paymenttitle'>Payment History</label>
          <InputButton
            value='Search'
            type='submit'
            className='bg-green text-white'
            width='12rem'
          />
        </form>
        <div className='payment-data'>
          <Table columns={columns} data={payment} />
        </div>
      </div>
    </Dashboard>
  )
}

export default withRouter(PaymentHistory);