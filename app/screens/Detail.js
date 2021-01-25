import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

import { Screen, SearchCard, AudioCardWithBookmark } from '../components';

export default function Detail() {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: data.key,
    });
  }, []);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const handlePlay = async () => {
    const { sound } = await Audio.Sound.createAsync({
      uri: data.data.phonetics[0].audio,
    });
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <Screen>
      {data.data.phonetics[0] && (
        <AudioCardWithBookmark
          text={data.data.phonetics[0].text}
          handlePlay={handlePlay}
          search={data.data.word}
          data={data.data}
        />
      )}
      <FlatList
        data={data.data.meanings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <SearchCard val={item} ind={index} />;
        }}
      />
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
});
