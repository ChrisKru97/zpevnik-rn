import {IconOutline} from '@ant-design/icons-react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {FC, useEffect, useRef, useState} from 'react';
import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import {globalStyles} from '../helpers/globalStyles';
import {SPACING, spacing} from '../helpers/spacing';
import {Theme} from '../helpers/theme';
import {useConfig, useTheme} from '../hooks';
import {TextAlignButtons} from '.';

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    border: {
      borderColor: colors.gray,
      borderWidth: 1,
    },
    wrapper: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    switch: {
      borderRadius: 20,
      backgroundColor: 'white',
    },
    switchWrapper: {
      position: 'absolute',
      top: -50,
      left: SPACING * 4,
      width: '100%',
      alignItems: 'center',
    },
  });

interface Props {
  opacityRef: Animated.Value;
}

const SongBottomBar: FC<Props> = ({opacityRef}) => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(100);
  const {fontSize, setFontSize} = useConfig();
  const slideRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (height) {
      slideRef.setValue(height);
    }
  }, [height, slideRef]);

  useEffect(() => {
    if (!height) {
      return;
    }
    if (open) {
      Animated.timing(slideRef, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideRef, {
        toValue: height,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    }
  }, [height, slideRef, open]);

  return (
    <Animated.View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={[
        styles.wrapper,
        styles.border,
        spacing.p4,
        spacing.mx1,
        globalStyles.row,
        {transform: [{translateY: slideRef}]},
        !open && {opacity: opacityRef},
      ]}>
      <View style={styles.switchWrapper}>
        <Pressable
          style={[styles.switch, styles.border, spacing.p2]}
          onPress={() => {
            opacityRef.setValue(open ? 1 : 0);
            Animated.timing(opacityRef, {
              toValue: open ? 0 : 1,
              duration: 1000,
              useNativeDriver: true,
            }).start();
            setOpen(!open);
          }}>
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
