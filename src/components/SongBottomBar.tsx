import {IconOutline} from '@ant-design/icons-react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {FC, useEffect, useRef, useState} from 'react';
import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import {TextAlignButtons} from '.';
import {globalStyles} from '../helpers/globalStyles';
import {spacing} from '../helpers/spacing';
import {useConfig} from '../hooks';

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    elevation: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  switch: {
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 3,
  },
  switchWrapper: {
    position: 'absolute',
    top: -50,
    width: '100%',
    alignItems: 'center',
  },
});

const SongBottomBar: FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const {fontSize, setFontSize} = useConfig();
  const slideRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(slideRef, {
        toValue: 0,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideRef, {
        toValue: height,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    }
  }, [height, slideRef, open]);

  return (
    <Animated.View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={[
        styles.shadow,
        spacing.p4,
        globalStyles.row,
        {transform: [{translateY: slideRef}]},
      ]}>
      <View style={styles.switchWrapper}>
        <Pressable
          style={[styles.switch, spacing.p2]}
          onPress={() => setOpen(!open)}>
          <IconOutline name={open ? 'down' : 'up'} size={20} />
        </Pressable>
      </View>
      <Slider
        onValueChange={value =>
          setFontSize(Array.isArray(value) ? value[0] : value)
        }
        containerStyle={globalStyles.flex}
        value={fontSize}
        minimumValue={10}
        maximumValue={40}
      />
      <TextAlignButtons />
    </Animated.View>
  );
};

export default SongBottomBar;
