import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FC, useMemo} from 'react';
import {Text, View} from 'react-native';

const Header: FC<NativeStackHeaderProps> = ({route: {name}}) => {
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
    <View>
      <Text>{title}</Text>
    </View>
  );
};
export default Header;
