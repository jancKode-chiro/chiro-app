import React, {
  ReactElement,
  useState,
  useContext,
  createContext
} from 'react';


type PaymentProps = {
  balance: number | null | undefined
  setCurrentBalance: (balance: number | null | undefined) => void;

};

const PaymentContext = createContext({});

const PaymentProvider = (props: any): ReactElement => {
  const [balance, setBalance] = useState<number | null | undefined>(0)


  const setCurrentBalance = (balance: number | null | undefined): void => {
    setBalance(balance!);
  };



  const values: PaymentProps = {
    balance,
    setCurrentBalance,

  };

  return <PaymentContext.Provider value={values} {...props} />;
};

const usePayment = (): PaymentProps => useContext(PaymentContext) as PaymentProps;

export { PaymentProvider, usePayment };
