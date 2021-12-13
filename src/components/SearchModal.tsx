import {FC} from 'react';
import {Modal, ModalProps, Text} from 'react-native';

const SearchModal: FC<ModalProps> = props => {
  return (
    <Modal animationType="slide" transparent {...props}>
      <Text>Search</Text>
    </Modal>
  );
};

export default SearchModal;
