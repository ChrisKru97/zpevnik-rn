import {useContext} from 'react';
import {HistoryContext} from '../providers/HistoryProvider';

const useHistory = () => useContext(HistoryContext);

export default useHistory;
