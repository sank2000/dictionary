import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import {
  TextField,
  Screen,
  SearchCard,
  AudioCardWithBookmark,
  NotFound,
  Loader,
} from '../components';
import { getHistoryByKey, updateHistory } from '../functions';

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
      const cacheData = await getHistoryByKey(searchText);
      if (cacheData) {
        setLoad(false);
        setAudioResult(cacheData.phonetics[0]);
        updateHistory(searchText, cacheData);
        setResult({
          found: true,
          res: [cacheData],
        });
        return;
      }
      const res = await dictionary.search(searchText);
      setLoad(false);
      if (res.ok) {
        setAudioResult(res?.data[0]?.phonetics[0]);
        updateHistory(searchText, res.data[0]);
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
    const { sound } = await Audio.Sound.createAsync({ uri: 'https:'+ audioResult.audio });
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
      {load && <Loader />}
      {audioResult && (
        <AudioCardWithBookmark
          text={audioResult.text}
          handlePlay={handlePlay}
          search={result?.res[0].word}
          data={result?.res[0]}
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
  textTitle: {
    fontWeight: '600',
    width: '70%',
    fontSize: 20,
    flexGrow: 1,
  },
});
