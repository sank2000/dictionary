import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { Screen, NotFound, Loader, CommonCard } from '../components';
import { BookmarkContext } from '../context';

import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function Bookmark() {
  const { bookmark, setBookmark, initialRef } = useContext(BookmarkContext);
  const navigation = useNavigation();

  const removeItem = (value) => {
    initialRef.current = false;
    setBookmark((old) => old.filter((val) => val.key !== value));
  };

  return (
    <Screen style={styles.container}>
      {bookmark === null ? (
        <Loader />
      ) : bookmark.length === 0 ? (
        <NotFound text="No Bookmark" />
      ) : (
        <FlatList
          data={bookmark.slice(0).reverse()}
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
