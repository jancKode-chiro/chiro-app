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
};

const AuthContext = createContext({});

const AuthProvider = (props: any): ReactElement => {
  const [authState, setAuthState] = useState<AuthSession>();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthentication = async (setAuthState: Function): Promise<void> => {
    try {
      const session: AuthSession = await getCurrentSession();
      await setAuthState(session);
    } catch (error: any) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const auth = checkAuthentication;
    auth(setAuthState);
  }, []);

  const values: UseAuth = {
    authState,
    setAuthState,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={values} {...props} />;
};

const useAuth = (): UseAuth => useContext(AuthContext) as UseAuth;

export { AuthProvider, useAuth };
