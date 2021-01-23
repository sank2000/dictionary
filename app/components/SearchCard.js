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
          <View key={`${index}-${definition.definition}`}>
            <Text style={styles.subTitle1}>
              {`${index + 1}. ${definition.definition}`}
            </Text>
            {definition.example && (
              <>
                <Text style={{ paddingLeft: moderateScale(10) }}>
                  Example :{' '}
                </Text>
                <Text style={styles.subTitle2}>{definition.example}</Text>
              </>
            )}
          </View>
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
  subTitle1: {
    padding: moderateScale(10),
    paddingRight: 0,
  },
  subTitle2: {
    paddingLeft: moderateScale(30),
    paddingBottom: moderateScale(10),
    fontSize: 16,
    color: 'grey',
  },
});
