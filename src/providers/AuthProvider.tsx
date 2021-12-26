import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createContext, FC, useEffect, useState} from 'react';
import {LoginType} from '../helpers/types';

interface AuthContextInterface {
  loginId: string | undefined;
  isLoggedIn: boolean;
  loginType: LoginType;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

GoogleSignin.configure();

const AuthProvider: FC = ({children}) => {
  const [loginId, setLoginId] = useState<string>();
  const [loginType, setLoginType] = useState<LoginType>(LoginType.Anonymous);

  useEffect(() => {
    if (!loginId) {
      auth()
        .signInAnonymously()
        .then(({user: {uid}}) => {
          setLoginId(uid);
          setLoginType(LoginType.Anonymous);
        });
    }
  }, [loginId]);

  const signInWithCredentials = async (email: string, password: string) => {
    const {
      user: {uid},
    } = await auth().signInWithEmailAndPassword(email, password);
    setLoginId(uid);
    setLoginType(LoginType.Mail);
  };

  const signInWithGoogle = async () => {
    const res = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
    const {
      user: {uid},
    } = await auth().signInWithCredential(googleCredential);
    setLoginId(uid);
    setLoginType(LoginType.Google);
  };

  return (
    <AuthContext.Provider
      value={{
        loginId,
        isLoggedIn: !!loginId,
        signIn: signInWithCredentials,
        signInWithGoogle,
        loginType,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
