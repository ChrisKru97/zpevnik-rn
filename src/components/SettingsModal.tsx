import {FC} from 'react';
import {Switch, Text, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useConfig, useModal, useTheme} from '../hooks';
import {BottomSheet, Button} from '.';

interface Props {
  visible: boolean;
}

const SettingsModal: FC<Props> = ({visible}) => {
  const {showChords, setShowChords} = useConfig();
  const {isDarkMode, setDarkMode, colors} = useTheme();
  const setModalOpen = useModal();
  return (
    <BottomSheet visible={visible} style={globalStyles.alignCenter}>
      <View style={[globalStyles.row, spacing.mb4]}>
        <Text style={[globalStyles.text, {color: colors.black}]}>
          Ukázat akordy
        </Text>
        <Switch
          trackColor={{
            false: colors.gray,
            true: colors.gray,
          }}
          thumbColor={isDarkMode ? colors.black : colors.primarySoft}
          style={spacing.ml4}
          value={showChords}
          onValueChange={setShowChords}
        />
      </View>
      <View style={[globalStyles.row, spacing.mb4]}>
        <Text style={[globalStyles.text, {color: colors.black}]}>
          Tmavý režim
        </Text>
        <Switch
          trackColor={{
            false: colors.gray,
            true: colors.gray,
          }}
          thumbColor={isDarkMode ? colors.black : colors.primarySoft}
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
