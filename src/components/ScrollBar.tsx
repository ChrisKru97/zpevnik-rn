import {FC, RefObject, useCallback, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {
  FlatList,
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';
import {BOTTOM_BAR_HEIGHT} from './BottomBar';
import {HEADER_HEIGHT} from './Header';

const HANDLE_HEIGHT = 60;
const HANDLE_WIDTH = 30;

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      right: 8,
      bottom: BOTTOM_BAR_HEIGHT,
      width: HANDLE_WIDTH,
    },
    handle: {
      position: 'absolute',
      width: HANDLE_WIDTH,
      height: HANDLE_HEIGHT,
      backgroundColor: colors.secondary,
      borderRadius: 12,
      zIndex: 10,
      elevation: 2,
    },
  });

interface Props {
  scrollRef: RefObject<FlatList>;
  scrollValue: Animated.Value;
}

const ScrollBar: FC<Props> = ({scrollRef, scrollValue}) => {
  const {colors} = useTheme();
  const {top: safeTop} = useSafeAreaInsets();
  const [height, setHeight] = useState<number>(0);
  const styles = createStyles(colors);
  const onDrag = useCallback(e => {
    console.log(e);
  }, []);

  const top = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height - HANDLE_HEIGHT],
  });

  return (
    <View
      style={[styles.wrapper, {top: safeTop + HEADER_HEIGHT}]}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      <PanGestureHandler onGestureEvent={onDrag} maxPointers={1} hitSlop={16}>
        <Animated.View style={[styles.handle, {top}]} />
      </PanGestureHandler>
    </View>
  );
};
// export default ScrollBar
export default gestureHandlerRootHOC(ScrollBar);
