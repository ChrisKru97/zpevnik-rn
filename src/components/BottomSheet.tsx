import {FC, useEffect, useRef, useState} from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {spacing} from '../helpers/spacing';
import {useTheme} from '../hooks';

const styles = StyleSheet.create({
  body: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    elevation: 6,
  },
});

interface Props {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
}

const BottomSheet: FC<Props> = ({children, visible, style}) => {
  const {colors, isDarkMode} = useTheme();
  const [height, setHeight] = useState<number>(100);
  const animationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animationRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [animationRef, visible]);

  const translateY = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <Animated.View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={[
        styles.body,
        spacing.p4,
        spacing.mx4,
        {
          transform: [{translateY}],
          opacity: animationRef,
          backgroundColor: isDarkMode ? colors.primarySoft : colors.background,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

export default BottomSheet;
