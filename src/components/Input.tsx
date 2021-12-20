import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useTheme} from '../hooks';

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    wrapper: {
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.black,
      color: colors.black,
    },
  });

const Input: FC<TextInputProps> = ({style, ...props}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  return (
    <TextInput
      style={[styles.wrapper, spacing.py2, spacing.px4, style]}
      {...props}
    />
  );
};

export default Input;
