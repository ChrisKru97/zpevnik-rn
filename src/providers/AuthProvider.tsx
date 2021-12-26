import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {AppState} from 'react-native';
import {LoginType} from '../helpers/types';

interface AuthContextInterface {
  isLoggedIn: boolean;
  loginType: LoginType;
  openSong: (songNumber?: number) => void;
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

  const signIn = useCallback(async () => {
    const {
      user: {uid},
    } = await auth().signInAnonymously();
    setLoginId(uid);
    setLoginType(LoginType.Anonymous);
  }, []);

  useEffect(() => {
    if (!loginId) {
      signIn();
    }
  }, [loginId, signIn]);

  const signInWithCredentials = useCallback(
    async (email: string, password: string) => {
      const {
        user: {uid},
      } = await auth().signInWithEmailAndPassword(email, password);
      setLoginId(uid);
      setLoginType(LoginType.Mail);
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    const res = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
    const {
      user: {uid},
    } = await auth().signInWithCredential(googleCredential);
    setLoginId(uid);
    setLoginType(LoginType.Google);
  }, []);

  const activeEntity = useMemo(
    () => (loginId ? firestore().collection('active').doc(loginId) : undefined),
    [loginId],
  );

  const updateActiveEntity = useCallback(
    (data: {songNumber?: number | null; active?: boolean}) =>
      activeEntity?.update(data),
    [activeEntity],
  );

  const createActiveEntity = useCallback(async () => {
    const data = await firestore().collection('users').doc(loginId).get();
    const {name, email} = data.data() ?? {};
    activeEntity?.set({
      active: true,
      displayName: name || email,
    });
  }, [activeEntity, loginId]);

  useEffect(() => {
    activeEntity?.get().then(data => {
      if (data.exists) updateActiveEntity({active: true});
      else {
        setTimeout(createActiveEntity, 500);
      }
    });
    AppState.addEventListener('change', value => {
      if (value === 'active') {
        updateActiveEntity({active: true});
      } else {
        updateActiveEntity({active: false});
      }
    });
    return () => {
      updateActiveEntity({active: false});
    };
  }, [activeEntity, createActiveEntity, updateActiveEntity]);

  const openSong = useCallback(
    (songNumber?: number) =>
      updateActiveEntity({songNumber: songNumber || null}),
    [updateActiveEntity],
  );

  const state = useMemo(
    () => ({
      isLoggedIn: !!loginId,
      signIn: signInWithCredentials,
      signInWithGoogle,
      openSong,
      loginType,
    }),
    [loginId, loginType, openSong, signInWithCredentials, signInWithGoogle],
  );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
