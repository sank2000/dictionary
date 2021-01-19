import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons';

import { TextField, Screen, Button, Text } from '../components';
import { scale, moderateScale, verticalScale } from '../functions';

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

  const handleAdd = () => {
    updateList({ title, content });
    setTitle('');
    setContent('');
  };

  const removeItem = (ind) => {
    setNotes((old) => old.filter((val, index) => ind !== index));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData(JSON.stringify(notes));
  }, [notes]);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <CardNote
              ind={index}
              title={item.title}
              description={item.content}
              removeItem={removeItem}
            />
          );
        }}
      />

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
            onPress={() => handleAdd()}
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

const CardNote = ({ ind, title, description, removeItem }) => {
  return (
    <View key={ind} style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Text style={styles.textTitle}>{title}</Text>
        <TouchableWithoutFeedback onPress={() => removeItem(ind)}>
          <AntDesign name="close" size={15} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: '50%',
    backgroundColor: colors.white,
  },
  cardContainer: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
    borderWidth: 0.1,
    borderColor: '#cccccc',
  },
  cardTop: {
    flexDirection: 'row',
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
  textTitle: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 20,
    flexGrow: 1,
  },
});
