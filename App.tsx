import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {StackParamList} from './src/helpers/types';
import {History, Home, Song} from './src/pages';
import Favorites from './src/pages/Favorites';
import {AuthProvider, SongListProvider} from './src/providers';
import ModalProvider from './src/providers/ModalProvider';

const Stack = createNativeStackNavigator<StackParamList>();

const App: FC = () => {
  return (
    <AuthProvider>
      <SongListProvider>
        <ModalProvider>
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
      </SongListProvider>
    </AuthProvider>
  );
};
export default App;
