import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, FlatList, TextInput,
  TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { STORIES, img } from './data';

const W = Dimensions.get('window').width;

/* ---------- HEADER ---------- */
export function Header() {
  return (
    <View style={s.header}>
      <Ionicons name="add" size={36} color="#fff" />
      <Text style={s.logo}>Instagram</Text>
      <View>
        <Ionicons name="heart-outline" size={30} color="#fff" />
        <View style={s.dotTop} />
      </View>
    </View>
  );
}

export function ScreenTitle({ title }) {
  return (
    <View style={s.header}>
      <Text style={s.title}>{title}</Text>
    </View>
  );
}

/* ---------- STORIES ---------- */
function StoryItem({ item }) {
  return (
    <View style={s.storyWrap}>
      <View style={[s.storyRing, { borderColor: item.ring || 'transparent' }]}>
        <Image source={{ uri: item.avatar }} style={s.storyImg} />
        {item.mine && (
          <View style={s.plus}>
            <Ionicons name="add" size={20} color="#000" />
          </View>
        )}
      </View>
      <Text style={s.storyName} numberOfLines={1}>{item.name}</Text>
    </View>
  );
}

export function Stories() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.stories}>
      {STORIES.map((st) => <StoryItem key={st.id} item={st} />)}
    </ScrollView>
  );
}

/* ---------- POST ---------- */
export function Post({ item }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const isAd = item.type === 'ad';

  return (
    <View style={s.post}>
      <View style={s.postHeader}>
        <Image source={{ uri: item.avatar }} style={s.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={s.user}>{item.user}</Text>
          <Text style={s.sub}>{item.sub}</Text>
        </View>
        {!isAd && (
          <TouchableOpacity style={s.followBtn} onPress={() => setFollowing(!following)}>
            <Text style={s.followTxt}>{following ? 'Following' : 'Follow'}</Text>
          </TouchableOpacity>
        )}
        <Feather name="menu" size={22} color="#fff" style={{ marginLeft: 12 }} />
      </View>

      <View style={[s.mediaBox, isAd && { backgroundColor: '#000' }]}>
        <Image
          source={{ uri: item.media }}
          style={{ width: '100%', aspectRatio: isAd ? 16 / 9 : 4 / 5 }}
          resizeMode="cover"
        />
        {!isAd && (
          <View style={s.overlay}>
            <Text style={s.overlayText}>{item.caption}</Text>
            <TouchableOpacity style={s.reelsBtn}>
              <Ionicons name="play-circle" size={22} color="#000" />
              <Text style={s.reelsTxt}>Watch more reels</Text>
            </TouchableOpacity>
            <Text style={s.watchAgain}>Watch Again</Text>
          </View>
        )}
      </View>

      {!isAd && (
        <>
          <View style={s.actions}>
            <TouchableOpacity style={s.act} onPress={() => setLiked(!liked)}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={28} color={liked ? '#ef4444' : '#fff'} />
              <Text style={s.actTxt}>{item.likes}</Text>
            </TouchableOpacity>
            <View style={s.act}>
              <Ionicons name="chatbubble-outline" size={26} color="#fff" />
              <Text style={s.actTxt}>{item.comments}</Text>
            </View>
            <View style={s.act}>
              <Ionicons name="repeat" size={28} color="#fff" />
              <Text style={s.actTxt}>{item.reposts}</Text>
            </View>
            <View style={s.act}>
              <Ionicons name="paper-plane-outline" size={26} color="#fff" />
              <Text style={s.actTxt}>{item.shares}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => setSaved(!saved)}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={s.caption}>
            <Text style={{ fontWeight: '700' }}>{item.user} </Text>{item.text}
          </Text>
          <Text style={s.date}>{item.date}</Text>
        </>
      )}
    </View>
  );
}

