import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

import {
  TextField,
  Screen,
  SearchCard,
  AudioCardWithBookmark,
  NotFound,
} from '../components';
import { moderateScale } from '../functions';

import dictionary from '../api/dictionary';

import colors from '../config/colors';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState(null);
  const [audioResult, setAudioResult] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoad(true);
    setResult(null);
    setAudioResult(null);
    sound && sound.unloadAsync();

    try {
      const res = await dictionary.search(searchText);
      setLoad(false);
      if (res.ok) {
        setAudioResult(res?.data[0]?.phonetics[0]);
      }
      setResult({
        found: res.ok,
        res: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlay = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: audioResult.audio });
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextField
          placeholder="Search here"
          style={styles.textTitle}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSubmit}
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
      {audioResult && (
        <AudioCardWithBookmark
          text={audioResult.text}
          handlePlay={handlePlay}
        />
      )}
      {result && !result.found && <NotFound />}
      {result && result.found && (
        <FlatList
          data={result.res[0].meanings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <SearchCard val={item} ind={index} />;
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
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
