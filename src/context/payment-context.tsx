import React, {
  ReactElement,
  useState,
  useContext,
  createContext
} from 'react';


type PaymentProps = {
  balance: number | null | undefined | string;
  setCurrentBalance: (balance: number | null | undefined | string) => void;

};

const PaymentContext = createContext({});

const PaymentProvider = (props: any): ReactElement => {
  const [balance, setBalance] = useState<number | null | undefined | string>(0)


  const setCurrentBalance = (balance: string | number | null | undefined): void => {
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
