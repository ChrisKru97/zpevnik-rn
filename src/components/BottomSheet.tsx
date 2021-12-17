import {FC} from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import {spacing} from '../helpers/spacing';
import {useModal} from '../hooks';

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    elevation: 4,
  },
});

const BottomSheet: FC<ModalProps> = ({children, ...rest}) => {
  const setModalOpen = useModal();
  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={() => setModalOpen(undefined)}
      {...rest}>
      <View style={[styles.body, spacing.p4, spacing.mx4]}>{children}</View>
    </Modal>
  );
};

export default BottomSheet;
