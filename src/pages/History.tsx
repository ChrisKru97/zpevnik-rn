import {FC, useMemo} from 'react';
import {FlatList} from 'react-native';
import {Header, ListItem} from '../components';
import {Song} from '../helpers/types';
import {useHistory, useSongList} from '../hooks';

const History: FC = () => {
  const {songs} = useSongList();
  const {history} = useHistory();

  const historyList = useMemo(
    () =>
      history
        .map(item => songs.find(song => song.number === item))
        .filter(Boolean) as Song[],
    [history, songs],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={historyList}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListHeaderComponent={<Header />}
      renderItem={({item}) => <ListItem {...item} />}
    />
  );
};

export default History;
