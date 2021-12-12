import {FC} from 'react';
import {Modal, ModalProps, Text} from 'react-native';

const SearchModal: FC<ModalProps> = props => {
  return (
    <Modal {...props}>
      <Text>Search</Text>
    </Modal>
  );
};

export default SearchModal;
