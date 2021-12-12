import {FC, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Animated, RefreshControl, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem, BottomBar, Header, ScrollBar} from '../components';
import {HEADER_HEIGHT} from '../components/Header';
import {ITEM_HEIGHT} from '../components/ListItem';
import {globalStyles} from '../helpers/globalStyles';
import {useSongList} from '../hooks';

const Home: FC = () => {
  const {songs, loading, refetch} = useSongList();
  const scrollRef = useRef<FlatList>(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const height = useMemo(
    () => songs.length * ITEM_HEIGHT - containerHeight,
    [songs, containerHeight],
  );

  const scrollToTop = () => scrollRef.current?.scrollToOffset({offset: 0});

  return (
    <View style={globalStyles.flex}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        data={songs}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          const ratio = offset / height;
          scrollValue.setValue(ratio);
        }}
        onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
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
      <ScrollBar scrollRef={scrollRef} scrollValue={scrollValue} />
      <BottomBar />
    </View>
  );
};

export default Home;
