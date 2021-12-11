import {useContext} from 'react';
import {SongListContext} from '../providers/SongListProvider';

const useSongList = () => useContext(SongListContext);

export default useSongList;
