import React from 'react';
import { StyleSheet } from 'react-native';

import { Screen, NotFound } from '../components';

export default function History() {
  return (
    <Screen>
      <NotFound text="No History" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
