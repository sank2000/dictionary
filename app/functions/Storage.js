import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.log(err, e);
  }
};

export default {
  storeData,
  getData,
};
