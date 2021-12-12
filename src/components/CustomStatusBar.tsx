import {FC} from 'react';
import {StatusBar} from 'react-native';
import {useTheme} from '../hooks';

const CustomStatusBar: FC = () => {
  const {colors} = useTheme();

  return (
    <StatusBar
      backgroundColor={colors.primarySoft}
      translucent
      barStyle="light-content"
    />
  );
};

export default CustomStatusBar;
