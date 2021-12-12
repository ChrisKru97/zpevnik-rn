import {FC, useCallback, useRef, useState} from 'react';
import {Animated, GestureResponderEvent, StyleSheet, View} from 'react-native';
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
      right: -HANDLE_WIDTH - 8,
      bottom: BOTTOM_BAR_HEIGHT,
      width: HANDLE_WIDTH,
    },
    handle: {
      right: 8,
      position: 'absolute',
      width: HANDLE_WIDTH,
      height: HANDLE_HEIGHT,
      backgroundColor: colors.secondary,
      borderRadius: 12,
    },
  });

interface Props {
  scrollValue: Animated.AnimatedInterpolation;
  setScrollRatio: (ratioDiff: number) => void;
  setFinalScrollRatio: (ratioDiff: number) => void;
}

const ScrollBar: FC<Props> = ({
  scrollValue,
  setScrollRatio,
  setFinalScrollRatio,
}) => {
  const {colors} = useTheme();
  const {top: safeTop} = useSafeAreaInsets();
  const [height, setHeight] = useState<number>(0);
  const startPosition = useRef<number>();
  const styles = createStyles(colors);

  const onDrag = useCallback(
    (e: GestureResponderEvent) => {
      const diff = e.nativeEvent.pageY - startPosition.current!;
      const ratioDiff = diff / (height - HANDLE_HEIGHT);
      setScrollRatio(ratioDiff);
    },
    [height, setScrollRatio],
  );

  const onStart = useCallback((e: GestureResponderEvent) => {
    startPosition.current = e.nativeEvent.pageY;
    return true;
  }, []);

  const onEnd = useCallback(
    (e: GestureResponderEvent) => {
      const diff = e.nativeEvent.pageY - startPosition.current!;
      const ratioDiff = diff / (height - HANDLE_HEIGHT);
      setFinalScrollRatio(ratioDiff);
      startPosition.current = undefined;
    },
    [height, setFinalScrollRatio],
  );

  const top = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height - HANDLE_HEIGHT],
  });

  return (
    <View
      style={[styles.wrapper, {top: safeTop + HEADER_HEIGHT}]}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      <Animated.View
        onResponderMove={onDrag}
        onResponderRelease={onEnd}
        onStartShouldSetResponder={onStart}
        style={[styles.handle, {top}]}
      />
    </View>
  );
};
export default ScrollBar;
