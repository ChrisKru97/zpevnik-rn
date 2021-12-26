import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useConfig, useTheme} from '../hooks';
import Icons from './Icons';

const BORDER_RADIUS = 6;

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    leftButton: {
      borderTopLeftRadius: BORDER_RADIUS,
      borderBottomLeftRadius: BORDER_RADIUS,
    },
    rightButton: {
      borderTopRightRadius: BORDER_RADIUS,
      borderBottomRightRadius: BORDER_RADIUS,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor: colors.secondary,
    },
    inactive: {
      backgroundColor: colors.gray,
    },
  });

const TextAlignButtons: FC = () => {
  const {colors} = useTheme();
  const {
    config: {textAlign},
    setConfigPart,
  } = useConfig();
  const styles = createStyles(colors);

  const isLeftSelected = textAlign === 'left';

  return (
    <View style={[globalStyles.row, spacing.ml4]}>
      <Pressable
        onPress={() => setConfigPart({textAlign: 'left'})}
        style={[
          spacing.px4,
          spacing.py2,
          styles.button,
          styles.leftButton,
          isLeftSelected ? styles.active : styles.inactive,
        ]}>
        <Icons.AlignLeft />
      </Pressable>
      <Pressable
        onPress={() => setConfigPart({textAlign: 'center'})}
        style={[
          spacing.px4,
          spacing.py2,
          styles.button,
          styles.rightButton,
          isLeftSelected ? styles.inactive : styles.active,
        ]}>
        <Icons.AlignCenter />
      </Pressable>
    </View>
  );
};

export default TextAlignButtons;
