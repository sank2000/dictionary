import storage from './Storage';

const KEY = 'history';
const LENGTH = 50;

const updateHistory = async (key, data) => {
  let cache = await storage.getData(KEY);
  if (cache) {
    let flag = 0;
    for (let item of cache) {
      if (key in item) {
        flag = 1;
        item[key] = data;
      }
    }
    if (!flag) {
      cache.push({
        [key]: data,
      });
    }
  } else {
    cache = [
      {
        [key]: data,
      },
    ];
  }
  if (cache.length > LENGTH) {
    cache.shift();
  }
  console.log(cache.length);
  await storage.storeData(KEY, cache);
};

const getHistory = async () => {
  const cache = await storage.getData(KEY);
  if (cache) {
    return cache;
  } else {
    return [];
  }
};

export { updateHistory, getHistory };
