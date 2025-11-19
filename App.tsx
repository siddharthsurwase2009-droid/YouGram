import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Stories } from './components/Stories';
import { PostItem } from './components/PostItem';
import { CreatePostModal } from './components/CreatePostModal';
import { Suggestions } from './components/Suggestions';
import { MOCK_POSTS, MOCK_STORIES, CURRENT_USER } from './constants';
import { Post, MediaType } from './types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePost = (file: File, caption: string, type: MediaType) => {
    // Create a temporary URL for the uploaded file
    // In a real app, you'd upload to S3/Cloudinary here
    const reader = new FileReader();
    reader.onload = (e) => {
        if (e.target?.result) {
            const newPost: Post = {
                id: uuidv4(),
                user: CURRENT_USER,
                type: type,
                url: e.target.result as string,
                caption: caption,
                likes: 0,
                comments: [],
                timestamp: 'Just now',
                aspectRatio: type === MediaType.VIDEO ? 'landscape' : 'square', // simplified assumption
            };
            setPosts([newPost, ...posts]);
        }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex justify-center md:justify-start">
        
        {/* Sidebar / Bottom Nav */}
        <Sidebar 
            currentUser={CURRENT_USER} 
            onCreateClick={() => setIsCreateModalOpen(true)} 
        />

        {/* Main Feed Area */}
        <main className="flex-1 flex justify-center w-full md:ml-64 lg:mr-80 transition-all duration-300">
          <div className="w-full max-w-[630px] pt-4 md:pt-8 pb-20 md:pb-4 px-0">
            <Stories stories={MOCK_STORIES} />
            
            <div className="flex flex-col items-center mt-4 px-2 md:px-0">
              {posts.map(post => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
            
            {/* End of Feed Marker */}
            <div className="flex flex-col items-center py-8 text-gray-500 space-y-2">
                <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                </div>
                <p>You're all caught up!</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Suggestions) */}
        <Suggestions currentUser={CURRENT_USER} />

        {/* Modals */}
        <CreatePostModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePost}
        />
        
      </div>
    </Router>
  );
}

export default App;