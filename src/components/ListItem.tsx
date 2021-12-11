import {IconFill} from '@ant-design/icons-react-native';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Song} from '../helpers/types';

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#bfbfbf',
  },
});

const ListItem: FC<Song> = ({name, number}) => {
  return (
    <View
      style={[
        spacing.p4,
        globalStyles.row,
        styles.borderBottom,
        globalStyles.spaceBetween,
      ]}>
      <Text style={[globalStyles.text, globalStyles.bold]}>
        {number}.&nbsp;{name}
      </Text>
      <IconFill name="heart" size={20} />
    </View>
  );
};

export default ListItem;
