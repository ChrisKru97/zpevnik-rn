import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});
