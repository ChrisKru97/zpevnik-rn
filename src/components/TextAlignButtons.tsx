import {IconOutline} from '@ant-design/icons-react-native';
import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useConfig, useTheme} from '../hooks';

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
  const {textAlign, setTextAlign} = useConfig();
  const styles = createStyles(colors);

  const isLeftSelected = textAlign === 'left';

  return (
    <View style={[globalStyles.row, spacing.ml4]}>
      <Pressable
        onPress={() => setTextAlign('left')}
        style={[
          spacing.px4,
          spacing.py2,
          styles.button,
          styles.leftButton,
          isLeftSelected ? styles.active : styles.inactive,
        ]}>
        <IconOutline
          name="align-left"
          size={20}
          color={isLeftSelected ? 'white' : 'black'}
        />
      </Pressable>
      <Pressable
        onPress={() => setTextAlign('center')}
        style={[
          spacing.px4,
          spacing.py2,
          styles.button,
          styles.rightButton,
          isLeftSelected ? styles.inactive : styles.active,
        ]}>
        <IconOutline
          name="align-center"
          size={20}
          color={isLeftSelected ? 'black' : 'white'}
        />
      </Pressable>
    </View>
  );
};

export default TextAlignButtons;
