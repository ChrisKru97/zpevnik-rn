import {FC} from 'react';
import {View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useModal, useSongList} from '../hooks';
import {BottomSheet, Button, Input} from '.';

interface Props {
  visible: boolean;
}

const SearchModal: FC<Props> = ({visible}) => {
  const {search, searchValue} = useSongList();
  const setModalOpen = useModal();
  return (
    <BottomSheet visible={visible}>
      <Input
        onSubmitEditing={() => setModalOpen(undefined)}
        autoFocus={visible}
        style={spacing.mb4}
        value={searchValue}
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
