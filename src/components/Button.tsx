import {FC} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    wrapper: {
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
    text: {
      color: 'white',
      fontSize: 16,
    },
  });

interface Props extends PressableProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({style, text, ...props}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  return (
    <Pressable
      style={[styles.wrapper, spacing.px4, spacing.py2, style]}
      {...props}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
