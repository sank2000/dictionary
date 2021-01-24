import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Screen, NotFound, Loader } from '../components';
import { getHistory } from '../functions';

export default function History() {
  const [history, setHistory] = useState([]);
  const [load, setLoad] = useState(true);

  const getHistoryFromCache = async () => {
    const data = await getHistory();
    setLoad(false);
    setHistory(data);
  };

  useEffect(() => {
    getHistoryFromCache();
  }, []);

  return (
    <Screen>
      {load ? (
        <Loader />
      ) : (
        history.length === 0 && <NotFound text="No History" />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
