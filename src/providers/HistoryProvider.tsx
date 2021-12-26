import {createContext, FC} from 'react';
import {useMMKVObject} from 'react-native-mmkv';

const HISTORY_KEY = '@history';

interface HistoryContextType {
  addToHistory: (number: number) => void;
  history: number[];
}

export const HistoryContext = createContext<HistoryContextType>(
  {} as HistoryContextType,
);

const HistoryProvider: FC = ({children}) => {
  const [history = [], setHistory] = useMMKVObject<number[]>(HISTORY_KEY);

  const addToHistory = (number: number) =>
    setHistory([...new Set([number, ...history])].slice(0, 100));

  return (
    <HistoryContext.Provider value={{history, addToHistory}}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
