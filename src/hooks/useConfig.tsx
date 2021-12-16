import {useContext} from 'react';
import {ConfigContext} from '../providers/ConfigProvider';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
