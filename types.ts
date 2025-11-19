export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface Post {
  id: string;
  user: User;
  type: MediaType;
  url: string;
  thumbnailUrl?: string; // For videos
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  aspectRatio?: string; // 'square' | 'portrait' | 'landscape'
  location?: string;
  aiAnalysis?: string; // Cache for AI insight
}

export interface Story {
  id: string;
  user: User;
  previewUrl: string;
  hasUnseen: boolean;
}