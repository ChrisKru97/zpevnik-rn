import {FC} from 'react';
import {Modal, ModalProps, Text} from 'react-native';

const SettingsModal: FC<ModalProps> = props => {
  return (
    <Modal {...props}>
      <Text>Settings</Text>
    </Modal>
  );
};

export default SettingsModal;
