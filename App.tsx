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
  HistoryProvider,
} from './src/providers';

const Stack = createNativeStackNavigator<StackParamList>();

const App: FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <SongListProvider>
        <HistoryProvider>
          <ConfigProvider>
            <CustomStatusBar />
            <NavigationContainer>
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
            </NavigationContainer>
          </ConfigProvider>
        </HistoryProvider>
      </SongListProvider>
    </AuthProvider>
  </ThemeProvider>
);
export default App;
