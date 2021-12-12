import {useRoute} from '@react-navigation/native';
import {FC, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../helpers/globalStyles';
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
}

const Header: FC<Props> = ({onPress}) => {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();
  const styles = createStyles(colors, top);
  const {name} = useRoute();

  const title = useMemo(() => {
    switch (name) {
      case 'Home':
        return 'Mládežový zpěvník';
      case 'Favorites':
        return 'Oblíbené';
      case 'History':
        return 'Poslední otevřené';
    }
  }, [name]);

  return (
    <>
      <View style={styles.spacer} />
      <Pressable
        onPress={onPress}
        style={[styles.wrapper, globalStyles.row, globalStyles.spaceBetween]}>
        <View style={globalStyles.flex} />
        <Text style={styles.title}>{title}</Text>
        <View style={globalStyles.flex} />
      </Pressable>
    </>
  );
};
export default Header;
