import {StyleSheet} from 'react-native';

const SPACINGS_TYPES: Record<string, string> = {
  mt: 'marginTop',
  mr: 'marginRight',
  ml: 'marginLeft',
  mb: 'marginBottom',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pl: 'paddingLeft',
  pb: 'paddingBottom',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  m: 'margin',
  p: 'padding',
};

const SPACING_LEVELS = 10;

export const SPACING = 4;

const spacings: Record<string, Record<string, number>> = {};

for (let i = 0; i < SPACING_LEVELS; i += 1) {
  Object.keys(SPACINGS_TYPES).forEach((item: string) => {
    spacings[item + i] = {
      [SPACINGS_TYPES[item]]: i * SPACING,
    };
  });
}

export const spacing = StyleSheet.create(spacings);
