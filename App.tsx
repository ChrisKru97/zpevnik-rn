import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {CustomStatusBar} from './src/components';
import {StackParamList} from './src/helpers/types';
import {History, Home, Song} from './src/pages';
import Favorites from './src/pages/Favorites';
import {
  AuthProvider,
  SongListProvider,
  ModalProvider,
  ThemeProvider,
  ConfigProvider,
} from './src/providers';

const Stack = createNativeStackNavigator<StackParamList>();

const App: FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SongListProvider>
          <ConfigProvider>
            <ModalProvider>
              <CustomStatusBar />
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="History" component={History} />
                  <Stack.Screen name="Favorites" component={Favorites} />
                  <Stack.Screen name="Song" component={Song} />
                </Stack.Navigator>
              </NavigationContainer>
            </ModalProvider>
          </ConfigProvider>
        </SongListProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
