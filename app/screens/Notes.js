import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  TextField,
  Screen,
  Button,
  NotFound,
  Loader,
  CommonCard,
} from '../components';
import { scale, moderateScale, getData, storeData } from '../functions';

import colors from '../config/colors';

const INITIAL_NOTES = [];

export default function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [load, setLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const initialRef = useRef(true);

  const updateList = (val) => {
    initialRef.current = false;
    setNotes((old) => [...old, val]);
    setModalVisible(false);
  };

  const handleAdd = () => {
    updateList({ title, content });
    setTitle('');
    setContent('');
  };

  const removeItem = (ind) => {
    initialRef.current = false;
    setNotes((old) => old.filter((val, index) => ind !== index));
  };

  useEffect(() => {
    getData(setNotes);
  }, []);

  useEffect(() => {
    if (INITIAL_NOTES !== notes) {
      setLoad(false);
    }
    if (!initialRef.current) {
      storeData(JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <Screen style={styles.container}>
      {load ? (
        <Loader />
      ) : notes.length === 0 ? (
        <NotFound text="No Notes are written" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <CommonCard
                ind={index}
                title={item.title}
                description={item.content}
                onPress={() => removeItem(index)}
              />
            );
          }}
        />
      )}

      <TouchableHighlight
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TextField
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={{ color: colors.primary, fontSize: 20 }}
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
              onPress={() => handleAdd()}
            />
            <Button
              title="Cancel"
              color="secondary"
              styleText={{ color: colors.black }}
              style={{ width: '80%', marginLeft: '10%' }}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    opacity: 0.9,
    width: '100%',
    zIndex: 1,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    marginTop: '50%',
    backgroundColor: colors.white,
    borderTopColor: colors.primary,
    borderTopWidth: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50),
    height: scale(50),
    padding: moderateScale(5),
    borderRadius: scale(50),
    position: 'absolute',
    top: '85%',
    left: '80%',
  },
});
