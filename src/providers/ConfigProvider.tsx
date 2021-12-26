import {createContext, FC} from 'react';
import {TextStyle} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';

const CONFIG_KEY = '@config';

type TextAlign = TextStyle['textAlign'];

type Config = {
  fontSize: number;
  showChords: boolean;
  textAlign: TextAlign;
};

interface ConfigContextType {
  config: Config;
  setConfigPart: (partialConfig: Partial<Config>) => void;
}

const defaultConfig: Config = {
  fontSize: 20,
  showChords: false,
  textAlign: 'center',
};

export const ConfigContext = createContext<ConfigContextType>(
  {} as ConfigContextType,
);

const ConfigProvider: FC = ({children}) => {
  const [config = defaultConfig, setConfig] = useMMKVObject<Config>(CONFIG_KEY);

  const setConfigPart = (partialConfig: Partial<Config>) =>
    setConfig({...config, ...partialConfig});

  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfigPart,
      }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
