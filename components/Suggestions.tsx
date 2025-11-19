import React from 'react';
import { User } from '../types';

export const Suggestions: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const suggestedUsers = [
    { id: 's1', username: 'design_daily', avatar: 'https://picsum.photos/seed/s1/100/100', sub: 'Followed by sarah_art' },
    { id: 's2', username: 'nature_lover', avatar: 'https://picsum.photos/seed/s2/100/100', sub: 'New to Instagram' },
    { id: 's3', username: 'coding_life', avatar: 'https://picsum.photos/seed/s3/100/100', sub: 'Suggested for you' },
  ];

  return (
    <div className="hidden lg:block w-80 pl-8 pt-8 fixed right-0 top-0 h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={currentUser.avatarUrl} alt="me" className="w-12 h-12 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-bold text-sm">{currentUser.username}</span>
            <span className="text-gray-500 text-sm">Creative Director</span>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-bold hover:text-white">Switch</button>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-gray-500 font-bold text-sm">Suggested for you</span>
        <button className="text-white text-xs font-bold">See All</button>
      </div>

      <div className="space-y-3">
        {suggestedUsers.map(u => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={u.avatar} alt={u.username} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col">
                <span className="font-bold text-sm hover:underline cursor-pointer">{u.username}</span>
                <span className="text-gray-500 text-xs">{u.sub}</span>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-bold hover:text-white">Follow</button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-xs text-gray-600 space-y-2">
        <p>About • Help • Press • API • Jobs • Privacy • Terms</p>
        <p>Locations • Language • Meta Verified</p>
        <p className="mt-4">© 2024 STREAMGRAM FROM META-AI</p>
      </div>
    </div>
  );
};