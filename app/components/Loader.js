import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import { moderateScale } from '../functions';

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        autoPlay
        loop={true}
        source={require('../assets/animations/loader.json')}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(250),
  },
});

export default Loader;
