import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {Header} from './src/components';
import {History, Home, Song} from './src/pages';
import Favorites from './src/pages/Favorites';
import {AuthProvider, SongListProvider} from './src/providers';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <AuthProvider>
      <SongListProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{header: props => <Header {...props} />}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Song" component={Song} />
          </Stack.Navigator>
        </NavigationContainer>
      </SongListProvider>
    </AuthProvider>
  );
};
export default App;
