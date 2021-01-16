import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../components';
import { scale, moderateScale, verticalScale } from '../functions';
import Screen from '../components/Screen';

export default function Home() {
  return (
    <Screen style={styles.container}>
      <View style={styles.container_top}>
        <Image
          source={require('../assets/icon.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.logo_text}>Dictionary</Text>
      </View>
      <View style={styles.container_main}>
        <Card
          title="Search"
          image={require('../assets/search.png')}
          navigate="Search"
        />
        <Card
          title="History"
          image={require('../assets/history.png')}
          navigate="History"
        />
        <Card
          title="Bookmark"
          image={require('../assets/bookmark.png')}
          navigate="Bookmark"
        />
        <Card
          title="Notes"
          image={require('../assets/notes.png')}
          navigate="Notes"
        />
      </View>
    </Screen>
  );
}

function Card({ title, image, navigate }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(navigate)}
    >
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        source={image}
        style={styles.card_img}
      />
      <Text style={styles.card_text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_top: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
  },
  logo: {
    width: scale(50),
    height: verticalScale(50),
  },
  logo_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  container_main: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '40%',
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    padding: moderateScale(20),
    borderWidth: 0.2,
    borderColor: '#cccccc',
  },
  card_img: {
    width: scale(80),
    height: verticalScale(80),
  },
  card_text: {
    marginTop: moderateScale(10),
  },
});
