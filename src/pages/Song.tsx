import {RouteProp, useRoute} from '@react-navigation/native';
import {FC} from 'react';
import {ScrollView, Text} from 'react-native';
import {Header} from '../components';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {StackParamList} from '../helpers/types';

const Song: FC = () => {
  const {params} = useRoute<RouteProp<StackParamList>>();

  if (!params) {
    return null;
  }

  const {name, withChords} = params;

  return (
    <ScrollView>
      <Header title={name} />
      <Text style={[globalStyles.text, spacing.p2]}>{withChords}</Text>
    </ScrollView>
  );
};

export default Song;
