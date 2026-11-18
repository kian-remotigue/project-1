import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  Header, ScreenTitle, Stories, Post, TabBar,
  ReelsScreen, MessagesScreen, SearchScreen, ProfileScreen,
} from './components';
import { POSTS } from './data';

export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <View style={s.container}>
      <StatusBar style="light" />

      {tab === 'home' && (
        <>
          <Header />
          <FlatList
            data={POSTS}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <Post item={item} />}
            ListHeaderComponent={<Stories />}
          />
        </>
      )}

      {tab === 'reels' && (
        <>
          <ScreenTitle title="Reels" />
          <ReelsScreen />
        </>
      )}

      {tab === 'messages' && (
        <>
          <ScreenTitle title="Messages" />
          <MessagesScreen />
        </>
      )}

      {tab === 'search' && (
        <>
          <ScreenTitle title="Explore" />
          <SearchScreen />
        </>
      )}

      {tab === 'profile' && (
        <>
          <ScreenTitle title="Yandekkusu." />
          <ProfileScreen />
        </>
      )}

      <TabBar tab={tab} onChange={setTab} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44,
  },
});