/* ---------- REELS SCREEN ---------- */
const REELS = [1, 2, 3, 4].map((n) => ({
  id: 'r' + n,
  user: 'huntzz_' + n,
  caption: 'Run with nature. ' + n,
  media: img('reel' + n, 600, 1000),
}));

export function ReelsScreen() {
  return (
    <FlatList
      data={REELS}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <Image source={{ uri: item.media }} style={{ width: W, aspectRatio: 9 / 14 }} />
          <View style={s.reelInfo}>
            <Text style={s.user}>@{item.user}</Text>
            <Text style={{ color: '#fff', marginTop: 4 }}>{item.caption}</Text>
          </View>
          <View style={s.reelSide}>
            <Ionicons name="heart-outline" size={32} color="#fff" />
            <Ionicons name="chatbubble-outline" size={30} color="#fff" style={{ marginTop: 18 }} />
            <Ionicons name="paper-plane-outline" size={30} color="#fff" style={{ marginTop: 18 }} />
          </View>
        </View>
      )}
    />
  );
}

/* ---------- MESSAGES SCREEN ---------- */
export function MessagesScreen() {
  const chats = STORIES.filter((x) => !x.mine);
  return (
    <FlatList
      data={chats}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={s.chatRow}>
          <Image source={{ uri: item.avatar }} style={s.chatAvatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.user}>{item.name}</Text>
            <Text style={s.sub}>Hey! Sent you a message · 2h</Text>
          </View>
          <Ionicons name="camera-outline" size={26} color="#fff" />
        </View>
      )}
    />
  );
}

/* ---------- SEARCH SCREEN ---------- */
export function SearchScreen() {
  const [q, setQ] = useState('');
  const data = Array.from({ length: 30 }, (_, i) => ({ id: 'g' + i, uri: img('grid' + i, 300, 300) }));
  return (
    <View style={{ flex: 1 }}>
      <View style={s.searchBox}>
        <Ionicons name="search" size={20} color="#9ca3af" />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search"
          placeholderTextColor="#9ca3af"
          style={s.searchInput}
        />
      </View>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: W / 3, height: W / 3, borderWidth: 1, borderColor: '#0b0f19' }} />
        )}
      />
    </View>
  );
}

/* ---------- PROFILE SCREEN ---------- */
export function ProfileScreen() {
  const data = Array.from({ length: 12 }, (_, i) => ({ id: 'm' + i, uri: img('mine' + i, 300, 300) }));
  return (
    <FlatList
      data={data}
      numColumns={3}
      keyExtractor={(i) => i.id}
      ListHeaderComponent={
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: img('me', 200, 200) }} style={s.profileAvatar} />
            <View style={s.statsRow}>
              <View style={s.stat}><Text style={s.statNum}>12</Text><Text style={s.sub}>Posts</Text></View>
              <View style={s.stat}><Text style={s.statNum}>1.6M</Text><Text style={s.sub}>Followers</Text></View>
              <View style={s.stat}><Text style={s.statNum}>0</Text><Text style={s.sub}>Following</Text></View>
            </View>
          </View>
          <Text style={[s.user, { marginTop: 12 }]}>Yandekkusu.</Text>
          <Text style={s.sub}>You're the only star I love.</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TouchableOpacity style={s.profileBtn}><Text style={s.followTxt}>Edit profile</Text></TouchableOpacity>
            <TouchableOpacity style={[s.profileBtn, { marginLeft: 8 }]}><Text style={s.followTxt}>Share profile</Text></TouchableOpacity>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} style={{ width: W / 3, height: W / 3, borderWidth: 1, borderColor: '#0b0f19' }} />
      )}
    />
  );
}

/* ---------- TAB BAR ---------- */
const TABS = [
  { key: 'home', on: 'home', off: 'home-outline' },
  { key: 'reels', on: 'play-circle', off: 'play-circle-outline' },
  { key: 'messages', on: 'paper-plane', off: 'paper-plane-outline' },
  { key: 'search', on: 'search', off: 'search-outline' },
];

