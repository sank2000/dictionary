import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { moderateScale } from '../functions';

import defaultStyles from '../config/styles';

const TextField = ({ style, ...otherProps }) => {
  return <TextInput style={[styles.text, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  text: {
    width: '100%',
    padding: moderateScale(20),
    ...defaultStyles.text,
  },
});

export default TextField;
