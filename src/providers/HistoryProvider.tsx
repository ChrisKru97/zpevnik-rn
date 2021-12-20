import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const HISTORY_KEY = '@history';

interface HistoryContextType {
  addToHistory: (number: number) => void;
  history: number[];
}

export const HistoryContext = createContext<HistoryContextType>(
  {} as HistoryContextType,
);

const HistoryProvider: FC = ({children}) => {
  const [history, setHistory] = useState<number[]>([]);

  const loadHistory = useCallback(async () => {
    const historyJson = await AsyncStorageLib.getItem(HISTORY_KEY);
    if (historyJson) {
      const loadedHistory = JSON.parse(historyJson);
      setHistory(loadedHistory);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addToHistory = useCallback((number: number) => {
    setHistory(prevHistory => {
      const nextHistory = [...new Set([number, ...prevHistory])].slice(0, 100);
      AsyncStorageLib.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
      return nextHistory;
    });
  }, []);

  const state = useMemo(
    () => ({
      history,
      addToHistory,
    }),
    [addToHistory, history],
  );

  return (
    <HistoryContext.Provider value={state}>{children}</HistoryContext.Provider>
  );
};

export default HistoryProvider;
