import {RouteProp, useRoute} from '@react-navigation/native';
import {FC, useCallback, useEffect, useRef} from 'react';
import {Animated, ScrollView, Text, View} from 'react-native';
import {Header, SongBottomBar} from '../components';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {StackParamList} from '../helpers/types';
import {useConfig} from '../hooks';

const Song: FC = () => {
  const {params} = useRoute<RouteProp<StackParamList>>();
  const {fontSize, textAlign} = useConfig();
  const opacityRef = useRef(new Animated.Value(1)).current;

  const handleTouch = useCallback(() => {
    Animated.timing(opacityRef, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(
      () =>
        Animated.timing(opacityRef, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(),
      1500,
    );
  }, [opacityRef]);

  useEffect(() => {
    handleTouch();
  }, [handleTouch]);

  if (!params) {
    return null;
  }

  const {name, withChords, number} = params;

  return (
    <View style={globalStyles.flex}>
      <ScrollView
        onTouchStart={handleTouch}
        style={globalStyles.flex}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll>
        <Header title={name} number={number} />
        <Text style={[globalStyles.text, spacing.p2, {fontSize, textAlign}]}>
          {withChords}
        </Text>
      </ScrollView>
      <SongBottomBar opacityRef={opacityRef} />
    </View>
  );
};

export default Song;
