import firestore from '@react-native-firebase/firestore';
import {createContext, FC, useCallback, useEffect, useState} from 'react';
import {Song} from '../helpers/types';
import useAuth from '../hooks/useAuth';

export const SongListContext = createContext<Song[]>([]);

const SongListProvider: FC = ({children}) => {
  const isLoggedIn = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);

  const loadData = useCallback(async () => {
    const res = await firestore().collection('songs').orderBy('number').get();
    setSongs(res.docs.map(doc => ({...doc.data(), id: doc.id} as Song)));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, loadData]);

  return (
    <SongListContext.Provider value={songs}>
      {children}
    </SongListContext.Provider>
  );
};

export default SongListProvider;
