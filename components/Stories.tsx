import React from 'react';
import { Story } from '../types';

interface StoriesProps {
  stories: Story[];
}

export const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 bg-black border-b border-dark-border mb-4">
      <div className="flex space-x-4 px-4">
        {/* Create Story Circle */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
            <div className="relative w-16 h-16 rounded-full bg-dark-lighter flex items-center justify-center border-2 border-gray-800">
                <span className="text-2xl text-white">+</span>
                <div className="absolute bottom-0 right-0 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center border-2 border-black text-xs font-bold text-white">
                   +
                </div>
            </div>
            <span className="text-xs text-gray-400 truncate w-16 text-center">Your story</span>
        </div>

        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
            <div className={`p-[2px] rounded-full ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'bg-gray-700'}`}>
              <div className="p-[2px] bg-black rounded-full">
                <img 
                    src={story.user.avatarUrl} 
                    alt={story.user.username} 
                    className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-200 truncate w-16 text-center">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};