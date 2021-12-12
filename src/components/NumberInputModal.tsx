import {FC} from 'react';
import {Modal, ModalProps, Text} from 'react-native';

const NumberInputModal: FC<ModalProps> = props => {
  return (
    <Modal {...props}>
      <Text>Number niput</Text>
    </Modal>
  );
};

export default NumberInputModal;
