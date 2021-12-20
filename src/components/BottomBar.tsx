import {Pressable, StyleSheet, View} from 'react-native';
import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useModal, useTheme} from '../hooks';
import {ModalType, StackParamList} from '../helpers/types';

export const BOTTOM_BAR_HEIGHT = 72;

const styles = StyleSheet.create({
  wrapper: {
    height: BOTTOM_BAR_HEIGHT,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: '#0000007F',
  },
  iconWrapper: {
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
  // {
  //   icon: 'edit',
  //   screen: 'Edit',
  // },
  // {
  //   icon: 'user',
  //   screen: 'Account',
  // },
];

const BottomBar = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const {colors, isDarkMode} = useTheme();
  const openModal = useModal();

  return (
    <View
      style={[
        globalStyles.row,
        styles.wrapper,
        spacing.py4,
        isDarkMode && {backgroundColor: colors.primarySoft},
      ]}>
      {items.map(({icon, screen, modal}) => (
        <Pressable
          hitSlop={8}
          key={icon}
          onPress={() => {
            if (screen) {
              navigation.navigate(screen);
            } else if (modal) {
              openModal(modal);
            }
          }}>
          <View
            style={[
              styles.iconWrapper,
              spacing.p2,
              {backgroundColor: colors.white},
            ]}>
            <IconOutline color={colors.black} name={icon} size={24} />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default BottomBar;
