import {FC} from 'react';
import {FlatList} from 'react-native';
import {Header, ListItem} from '../components';
import {useSongList} from '../hooks';

const Favorites: FC = () => {
  const {favoritesSongs} = useSongList();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={favoritesSongs}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      ListHeaderComponent={<Header />}
      renderItem={({item}) => <ListItem {...item} />}
    />
  );
};

export default Favorites;
