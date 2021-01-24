import storage from './Storage';

const KEY = 'history';
const LENGTH = 50;

const updateHistory = async (key, data) => {
  let cache = await storage.getData(KEY);
  const dataToStore = {
    key,
    data,
    date: new Date(),
  };
  if (cache) {
    let flag = 0;
    for (let item of cache) {
      if (item.key === key) {
        flag = 1;
        item.data = data;
        item.date = new Date();
      }
    }
    if (!flag) {
      cache.push(dataToStore);
    }
  } else {
    cache = [dataToStore];
  }
  if (cache.length > LENGTH) {
    cache.shift();
  }
  await storage.storeData(KEY, cache);
};

const updateFullHistory = async (data) => {
  await storage.storeData(KEY, data);
};

const getHistory = async () => {
  const cache = await storage.getData(KEY);
  if (cache) {
    return cache;
  } else {
    return [];
  }
};

export { updateHistory, updateFullHistory, getHistory };
