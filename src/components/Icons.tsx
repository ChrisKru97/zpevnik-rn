import VectorImage from 'react-native-vector-image';

const AlignLeft = () => (
  <VectorImage source={require('../../svg-icons/align-left.svg')} />
);
const AlignCenter = () => (
  <VectorImage source={require('../../svg-icons/align-center.svg')} />
);
const Heart = () => (
  <VectorImage source={require('../../svg-icons/heart.svg')} />
);
const History = () => (
  <VectorImage source={require('../../svg-icons/history.svg')} />
);
const Left = () => <VectorImage source={require('../../svg-icons/left.svg')} />;
const Number = () => (
  <VectorImage source={require('../../svg-icons/number.svg')} />
);
const Search = () => (
  <VectorImage source={require('../../svg-icons/search.svg')} />
);
const Setting = () => (
  <VectorImage source={require('../../svg-icons/setting.svg')} />
);

const Icons = Object.freeze({
  AlignLeft,
  AlignCenter,
  Heart,
  History,
  Left,
  Number,
  Search,
  Setting,
});

export default Icons;
