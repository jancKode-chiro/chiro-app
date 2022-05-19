import React, {
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useRef
} from 'react';

import { toast } from "react-toastify";
import { withRouter } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import { InputButton } from '../../components/common/forms/custom-input/input';
import { getPayments } from '../../api/payments';
import { useAuth } from '../../context/auth-context'

import Table from '../../components/table/table';
import Dashboard from '../dashboard/dashboard';

import './payment.styles.scss'

type UsersProps = {
  children?: ReactNode;
};

const PaymentHistory = ({ children }: UsersProps) => {
  const toastId = useRef<any>(null);

  const notify = () => toastId.current = toast("Searching...", { type: toast.TYPE.INFO, autoClose: false });

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
        Header: 'Payment Date',
        accessor: 'payment_date',
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
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
      },

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
            onSubmit={notify}
          />
        </form>
        <div className='payment-data'>
          <Table columns={columns} data={payment} />
        </div>
      </div>
    </Dashboard>
  );
};

export default withRouter(PaymentHistory);
