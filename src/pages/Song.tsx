import {RouteProp, useRoute} from '@react-navigation/native';
import {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Header, SongBottomBar} from '../components';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {StackParamList} from '../helpers/types';
import {useConfig} from '../hooks';

const Song: FC = () => {
  const {params} = useRoute<RouteProp<StackParamList>>();
  const {fontSize, textAlign} = useConfig();

  if (!params) {
    return null;
  }

  const {name, withChords, number} = params;

  return (
    <View style={globalStyles.flex}>
      <ScrollView
        style={globalStyles.flex}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll>
        <Header title={name} number={number} />
        <Text style={[globalStyles.text, spacing.p2, {fontSize, textAlign}]}>
          {withChords}
        </Text>
      </ScrollView>
      <SongBottomBar />
    </View>
  );
};

export default Song;
