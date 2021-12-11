import {StyleSheet, View} from 'react-native';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#0000007F',
    justifyContent: 'space-around',
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

const BottomBar = () => {
  return (
    <View style={[globalStyles.row, styles.wrapper, spacing.p4]}>
      <View style={[styles.iconWrapper, spacing.p2]}>
        <IconFill name="heart" size={24} />
      </View>
      <View style={[styles.iconWrapper, spacing.p2]}>
        <IconOutline name="search" size={24} />
      </View>
      <View style={[styles.iconWrapper, spacing.p2]}>
        <IconFill name="code" size={24} />
      </View>
      <View style={[styles.iconWrapper, spacing.p2]}>
        <IconOutline name="history" size={24} />
      </View>
      <View style={[styles.iconWrapper, spacing.p2]}>
        <IconFill name="setting" size={24} />
      </View>
    </View>
  );
};

export default BottomBar;
