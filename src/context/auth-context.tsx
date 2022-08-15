import React, {
  ReactElement,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { getCurrentSession, AuthSession } from '../helpers/user-helpers';

type UseAuth = {
  authState: AuthSession | undefined;
  setAuthState: Dispatch<SetStateAction<AuthSession | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  email: string;
  setInputEmail: (email: string) => void;
  currentUserId: string;
  setCurrentUserId: (userId: string) => void;

};

const AuthContext = createContext({});

const AuthProvider = (props: any): ReactElement => {
  const [authState, setAuthState] = useState<AuthSession>();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [currentUserId, setUserId] = useState<string>('');


  const checkAuthentication = async (setAuthState: Function): Promise<void> => {
    try {
      const session: AuthSession = await getCurrentSession();
      await setAuthState(session);
    } catch (error: any) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const setInputEmail = (email: string): void => {
    setEmail(email);
  };

  const setCurrentUserId = (userId: string): void => {
    setUserId(userId);
    localStorage.setItem('userId', userId);
  };



  useEffect(() => {
    const auth = checkAuthentication;
    auth(setAuthState);
    setCurrentUserId(localStorage.getItem('userId')!);
    setEmail(localStorage.getItem('email')!);

  }, [email, currentUserId]);

  const values: UseAuth = {
    authState,
    setAuthState,
    isLoading,
    setIsLoading,
    email,
    setInputEmail,
    currentUserId,
    setCurrentUserId,

  };

  return <AuthContext.Provider value={values} {...props} />;
};

const useAuth = (): UseAuth => useContext(AuthContext) as UseAuth;

export { AuthProvider, useAuth };
