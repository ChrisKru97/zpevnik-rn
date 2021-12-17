import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FC, useState} from 'react';
import {ModalProps, View} from 'react-native';
import {BottomSheet, Button, Input} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {StackParamList} from '../helpers/types';
import {useModal, useSongList} from '../hooks';

const NumberInputModal: FC<ModalProps> = props => {
  const [number, setNumber] = useState<number>();
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const setModalOpen = useModal();
  const {songs} = useSongList();

  return (
    <BottomSheet {...props}>
      <Input
        keyboardType="numeric"
        autoFocus
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
        <Button
          text="Otevřít"
          onPress={() => {
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
          }}
        />
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
