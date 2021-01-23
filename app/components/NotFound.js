import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { moderateScale } from '../functions';
import { Text } from '../components';

export default function NotFound({ text = 'No Results Found', style }) {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        autoPlay
        loop={true}
        source={require('../assets/animations/not-found.json')}
        style={styles.animation_notfound}
      />
      <Text style={styles.notFound}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    textAlign: 'center',
    marginTop: moderateScale(20),
  },
  animation_notfound: {
    width: moderateScale(150),
  },
});
