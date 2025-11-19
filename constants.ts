import { Post, User, MediaType, Story } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'creative_soul',
  avatarUrl: 'https://picsum.photos/seed/u1/200/200',
  isVerified: true,
};

export const MOCK_STORIES: Story[] = [
  { id: 's1', user: { id: 'u2', username: 'travel_mike', avatarUrl: 'https://picsum.photos/seed/u2/200/200' }, previewUrl: 'https://picsum.photos/seed/s1/300/500', hasUnseen: true },
  { id: 's2', user: { id: 'u3', username: 'sarah_art', avatarUrl: 'https://picsum.photos/seed/u3/200/200' }, previewUrl: 'https://picsum.photos/seed/s2/300/500', hasUnseen: true },
  { id: 's3', user: { id: 'u4', username: 'gym_rat', avatarUrl: 'https://picsum.photos/seed/u4/200/200' }, previewUrl: 'https://picsum.photos/seed/s3/300/500', hasUnseen: false },
  { id: 's4', user: { id: 'u5', username: 'foodie_yum', avatarUrl: 'https://picsum.photos/seed/u5/200/200' }, previewUrl: 'https://picsum.photos/seed/s4/300/500', hasUnseen: true },
  { id: 's5', user: { id: 'u6', username: 'tech_guru', avatarUrl: 'https://picsum.photos/seed/u6/200/200' }, previewUrl: 'https://picsum.photos/seed/s5/300/500', hasUnseen: false },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: { id: 'u2', username: 'travel_mike', avatarUrl: 'https://picsum.photos/seed/u2/200/200', isVerified: true },
    type: MediaType.IMAGE,
    url: 'https://picsum.photos/seed/nature1/800/800',
    caption: 'Lost in the woods 🌲 #adventure #nature',
    likes: 1240,
    comments: [],
    timestamp: '2h ago',
    aspectRatio: 'square',
    location: 'Yosemite National Park'
  },
  {
    id: 'p2',
    user: { id: 'u6', username: 'tech_guru', avatarUrl: 'https://picsum.photos/seed/u6/200/200' },
    type: MediaType.VIDEO,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/video1/800/450',
    caption: 'Reviewing the latest gadget! Full review on channel. 🎥 #tech #review',
    likes: 8500,
    comments: [],
    timestamp: '5h ago',
    aspectRatio: 'landscape',
  },
  {
    id: 'p3',
    user: { id: 'u3', username: 'sarah_art', avatarUrl: 'https://picsum.photos/seed/u3/200/200' },
    type: MediaType.IMAGE,
    url: 'https://picsum.photos/seed/art1/600/800',
    caption: 'Work in progress. 🎨 #oilpainting #studio',
    likes: 432,
    comments: [],
    timestamp: '8h ago',
    aspectRatio: 'portrait',
  },
];