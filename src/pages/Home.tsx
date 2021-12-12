import {FC, useRef} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {ListItem, BottomBar, Header} from '../components';
import {HEADER_HEIGHT} from '../components/Header';
import {globalStyles} from '../helpers/globalStyles';
import {useSongList} from '../hooks';

const Home: FC = () => {
  const {songs, loading, refetch} = useSongList();
  const scrollRef = useRef<FlatList>(null);

  const scrollToTop = () => scrollRef.current?.scrollToOffset({offset: 0});

  return (
    <View style={globalStyles.flex}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        data={songs}
        refreshControl={
          <RefreshControl
            progressViewOffset={HEADER_HEIGHT}
            refreshing={loading}
            onRefresh={refetch}
          />
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={<Header onPress={scrollToTop} />}
        renderItem={({item}) => <ListItem {...item} />}
        ListEmptyComponent={<ActivityIndicator size="large" />}
      />
      <BottomBar />
    </View>
  );
};

export default Home;
