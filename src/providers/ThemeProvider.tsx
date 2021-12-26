import {createContext, FC} from 'react';
import {useColorScheme} from 'react-native';
import {useMMKVBoolean} from 'react-native-mmkv';
import {darkColors, lightColors, Theme} from '../helpers/theme';

interface ThemeContextType {
  colors: Theme;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

const DARK_MODE_KEY = '@darkMode';

const ThemeProvider: FC = ({children}) => {
  const systemScheme = useColorScheme();
  const [isDarkMode = systemScheme === 'dark', setIsDarkMode] =
    useMMKVBoolean(DARK_MODE_KEY);

  return (
    <ThemeContext.Provider
      value={{
        setIsDarkMode,
        colors: isDarkMode ? darkColors : lightColors,
        isDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
