import {useNavigation, useRoute} from '@react-navigation/native';
import {FC, useMemo} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';
import {Heart, Icons} from '.';

export const HEADER_HEIGHT = 55;

const createStyles = (colors: Theme, safeTop: number) =>
  StyleSheet.create({
    wrapper: {
      height: HEADER_HEIGHT,
      maxHeight: HEADER_HEIGHT,
      backgroundColor: colors.primary,
    },
    title: {
      color: 'white',
    },
    alignCenter: {
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
  number?: number;
}

const ICON_SIZE = 22;

const Header: FC<Props> = ({title: titleProp, number}) => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const styles = createStyles(colors, top);
  const {name} = useRoute();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const isRoot = name === 'Home';

  const title = useMemo(() => {
    if (titleProp && number) {
      return `${number}. ${titleProp}`;
    }
    switch (name) {
      case 'Home':
        return 'Mládežový zpěvník';
      case 'Favorites':
        return 'Oblíbené';
      case 'History':
        return 'Poslední otevřené';
      case 'Account':
        return 'Účet';
    }
  }, [name, number, titleProp]);

  return (
    <>
      <View style={styles.spacer} />
      <View
        style={[
          globalStyles.flex,
          styles.wrapper,
          globalStyles.row,
          globalStyles.spaceBetween,
        ]}>
        {isRoot ? (
          <View style={globalStyles.flex} />
        ) : (
          <Pressable onPress={navigation.goBack} hitSlop={16}>
            <Icons.Left />
          </Pressable>
        )}
        {title && (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {fontSize: 1.5 * (width / Math.max(20, title?.length))},
            ]}>
            {title}
          </Text>
        )}
        {isRoot || !number ? (
          <View style={globalStyles.flex} />
        ) : (
          <Heart number={number} style={spacing.mx4} color="white" size={22} />
        )}
      </View>
    </>
  );
};

export default Header;
