import {FC} from 'react';
import {FlatList} from 'react-native';
import useActiveList from '../hooks/useActiveList';
import {UserItem} from '.';

const ActiveList: FC = () => {
  const data = useActiveList();

  return (
    <FlatList data={data} renderItem={({item}) => <UserItem {...item} />} />
  );
};

export default ActiveList;
