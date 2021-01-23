import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

import { moderateScale } from '../functions';

import Text from './Text';

export default function SearchCard({ val, ind }) {
  return (
    <View key={ind} style={styles.container}>
      <Text style={styles.title}>{val.partOfSpeech}</Text>
      {val.definitions.map((definition, index) => {
        return (
          <Text
            style={styles.subTitle}
            key={`${index}-${definition.definition}`}
          >
            {`${index + 1}. ${definition.definition}`}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(15),
  },
  title: {
    fontSize: 22,
    color: colors.dark,
  },
  subTitle: {
    padding: moderateScale(10),
    paddingRight: 0,
  },
});
