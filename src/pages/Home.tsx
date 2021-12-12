import {useCallback, useEffect} from 'react';
import {FC, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {ListItem, BottomBar, Header, ScrollBar} from '../components';
import {BOTTOM_BAR_HEIGHT} from '../components/BottomBar';
import {HEADER_HEIGHT} from '../components/Header';
import {ITEM_HEIGHT} from '../components/ListItem';
import {globalStyles} from '../helpers/globalStyles';
import {useSongList} from '../hooks';

const styles = StyleSheet.create({
  footer: {height: BOTTOM_BAR_HEIGHT},
});

const Home: FC = () => {
  const {songs, loading, refetch} = useSongList();
  const scrollRef = useRef<FlatList>(null);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const currentRatio = useRef<number>(0);
  const startedScrolling = useRef<boolean>(false);

  const height = useMemo(
    () =>
      songs.length
        ? songs.length * ITEM_HEIGHT + 2 * BOTTOM_BAR_HEIGHT - containerHeight
        : 1,
    [songs, containerHeight],
  );

  const scrollToTop = () => scrollRef.current?.scrollToOffset({offset: 0});

  const scrollRatioValue = scrollValue.interpolate({
    inputRange: [0, height],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const listener = scrollRatioValue.addListener(({value}) => {
      if (!startedScrolling.current) {
        return;
      }
      currentRatio.current = value;
    });
    return () => {
      scrollRatioValue.removeListener(listener);
    };
  }, [height, scrollRatioValue]);

  const setScrollStarted = useCallback(() => {
    startedScrolling.current = true;
  }, []);

  const setScrollFinished = useCallback(() => {
    startedScrolling.current = false;
  }, []);

  const setScrollRatio = useCallback(
    (ratioDiff: number) => {
      const ratio = currentRatio.current + ratioDiff;
      const offset = ratio * height;
      scrollValue.setValue(offset);
      scrollRef.current?.scrollToOffset({offset});
      return ratio;
    },
    [height, scrollValue],
  );

  const setFinalScrollRatio = useCallback(
    (ratioDiff: number) => {
      currentRatio.current = setScrollRatio(ratioDiff);
    },
    [setScrollRatio],
  );

  return (
    <View style={globalStyles.flex}>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footer} />}
        ref={scrollRef}
        data={songs}
        onScrollBeginDrag={setScrollStarted}
        onMomentumScrollBegin={setScrollStarted}
        onScrollEndDrag={setScrollFinished}
        onMomentumScrollEnd={setScrollFinished}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollValue}}}],
          {useNativeDriver: false},
        )}
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
      <ScrollBar
        setFinalScrollRatio={setFinalScrollRatio}
        scrollValue={scrollRatioValue}
        setScrollRatio={setScrollRatio}
      />
      <BottomBar />
    </View>
  );
};

export default Home;
