import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextField, Screen, Button, Text } from '../components';

import colors from '../config/colors';

const NOTES = 'notes';

export default function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(NOTES);
      console.log(value);
      if (value !== null) {
        setNotes(JSON.parse(value));
      } else {
        setNotes([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(NOTES, value);
    } catch (e) {
      console.log(e);
    }
  };

  const updateList = (val) => {
    setNotes((old) => [...old, val]);
    setModalVisible(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData(JSON.stringify(notes));
  }, [notes]);

  return (
    <Screen style={styles.container}>
      <View>
        {notes.map((val, ind) => {
          return <Text key={ind}>{JSON.stringify(val)}</Text>;
        })}
      </View>

      <Button
        title="New"
        style={{ width: '80%', marginLeft: '10%' }}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextField
            placeholder="Title"
            style={styles.textTitle}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextField
            placeholder="Content"
            multiline
            numberOfLines={4}
            textAlign="left"
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <Button
            title="Add"
            style={{ width: '80%', marginLeft: '10%' }}
            onPress={() => updateList({ title, content })}
          />
          <Button
            title="Cancel"
            color="secondary"
            style={{ width: '80%', marginLeft: '10%' }}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: '50%',
    backgroundColor: colors.white,
  },
  textTitle: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 20,
  },
});
