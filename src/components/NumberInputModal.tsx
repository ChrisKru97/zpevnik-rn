import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC, useCallback, useState} from 'react';
import {View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {StackParamList} from '../helpers/types';
import {useModal, useSongList} from '../hooks';
import {BottomSheet, Button, Input} from '.';

interface Props {
  visible: boolean;
}

const NumberInputModal: FC<Props> = ({visible}) => {
  const [number, setNumber] = useState<number>();
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const setModalOpen = useModal();
  const {songs} = useSongList();

  const submit = useCallback(() => {
    if (!number) {
      return;
    }
    const song = songs.find(item => number === item.number);
    if (!song) {
      return;
    }
    navigation.navigate('Song', song);
    setNumber(undefined);
    setModalOpen(undefined);
  }, [navigation, number, setModalOpen, songs]);

  return (
    <BottomSheet visible={visible}>
      <Input
        onSubmitEditing={submit}
        keyboardType="numeric"
        autoFocus={visible}
        style={spacing.mb4}
        value={number?.toString() ?? ''}
        onChangeText={value => {
          if (!value) {
            setNumber(undefined);
          }
          if (!/^\d+$/.test(value)) {
            return;
          }
          const numberValue = +value;
          if (numberValue > songs.length + 1) {
            return;
          }
          setNumber(numberValue);
        }}
      />
      <View style={[globalStyles.row, globalStyles.spaceAround]}>
        <Button text="Otevřít" onPress={submit} />
        <Button
          text="Zrušit"
          onPress={() => {
            setNumber(undefined);
            setModalOpen(undefined);
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default NumberInputModal;
