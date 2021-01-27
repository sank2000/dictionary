import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { moderateScale, isBookmarked } from '../functions';
import { BookmarkContext } from '../context';

import Text from './Text';

export default function AudioCardWithBookmark({
  text,
  handlePlay,
  search,
  data,
}) {
  const { bookmark, setBookmark, initialRef } = useContext(BookmarkContext);
  const [bookmarked, setBookmarked] = useState(isBookmarked(search, bookmark));

  useEffect(() => {
    setBookmarked(isBookmarked(search, bookmark));
  }, [bookmark, search]);

  const handleBookmark = () => {
    initialRef.current = false;
    if (bookmarked) {
      setBookmark((old) => old.filter((val) => val.key !== search));
    } else {
      setBookmark((old) => [
        ...old,
        {
          key: search,
          data,
          date: new Date(),
        },
      ]);
    }
  };

  return (
    <View style={styles.audioContainer}>
      <View style={styles.audioContainer_left}>
        <TouchableOpacity onPress={handlePlay}>
          <MaterialCommunityIcons
            name="text-to-speech"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.audioText}>{text}</Text>
      </View>
      {search && (
        <TouchableOpacity onPress={handleBookmark}>
          <MaterialCommunityIcons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    padding: moderateScale(20),
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  audioContainer_left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  audioText: {
    marginLeft: moderateScale(20),
    color: colors.white,
  },
});
