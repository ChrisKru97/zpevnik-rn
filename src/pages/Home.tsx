import {FC, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {ListItem, BottomBar, Header} from '../components';
import {BOTTOM_BAR_HEIGHT} from '../components/BottomBar';
import {HEADER_HEIGHT} from '../components/Header';
import {globalStyles} from '../helpers/globalStyles';
import {useSongList} from '../hooks';

const styles = StyleSheet.create({
  footer: {height: BOTTOM_BAR_HEIGHT},
});

const Home: FC = () => {
  const {songs, loading, refetch} = useSongList();
  const scrollValue = useRef(new Animated.Value(0)).current;

  const scrollValueInterpolated = scrollValue.interpolate({
    inputRange: [0, 1000],
    outputRange: [0, 1],
  });

  return (
    <View style={globalStyles.flex}>
      <Header scrollValue={scrollValueInterpolated} />
      <FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollValue}}}],
          {useNativeDriver: false},
        )}
        showsVerticalScrollIndicator={false}
        data={songs}
        ListFooterComponent={<View style={styles.footer} />}
        refreshControl={
          <RefreshControl
            progressViewOffset={HEADER_HEIGHT}
            refreshing={loading}
            onRefresh={refetch}
          />
        }
        renderItem={({item}) => <ListItem {...item} />}
        ListEmptyComponent={<ActivityIndicator size="large" />}
      />
      <BottomBar />
    </View>
  );
};

export default Home;
