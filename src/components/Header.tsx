import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FC, useMemo} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';
import DarkModeSwitch from './DarkModeSwitch';

export const HEADER_HEIGHT = 55;

const createStyles = (colors: Theme, safeTop: number) =>
  StyleSheet.create({
    wrapper: {
      height: HEADER_HEIGHT,
      backgroundColor: colors.primary,
    },
    title: {
      color: 'white',
      fontSize: 25,
      textAlign: 'center',
    },
    spacer: {height: safeTop, backgroundColor: colors.primary},
    switch: {position: 'absolute', right: 0},
    absolute: {
      position: 'absolute',
    },
  });

interface Props {
  title?: string;
  scrollValue?: Animated.AnimatedInterpolation;
}

const Header: FC<Props> = ({title: titleProp, scrollValue}) => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const styles = createStyles(colors, top);
  const {name} = useRoute();
  const navigation = useNavigation();

  const isRoot = name === 'Home';

  const title = useMemo(() => {
    if (titleProp) {
      return titleProp;
    }
    switch (name) {
      case 'Home':
        return 'Mládežový zpěvník';
      case 'Favorites':
        return 'Oblíbené';
      case 'History':
        return 'Poslední otevřené';
    }
  }, [name, titleProp]);

  if (!isRoot || !scrollValue) {
    return (
      <>
        <View style={styles.spacer} />
        <View
          style={[styles.wrapper, globalStyles.row, globalStyles.spaceBetween]}>
          <Pressable style={globalStyles.flex} onPress={navigation.goBack}>
            <IconOutline
              style={spacing.ml3}
              name="left"
              color="white"
              size={22}
            />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
          <View style={globalStyles.flex} />
        </View>
      </>
    );
  }

  const height = scrollValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [80, 55, 0],
    extrapolate: 'clamp',
  });

  const left = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['5%', '50%'],
    extrapolate: 'clamp',
  });

  const translateX = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const opacity = scrollValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const switchOpacity = scrollValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View style={styles.spacer} />
      <Animated.View style={[styles.wrapper, {height}, globalStyles.row]}>
        <Animated.Text
          style={[
            styles.title,
            styles.absolute,
            {
              left,
              transform: [{translateX}],
              opacity,
            },
          ]}>
          {title}
        </Animated.Text>
        <Animated.View
          style={[styles.switch, spacing.mr4, {opacity: switchOpacity}]}>
          <DarkModeSwitch />
        </Animated.View>
      </Animated.View>
    </>
  );
};
export default Header;
