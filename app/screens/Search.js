import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { TextField, Screen, Text } from '../components';

import colors from '../config/colors';

export default function Search() {
  const [search, setSearch] = useState('');

  return (
    <Screen>
      <View>
        <TextField
          placeholder="Search here"
          style={styles.textTitle}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={null}>
          <AntDesign name="search" size={15} color="black" />
        </TouchableOpacity>
      </View>
      {search !== '' && <Text>{search}</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: '600',
    fontSize: 20,
    flexGrow: 1,
  },
});
