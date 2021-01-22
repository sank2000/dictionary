import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { TextField, Screen, Text } from '../components';
import { moderateScale } from '../functions';

import colors from '../config/colors';

export default function Search() {
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(false);

  const handleSubmit = () => {
    setLoad(true);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextField
          placeholder="Search here"
          style={styles.textTitle}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <AntDesign
            name="search1"
            style={{ marginRight: 20 }}
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      {load && (
        <View style={styles.loadingContainer}>
          <LottieView
            autoPlay
            loop={true}
            source={require('../assets/animations/loader.json')}
            style={styles.animation}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: moderateScale(250),
  },
  textTitle: {
    fontWeight: '600',
    width: '70%',
    fontSize: 20,
    flexGrow: 1,
  },
});
