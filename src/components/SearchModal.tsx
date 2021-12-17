import {FC} from 'react';
import {ModalProps, View} from 'react-native';
import {BottomSheet, Button, Input} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useModal, useSongList} from '../hooks';

const SearchModal: FC<ModalProps> = props => {
  const {search, searchValue} = useSongList();
  const setModalOpen = useModal();
  return (
    <BottomSheet {...props}>
      <Input
        autoFocus
        style={spacing.mb4}
        defaultValue={searchValue}
        onChangeText={search}
      />
      <View style={[globalStyles.row, globalStyles.spaceAround]}>
        <Button text="Hledat" onPress={() => setModalOpen(undefined)} />
        <Button
          text="Zrušit"
          onPress={() => {
            search('');
            setModalOpen(undefined);
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default SearchModal;
