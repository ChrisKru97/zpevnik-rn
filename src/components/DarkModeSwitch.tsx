import {FC} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useTheme} from '../hooks';

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  white: {
    backgroundColor: 'white',
  },
  black: {
    backgroundColor: 'black',
  },
});

const DarkModeSwitch: FC = () => {
  const {isDarkMode, setDarkMode} = useTheme();

  return (
    <View style={globalStyles.row}>
      <View style={[styles.circle, styles.white]} />
      <Switch
        style={spacing.mx2}
        value={isDarkMode}
        onValueChange={setDarkMode}
      />
      <View style={[styles.circle, styles.black]} />
    </View>
  );
};

export default DarkModeSwitch;
