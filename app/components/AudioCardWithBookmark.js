import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { moderateScale } from '../functions';

import Text from './Text';

export default function AudioCardWithBookmark({ text, handlePlay }) {
  return (
    <View style={styles.audioContainer}>
      <View style={styles.audioContainer_left}>
        <TouchableOpacity onPress={handlePlay}>
          <MaterialCommunityIcons
            name="text-to-speech"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.audioText}>{text}</Text>
      </View>
      <MaterialCommunityIcons name="bookmark-outline" size={30} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    padding: moderateScale(20),
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  audioContainer_left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  audioText: {
    marginLeft: moderateScale(20),
    color: colors.white,
  },
});
