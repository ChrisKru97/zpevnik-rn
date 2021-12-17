import {FC} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {ListItem, BottomBar, Header} from '../components';
import {BOTTOM_BAR_HEIGHT} from '../components/BottomBar';
import {HEADER_HEIGHT} from '../components/Header';
import {globalStyles} from '../helpers/globalStyles';
import {SPACING} from '../helpers/spacing';
import {useSongList} from '../hooks';

const styles = StyleSheet.create({
  footer: {height: BOTTOM_BAR_HEIGHT},
});

const Home: FC = () => {
  const {songs, loading, refetch} = useSongList();

  return (
    <View style={globalStyles.flex}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={songs}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<View style={styles.footer} />}
        refreshControl={
          <RefreshControl
            progressViewOffset={HEADER_HEIGHT + SPACING * 4}
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
