import {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {Button, Input} from '.';

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <View style={[globalStyles.flex, spacing.p4]}>
      <Text>E-mail</Text>
      <Input
        autoFocus
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        style={spacing.mb4}
      />
      <Text>Heslo</Text>
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Heslo"
        secureTextEntry
        style={spacing.mb4}
      />
      <Button text="Přihlásit se" style={spacing.mb4} />
      <Button text="Registrovat se" style={spacing.mb4} />
      <Button text="Přihlásit se přes google" />
    </View>
  );
};

export default LoginForm;
