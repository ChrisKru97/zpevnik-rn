import {FC} from 'react';
import {ModalProps, Switch, Text, View} from 'react-native';
import {BottomSheet, Button} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useConfig, useModal, useTheme} from '../hooks';

const SettingsModal: FC<ModalProps> = props => {
  const {showChords, setShowChords} = useConfig();
  const {isDarkMode, setDarkMode} = useTheme();
  const setModalOpen = useModal();
  return (
    <BottomSheet {...props} style={globalStyles.alignCenter}>
      <View style={[globalStyles.row, spacing.mb4]}>
        <Text style={globalStyles.text}>Ukázat akordy</Text>
        <Switch
          style={spacing.ml4}
          value={showChords}
          onValueChange={setShowChords}
        />
      </View>
      <View style={[globalStyles.row, spacing.mb4]}>
        <Text style={globalStyles.text}>Tmavý režim</Text>
        <Switch
          style={spacing.ml4}
          value={isDarkMode}
          onValueChange={setDarkMode}
        />
      </View>
      <Button onPress={() => setModalOpen(undefined)} text="Zavřít" />
    </BottomSheet>
  );
};

export default SettingsModal;
