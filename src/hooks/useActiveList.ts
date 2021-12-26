import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {ActiveEntity} from '../helpers/types';
import {useAuth} from '.';

type Snapshot = FirebaseFirestoreTypes.QuerySnapshot<
  FirebaseFirestoreTypes.DocumentData & ActiveEntity
>;

const sortFn = (loginId: string) => (a: ActiveEntity, b: ActiveEntity) => {
  if (a.id === loginId) return -1;
  if (a.active && !b.active) return -1;
  if (!(a.active && b.active) && (b.active || b.active)) return 0;
  if (a.displayName && !b.displayName) return -1;
  if (!(a.displayName && b.displayName) && (b.displayName || b.displayName))
    return 0;
  if (a.songNumber && !b.songNumber) return -1;
  if (a.songNumber && b.songNumber && a.songNumber < b.songNumber) return -1;
  return 0;
};

const useActiveList = () => {
  const {isLoggedIn, loginId} = useAuth();
  const [data, setData] = useState<Snapshot | undefined>();

  useEffect(() => {
    if (isLoggedIn) {
      const unsub = firestore()
        .collection('active')
        .onSnapshot(nextData => {
          if (!data || !nextData.isEqual(data)) setData(nextData as Snapshot);
        });
      return () => {
        unsub();
      };
    }
  }, [data, isLoggedIn]);

  return data?.docs
    .map(doc => ({...doc.data(), id: doc.id}))
    .sort(sortFn(loginId));
};

export default useActiveList;
