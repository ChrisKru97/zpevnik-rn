import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FC, useMemo, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Heart} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {SPACING, spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';

export const HEADER_HEIGHT = 55;

const createStyles = (colors: Theme, safeTop: number) =>
  StyleSheet.create({
    wrapper: {
      height: HEADER_HEIGHT,
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
const DEFAULT_FONT_SIZE = 25;

const Header: FC<Props> = ({title: titleProp, number}) => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const styles = createStyles(colors, top);
  const {name} = useRoute();
  const navigation = useNavigation();
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);

  const isRoot = name === 'Home';

  // const maxWidth = isRoot ? width : width - (ICON_SIZE + 6 * SPACING);

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

  return (
    <>
      <View style={styles.spacer} />
      <View
        style={[
          styles.wrapper,
          globalStyles.row,
          !!number && globalStyles.spaceBetween,
        ]}>
        {!isRoot && (
          <Pressable onPress={navigation.goBack}>
            <IconOutline
              style={spacing.mx4}
              name="left"
              color="white"
              size={ICON_SIZE}
            />
          </Pressable>
        )}
        <Text
          // onLayout={e => {
          //   if (e.nativeEvent.layout.width > maxWidth) {
          //     setFontSize(fontSize - 1);
          //   }
          // }}
          style={[
            styles.title,
            isRoot && [styles.alignCenter, globalStyles.flex],
            {fontSize},
          ]}>
          {title}
        </Text>
        {number && (
          <Heart number={number} style={spacing.mx4} color="white" size={22} />
        )}
      </View>
    </>
  );
};

export default Header;
