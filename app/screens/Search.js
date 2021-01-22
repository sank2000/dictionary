import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import { TextField, Screen, Text } from '../components';
import { moderateScale } from '../functions';

import dictionary from '../api/dictionary';

import colors from '../config/colors';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log(result);
    console.log(result && result.res[0].meanings);
  }, [result]);

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const res = await dictionary.search(searchText);
      setLoad(false);
      setResult({
        found: res.ok,
        res: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextField
          placeholder="Search here"
          style={styles.textTitle}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
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
      {result && !result.found && (
        <Text>{JSON.stringify(result.res.message)}</Text>
      )}
      {result && result.found && (
        <>
          {result.res[0].meanings.map((val, ind) => {
            return (
              <>
                <Text key={ind}>{val.partOfSpeech}</Text>
                {val.definitions.map((definition, ind) => {
                  return <Text key={ind}>{definition.definition}</Text>;
                })}
              </>
            );
          })}
        </>
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
