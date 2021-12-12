import AsyncStorageLib from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Song} from '../helpers/types';
import {useAuth} from '../hooks';

type SongListContextType = {
  songs: Song[];
  favorites: number[];
  favoritesSongs: Song[];
  switchFavorite: (number: number) => void;
  refetch: () => void;
  loading: boolean;
};

const SONGS_KEY = '@songs';
const FAVORITES_KEY = '@favorites';

export const SongListContext = createContext<SongListContextType>(
  {} as SongListContextType,
);

const SongListProvider: FC = ({children}) => {
  const isLoggedIn = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await firestore().collection('songs').orderBy('number').get();
    const nextSongs = res.docs.map(
      doc => ({...doc.data(), id: doc.id} as Song),
    );
    setSongs(nextSongs);
    AsyncStorageLib.setItem(SONGS_KEY, JSON.stringify(nextSongs));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      AsyncStorageLib.getItem(SONGS_KEY).then(json => {
        if (json) {
          const data = JSON.parse(json);
          setSongs(data);
          setLoading(false);
        } else {
          loadData();
        }
      });
    }
  }, [isLoggedIn, loadData]);

  useEffect(() => {
    AsyncStorageLib.getItem(FAVORITES_KEY).then(json => {
      if (!json) {
        return;
      }
      const data = JSON.parse(json);
      setFavorites(data);
    });
  }, []);

  const switchFavorite = useCallback(
    (number: number) => {
      let nextFavorites;
      if (favorites.includes(number)) {
        nextFavorites = [...favorites].filter(
          songNumber => songNumber !== number,
        );
      } else {
        nextFavorites = [...favorites, number];
      }
      setFavorites(nextFavorites);
      AsyncStorageLib.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    },
    [favorites],
  );

  const favoritesSongs = useMemo(
    () => songs.filter(({number}) => favorites.includes(number)),
    [songs, favorites],
  );

  const state = useMemo(
    () => ({
      songs,
      favorites,
      favoritesSongs,
      switchFavorite,
      loading,
      refetch: loadData,
    }),
    [songs, loading, favorites, loadData, switchFavorite, favoritesSongs],
  );

  return (
    <SongListContext.Provider value={state}>
      {children}
    </SongListContext.Provider>
  );
};

export default SongListProvider;
