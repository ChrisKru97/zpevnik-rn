import {FC} from 'react';
import {FlatList, View} from 'react-native';
import {ListItem, BottomBar} from '../components';
import {useSongList} from '../hooks';

const Home: FC = () => {
  const songList = useSongList();
  return (
    <View>
      <FlatList
        data={songList}
        renderItem={({item}) => <ListItem {...item} />}
      />
      <BottomBar />
    </View>
  );
};

export default Home;
