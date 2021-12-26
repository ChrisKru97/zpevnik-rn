import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActiveList, Header} from '../components';
import {globalStyles} from '../helpers/globalStyles';
import {Theme} from '../helpers/theme';
import {useAuth, useTheme} from '../hooks';

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    text: {
      fontSize: 18,
      color: colors.black,
    },
  });

const Account: FC = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {loginType} = useAuth();

  return (
    <View style={globalStyles.flex}>
      <Header />
      <ActiveList />
      {/* {loginType === LoginType.Anonymous && <LoginForm />}
      {loginType !== LoginType.Anonymous && (
        <>
          <Text style={styles.text}>Email: {'ch@gma.com'}</Text>
          <Text style={styles.text}>Status: {'uživatel'}</Text>
          <ActiveList />
        </>
      )} */}
    </View>
  );
};

export default Account;
