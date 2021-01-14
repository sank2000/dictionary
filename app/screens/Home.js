import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Text>History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Bookmark')}>
        <Text>Bookmark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
        <Text>Notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
