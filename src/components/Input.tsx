import {FC, useEffect, useRef} from 'react';
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

const Input: FC<TextInputProps> = ({style, autoFocus, ...props}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      inputRef.current?.blur();
    }
  }, [autoFocus]);

  return (
    <TextInput
      ref={inputRef}
      autoCorrect={false}
      selectionColor={colors.primary}
      autoCapitalize="none"
      style={[styles.wrapper, spacing.py2, spacing.px4, style]}
      {...props}
    />
  );
};

export default Input;
