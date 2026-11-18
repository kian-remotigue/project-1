export const img = (seed, w = 600, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;



export const STORIES = [
  { id: '0', name: 'Yandekkusu.', avatar: img('me', 200, 200), mine: true },
  { id: '1', name: 'dimple_rem', avatar: img('u1', 200, 200), ring: '#22c55e' },
  { id: '2', name: 'almirang', avatar: img('u2', 200, 200), ring: '#ec4899' },
  { id: '3', name: 'Tito', avatar: img('u3', 200, 200), ring: '#f59e0b' },
  { id: '4', name: 'Esme_ringhoy', avatar: img('u4', 200, 200), ring: '#ec4899' },
];

export const POSTS = [
  {
    id: 'p1', type: 'post', user: 'Jordi_NE', sub: 'Suggested for you',
    avatar: img('p1a', 100, 100), media: img('p1m', 800, 1000),
    caption: 'POV: sample caption text goes here', likes: '45.7K',
    comments: '768', reposts: '2,041', shares: '17.8K',
    text: 'Safe bess', date: '29 September',
  },
  {
    id: 'p2', type: 'ad', user: 'S_Peak', sub: 'Ad',
    avatar: img('p2a', 100, 100), media: img('p2m', 800, 450),
  },
];