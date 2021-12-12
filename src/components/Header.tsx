import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FC, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
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
      fontSize: 25,
      textAlign: 'center',
    },
    spacer: {height: safeTop, backgroundColor: colors.primary},
  });

interface Props {
  onPress?: () => void;
  title?: string;
}

const Header: FC<Props> = ({onPress, title: titleProp}) => {
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

  return (
    <>
      <View style={styles.spacer} />
      <Pressable
        onPress={onPress}
        style={[styles.wrapper, globalStyles.row, globalStyles.spaceBetween]}>
        {isRoot ? (
          <View style={globalStyles.flex} />
        ) : (
          <Pressable style={globalStyles.flex} onPress={navigation.goBack}>
            <IconOutline
              style={spacing.ml3}
              name="left"
              color="white"
              size={22}
            />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={globalStyles.flex} />
      </Pressable>
    </>
  );
};
export default Header;
