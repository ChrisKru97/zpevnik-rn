import {StyleSheet, View} from 'react-native';
import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useModal} from '../hooks';
import {ModalType, StackParamList} from '../helpers/types';

export const BOTTOM_BAR_HEIGHT = 72;

const styles = StyleSheet.create({
  wrapper: {
    height: BOTTOM_BAR_HEIGHT,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#0000007F',
    justifyContent: 'space-evenly',
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

type Item = {
  icon: OutlineGlyphMapType;
  screen?: keyof StackParamList;
  modal?: ModalType;
};

const items: Item[] = [
  {
    icon: 'heart',
    screen: 'Favorites',
  },
  {
    icon: 'search',
    modal: ModalType.search,
  },
  {
    icon: 'number',
    modal: ModalType.numberInput,
  },
  {
    icon: 'history',
    screen: 'History',
  },
  {
    icon: 'setting',
    modal: ModalType.settings,
  },
  {
    icon: 'edit',
    screen: 'Edit',
  },
  {
    icon: 'user',
    screen: 'Account',
  },
];

const BottomBar = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const openModal = useModal();

  return (
    <View style={[globalStyles.row, styles.wrapper, spacing.py4]}>
      {items.map(({icon, screen, modal}) => (
        <View key={icon} style={[styles.iconWrapper, spacing.p2]}>
          <IconOutline
            onPress={() => {
              if (screen) {
                navigation.navigate(screen);
              } else if (modal) {
                openModal(modal);
              }
            }}
            name={icon}
            size={24}
          />
        </View>
      ))}
    </View>
  );
};

export default BottomBar;
