import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES = 'notes';

const getData = async (setNotes) => {
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

export { getData, storeData };
