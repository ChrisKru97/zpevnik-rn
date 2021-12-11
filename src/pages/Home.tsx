import {FC} from 'react';
import {useSongList} from '../hooks';

const Home: FC = () => {
  const songList = useSongList();
  console.log(songList.slice(0, 10));
  return null;
};

export default Home;
