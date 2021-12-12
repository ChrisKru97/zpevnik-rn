import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors, Theme} from '../helpers/theme';

interface ThemeContextType {
  colors: Theme;
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

const DARK_MODE_KEY = '@darkMode';

const ThemeProvider: FC = ({children}) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    systemScheme === 'dark',
  );

  useEffect(() => {
    AsyncStorageLib.getItem(DARK_MODE_KEY).then(value => {
      if (value === 'true') {
        setIsDarkMode(true);
      } else if (value === 'false') {
        setIsDarkMode(false);
      }
    });
  }, []);

  const setDarkMode = useCallback((darkMode: boolean) => {
    setIsDarkMode(darkMode);
    AsyncStorageLib.setItem(DARK_MODE_KEY, `${darkMode}`);
  }, []);

  const value = useMemo(
    () => ({
      setDarkMode,
      colors: isDarkMode ? darkColors : lightColors,
      isDarkMode,
    }),
    [isDarkMode, setDarkMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