export function TabBar({ tab, onChange }) {
  return (
    <View style={s.tabBar}>
      {TABS.map((t) => {
        const active = tab === t.key;
        return (
          <TouchableOpacity key={t.key} onPress={() => onChange(t.key)}
            style={active ? s.tabActive : s.tabItem}>
            <Ionicons name={active ? t.on : t.off} size={28} color="#fff" />
            {t.key === 'messages' && <View style={s.dot} />}
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={() => onChange('profile')}
        style={tab === 'profile' ? s.tabActive : s.tabItem}>
        <Image source={{ uri: img('me', 100, 100) }} style={s.tabAvatar} />
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */
const s = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 8,
  },
  logo: { color: '#fff', fontSize: 32, fontWeight: '800', fontStyle: 'italic', letterSpacing: 1 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  dot: { position: 'absolute', right: 2, bottom: 4, width: 10, height: 10, borderRadius: 5, backgroundColor: '#ef4444' },
  dotTop: { position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#ef4444' },

  stories: { paddingVertical: 12, paddingLeft: 10 },
  storyWrap: { width: 90, alignItems: 'center', marginRight: 6 },
  storyRing: { width: 82, height: 82, borderRadius: 41, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  storyImg: { width: 70, height: 70, borderRadius: 35 },
  plus: {
    position: 'absolute', right: -2, bottom: -2, width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#0b0f19',
  },
  storyName: { color: '#fff', fontSize: 12, marginTop: 6 },

  post: { marginBottom: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  user: { color: '#fff', fontWeight: '700', fontSize: 15 },
  sub: { color: '#d1d5db', fontSize: 13 },
  followBtn: { borderWidth: 1, borderColor: '#fff', borderRadius: 10, paddingHorizontal: 18, paddingVertical: 8 },
  followTxt: { color: '#fff', fontWeight: '600' },
  mediaBox: { width: '100%', justifyContent: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center', justifyContent: 'space-around', padding: 20,
  },
  overlayText: { color: '#fff', fontSize: 26, fontWeight: '700', textAlign: 'center' },
  reelsBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#e5e7eb',
    borderRadius: 30, paddingHorizontal: 24, paddingVertical: 14,
  },
  reelsTxt: { marginLeft: 8, fontSize: 17, fontWeight: '500' },
  watchAgain: { color: '#fff', fontSize: 17, fontWeight: '600' },
  actions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12 },
  act: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  actTxt: { color: '#fff', fontWeight: '600', marginLeft: 6, fontSize: 15 },
  caption: { color: '#fff', paddingHorizontal: 12, paddingTop: 10, fontSize: 15 },
  date: { color: '#9ca3af', paddingHorizontal: 12, paddingTop: 6 },

  reelInfo: { position: 'absolute', left: 14, bottom: 20 },
  reelSide: { position: 'absolute', right: 14, bottom: 30, alignItems: 'center' },

  chatRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10 },
  chatAvatar: { width: 56, height: 56, borderRadius: 28 },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1f2533',
    borderRadius: 12, marginHorizontal: 12, marginVertical: 8, paddingHorizontal: 12,
  },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 10, marginLeft: 8, fontSize: 16 },

  profileAvatar: { width: 86, height: 86, borderRadius: 43 },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 18, fontWeight: '700' },
  profileBtn: {
    flex: 1, backgroundColor: '#1f2533', borderRadius: 10,
    paddingVertical: 9, alignItems: 'center',
  },

  tabBar: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingVertical: 8, backgroundColor: '#0b0f19',
    borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#222',
  },
  tabItem: { paddingHorizontal: 20, paddingVertical: 8 },
  tabActive: { backgroundColor: '#2a2f3a', borderRadius: 24, paddingHorizontal: 26, paddingVertical: 8 },
  tabAvatar: { width: 30, height: 30, borderRadius: 15 },
});