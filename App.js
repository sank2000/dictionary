import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Search, Bookmark, Notes, History, Detail } from './app/screens';
import { BookmarkContext } from './app/context';
import { getBookmark, updateFullBookmark } from './app/functions';

const Stack = createStackNavigator();

export default function App() {
  const [bookmark, setBookmark] = useState(null);
  const initialRef = useRef(true);

  useEffect(() => {
    if (!initialRef.current) {
      updateBookmarkCache();
    }
  }, [bookmark]);

  const updateBookmarkCache = async () => {
    await updateFullBookmark(bookmark);
  };

  const getBookmarkFromCache = async () => {
    const data = await getBookmark();
    setBookmark(data);
  };

  useEffect(() => {
    getBookmarkFromCache();
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmark, setBookmark, initialRef }}>
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Bookmark" component={Bookmark} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookmarkContext.Provider>
  );
}
