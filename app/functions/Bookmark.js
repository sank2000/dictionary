import storage from './Storage';

const KEY = 'Bookmark';

const updateFullBookmark = async (data) => {
  await storage.storeData(KEY, data);
};

const getBookmark = async () => {
  const cache = await storage.getData(KEY);
  if (cache) {
    return cache;
  } else {
    return [];
  }
};

const isBookmarked = (key, array) => {
  let flag = false;
  for (let item of array) {
    if (item.key === key) {
      flag = true;
    }
  }
  return flag;
};

export { updateFullBookmark, getBookmark, isBookmarked };
