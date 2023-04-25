import { Image } from "react-native";

const AlignLeft = () => (
    <Image source={{ uri: 'align_left' }} />
);
const AlignCenter = () => (
    <Image source={{ uri: 'align_center' }} />
);
const Heart = () => <Image source={{ uri: 'heart' }} />;
const History = () => <Image source={{ uri: 'history' }} />;
const Left = () => <Image source={{ uri: 'left' }} />;
const Number = () => <Image source={{ uri: 'number' }} />;
const Search = () => <Image source={{ uri: 'search' }} />;
const Setting = () => <Image source={{ uri: 'setting' }} />;

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
