import {FC} from 'react';
import {
  Dimensions,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useModal, useSongList} from '../hooks';

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {justifyContent: 'center', alignItems: 'center', flex: 1},
  body: {
    width: dimensions.width / 2,
    height: 200,
    backgroundColor: 'white',
  },
});

const SearchModal: FC<ModalProps> = props => {
  const {search} = useSongList();
  const setModalOpen = useModal();
  return (
    <Modal animationType="slide" transparent {...props}>
      <View style={styles.wrapper}>
        <View style={styles.body}>
          <TextInput onChangeText={search} />
          <Pressable onPress={() => setModalOpen(undefined)}>
            <Text>Zavřít</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
