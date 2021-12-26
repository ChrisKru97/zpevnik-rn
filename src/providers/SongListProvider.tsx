import firestore from '@react-native-firebase/firestore';
import {createContext, FC, useEffect, useMemo, useState} from 'react';
import deburr from 'lodash.deburr';
import {useMMKVObject} from 'react-native-mmkv';
import Fuse from 'fuse.js';
import {Song} from '../helpers/types';
import {useAuth} from '../hooks';

type SongListContextType = {
  songs?: Song[];
  favorites?: number[];
  favoritesSongs?: Song[];
  switchFavorite: (number: number) => void;
  refetch: () => void;
  loading: boolean;
  searchValue?: string;
  search: (value: string) => void;
  getSong: (getNumber: number) => Song | undefined;
};

const SONGS_KEY = '@songs';
const FAVORITES_KEY = '@favorites';

export const SongListContext = createContext<SongListContextType>(
  {} as SongListContextType,
);

const SongListProvider: FC = ({children}) => {
  const [songs, setSongs] = useMMKVObject<Song[]>(SONGS_KEY);
  const [favorites, setFavorites] = useMMKVObject<number[]>(FAVORITES_KEY);
  const {isLoggedIn} = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>('');

  const fuse = useMemo(() => {
    if (!songs?.length) return;
    return new Fuse(
      songs.map(s => ({
        name: deburr(s.withoutChords.toLowerCase()),
        withoutChords: deburr(s.withoutChords.toLowerCase()),
        number: s.number,
      })),
      {keys: ['withoutChords', 'number', 'name']},
    );
  }, [songs]);

  const filtered = useMemo(() => {
    if (!fuse || !songs || !searchString.length) return;
    const matches = fuse.search(deburr(searchString.toLowerCase()));
    return matches.map(m => songs[m.refIndex]);
  }, [fuse, searchString]);

  const loadData = async () => {
    setLoading(true);
    const res = await firestore().collection('songs').orderBy('number').get();
    const nextSongs = res.docs.map(
      doc => ({...doc.data(), id: doc.id} as Song),
    );
    setSongs(nextSongs);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn && !songs?.length) {
      loadData();
    }
  }, [isLoggedIn, songs]);

  const switchFavorite = (number: number) => {
    if (!favorites) setFavorites([number]);
    else if (favorites.includes(number)) {
      setFavorites([...favorites].filter(songNumber => songNumber !== number));
    } else {
      setFavorites([...favorites, number]);
    }
  };

  const favoritesSongs = useMemo(
    () =>
      songs && favorites
        ? songs.filter(({number}) => favorites.includes(number))
        : undefined,
    [songs, favorites],
  );

  const getSong = (getNumber: number) =>
    songs?.find(song => song.number === getNumber);

  return (
    <SongListContext.Provider
      value={{
        songs: filtered,
        getSong,
        favorites,
        favoritesSongs,
        switchFavorite,
        loading,
        refetch: loadData,
        searchValue: searchString,
        search: setSearchString,
      }}>
      {children}
    </SongListContext.Provider>
  );
};

export default SongListProvider;
