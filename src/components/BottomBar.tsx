import { Pressable, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { globalStyles } from '../helpers/globalStyles';
import { spacing } from '../helpers/spacing';
import { useModal, useTheme } from '../hooks';
import { ModalType, StackParamList } from '../helpers/types';
import Icons from './Icons';

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
  Icon: ReactNode;
  screen?: keyof StackParamList;
  modal?: ModalType;
};

const items = Object.freeze<Item[]>([
  {
    Icon: Icons.Heart,
    screen: 'Favorites' as const,
  },
  {
    Icon: Icons.Search,
    modal: ModalType.search,
  },
  {
    Icon: Icons.Number,
    modal: ModalType.numberInput,
  },
  {
    Icon: Icons.History,
    screen: 'History' as const,
  },
  {
    Icon: Icons.Setting,
    modal: ModalType.settings,
  },
]);

const BottomBar = () => {
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();
  const { colors, isDarkMode } = useTheme();
  const openModal = useModal();

  return (
    <View
      style={[
        globalStyles.row,
        styles.wrapper,
        spacing.py4,
        isDarkMode && { backgroundColor: colors.primarySoft },
      ]}>
      {items.map(({ Icon, screen, modal }, index) => (
        <Pressable
          hitSlop={8}
          key={index}
          onPress={() => {
            if (screen) {
              navigate(screen);
            } else if (modal) {
              openModal(modal);
            }
          }}>
          <View
            style={[
              styles.iconWrapper,
              spacing.p2,
              { backgroundColor: colors.white },
            ]}>
            <Icon />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default BottomBar;
