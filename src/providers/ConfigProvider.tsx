import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {TextStyle} from 'react-native';

enum CONFIG_KEY {
  FontSize = '@fontSize',
  ShowChords = '@showChords',
  TextAlign = '@textAlign',
}

type TextAlign = TextStyle['textAlign'];

interface ConfigContextType {
  fontSize: number;
  showChords: boolean;
  textAlign: TextAlign;
  setFontSize: (fontSize: number) => void;
  setShowChords: (showChords: boolean) => void;
  setTextAlign: (textAlign: TextAlign) => void;
}

export const ConfigContext = createContext<ConfigContextType>(
  {} as ConfigContextType,
);

const ConfigProvider: FC = ({children}) => {
  const [fontSize, setFontSize] = useState<number>(20);
  const [showChords, setShowChords] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<TextAlign>('center');

  const loadConfig = useCallback(async () => {
    const fontSizeValue = await AsyncStorageLib.getItem(CONFIG_KEY.FontSize);
    if (fontSizeValue) {
      setFontSize(+fontSizeValue);
    }
    const showChordsValue = await AsyncStorageLib.getItem(
      CONFIG_KEY.ShowChords,
    );
    if (showChordsValue) {
      setShowChords(showChordsValue === 'true');
    }
    const textAlignValue = await AsyncStorageLib.getItem(CONFIG_KEY.TextAlign);
    if (textAlignValue) {
      setTextAlign(textAlignValue as TextAlign);
    }
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const state = useMemo(
    () => ({
      fontSize,
      setFontSize,
      showChords,
      setShowChords,
      textAlign,
      setTextAlign,
    }),
    [fontSize, showChords, textAlign],
  );

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
