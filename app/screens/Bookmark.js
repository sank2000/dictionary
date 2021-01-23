import React from 'react';
import { StyleSheet } from 'react-native';

import { Screen, NotFound } from '../components';

export default function Bookmark() {
  return (
    <Screen>
      <NotFound text="No Bookmarks" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
