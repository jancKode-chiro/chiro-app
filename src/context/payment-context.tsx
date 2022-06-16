import { isEmpty, toNumber } from 'lodash';
import React, {
  ReactElement,
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';


type PaymentProps = {
  balance: number;
  setCurrentBalance: (balance: number) => void;

};

const PaymentContext = createContext({});

const PaymentProvider = (props: any): ReactElement => {
  const [balance, setBalance] = useState<number>(0)


  const setCurrentBalance = (balance: number): void => {
    setBalance(balance!);
    localStorage.setItem('balance', balance.toString())
  };


  useEffect(() => {
    console.log('context balance', balance)
    if (isEmpty(balance)) {
      const getBalanceFromStorage = localStorage.getItem('balance')
      setBalance(toNumber(getBalanceFromStorage))
    }
  }, [balance])


  const values: PaymentProps = {
    balance,
    setCurrentBalance,

  };

  return <PaymentContext.Provider value={values} {...props} />;
};

const usePayment = (): PaymentProps => useContext(PaymentContext) as PaymentProps;

export { PaymentProvider, usePayment };
