import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';

import { Screen, NotFound, Loader, CommonCard, Text } from '../components';
import { getHistory, updateFullHistory } from '../functions';

import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function History() {
  const [history, setHistory] = useState([]);
  const [load, setLoad] = useState(true);
  const initialRef = useRef(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (!initialRef.current) {
      updateHistoryCache();
    }
  }, [history]);

  const updateHistoryCache = async () => {
    await updateFullHistory(history);
  };

  const removeItem = (value) => {
    initialRef.current = false;
    setHistory((old) => old.filter((val) => val.key !== value));
  };

  const getHistoryFromCache = async () => {
    const data = await getHistory();
    setLoad(false);
    setHistory(data);
  };

  useEffect(() => {
    getHistoryFromCache();
  }, []);

  return (
    <Screen style={styles.container}>
      {load ? (
        <Loader />
      ) : history.length === 0 ? (
        <NotFound text="No History" />
      ) : (
        <FlatList
          data={history.slice(0).reverse()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CommonCard
                ind={index}
                title={item.key}
                description={format(new Date(item.date), 'd-LLL-y | h : mm a')}
                descriptionStyle={{ color: 'grey', fontSize: 11 }}
                onPress={() => removeItem(item.key)}
                onTouch={() =>
                  navigation.navigate('Detail', {
                    data: item,
                  })
                }
              />
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
