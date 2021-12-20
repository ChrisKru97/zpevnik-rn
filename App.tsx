import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC, useMemo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CustomStatusBar} from './src/components';
import {StackParamList} from './src/helpers/types';
import {useTheme} from './src/hooks';
import {History, Home, Song} from './src/pages';
import Favorites from './src/pages/Favorites';
import {
  AuthProvider,
  SongListProvider,
  ModalProvider,
  ThemeProvider,
  ConfigProvider,
  HistoryProvider,
} from './src/providers';

const Stack = createNativeStackNavigator<StackParamList>();

const CustomNavigationContainer: FC = ({children}) => {
  const {colors, isDarkMode} = useTheme();

  const navigationTheme = useMemo(
    () => ({
      dark: isDarkMode,
      colors: {
        background: colors.background,
        notification: colors.secondary,
        primary: colors.primary,
        text: colors.black,
        border: colors.gray,
        card: colors.white,
      },
    }),
    [colors, isDarkMode],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
};

const CustomSafeAreaProvider: FC = ({children}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaProvider style={{backgroundColor: colors.background}}>
      {children}
    </SafeAreaProvider>
  );
};

const App: FC = () => (
  <ThemeProvider>
    <CustomSafeAreaProvider>
      <AuthProvider>
        <SongListProvider>
          <HistoryProvider>
            <ConfigProvider>
              <CustomStatusBar />
              <CustomNavigationContainer>
                <ModalProvider>
                  <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="History" component={History} />
                    <Stack.Screen name="Favorites" component={Favorites} />
                    <Stack.Screen name="Song" component={Song} />
                  </Stack.Navigator>
                </ModalProvider>
              </CustomNavigationContainer>
            </ConfigProvider>
          </HistoryProvider>
        </SongListProvider>
      </AuthProvider>
    </CustomSafeAreaProvider>
  </ThemeProvider>
);
export default App;
