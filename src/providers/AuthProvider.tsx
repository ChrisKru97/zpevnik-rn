import auth from '@react-native-firebase/auth';
import {createContext, FC, useCallback, useEffect, useState} from 'react';

export const AuthContext = createContext(false);

const AuthProvider: FC = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = useCallback(async () => {
    await auth().signInAnonymously();
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    signIn();
  }, [signIn]);

  return (
    <AuthContext.Provider value={loggedIn}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
