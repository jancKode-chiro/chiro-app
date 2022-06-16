import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo
} from 'react';

import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { getPayments } from '../../api/payments';
import { useAuth } from '../../context/auth-context'

import moment from 'moment';
import Table from '../../components/table/table';
import Dashboard from '../dashboard/dashboard';

import './payment.styles.scss'

type UsersProps = {
  children?: ReactNode;
};

const PaymentHistory = ({ children }: UsersProps) => {
  let yourDate = new Date()
  const [payment, setPayment] = useState<any>([]);
  const { currentUserId } = useAuth()

  const { data } = useQuery(['payments-history'], () =>
    getPayments(currentUserId)

  );

  useEffect(() => {
    console.log('payment', payment)
    if (!isEmpty(data)) setPayment(data);

  }, [data, payment]);

  const columns = useMemo(
    () => [
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => (
          <>
            {(moment(original.updatedAt).format('DD-MMM-YYYY'))}

          </>
        ),
      },
      {
        Header: 'ID',
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
        Header: 'Balance',
        accessor: 'balance',
      },
      {
        Header: 'User ID',
        accessor: 'userID',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => (
          <>
            {(moment(original.createdAt).format('DD-MMM-YYYY'))}

          </>
        ),
      },
      {
        Header: 'Payment Date',
        accessor: 'payment_date',
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => (
          <>
            {(moment(original.payment_date).format('DD-MMM-YYYY'))}

          </>
        ),
      },

      // {
      //   Header: 'Updated At',
      //   accessor: 'updatedAt',
      // },

    ],
    []
  );



  return (
    <Dashboard isNavbar={true}>
      <div className='payment'>
        <form className='paymentform'>
          <label className='paymenttitle'>Payment History</label>
        </form>
        <div className='payment-data'>
          <Table columns={columns} data={payment} />
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(PaymentHistory);
