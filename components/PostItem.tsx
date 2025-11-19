import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles, SendHorizontal } from 'lucide-react';
import { Post, MediaType } from '../types';
import { askAiAboutPost } from '../services/geminiService';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTypingAi, setIsTypingAi] = useState(false);

  const handleLike = () => setLiked(!liked);

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    
    setIsTypingAi(true);
    setAiResponse(null);
    
    const response = await askAiAboutPost(post.url, post.type, aiQuestion);
    setAiResponse(response);
    setIsTypingAi(false);
  };

  return (
    <div className="bg-black border border-dark-border rounded-xl mb-6 overflow-hidden max-w-[470px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
            <div className="p-[2px] bg-black rounded-full">
                <img src={post.user.avatarUrl} alt={post.user.username} className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm hover:text-gray-300">{post.user.username}</span>
                {post.user.isVerified && <span className="text-blue-500 text-[10px]">✓</span>}
            </div>
            {post.location && <span className="text-xs text-gray-400">{post.location}</span>}
          </div>
        </div>
        <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
      </div>

      {/* Content */}
      <div className="relative bg-dark-lighter">
        {post.type === MediaType.VIDEO ? (
          <video 
            src={post.url} 
            poster={post.thumbnailUrl}
            controls 
            className={`w-full object-contain ${post.aspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square'}`} 
          />
        ) : (
          <img 
            src={post.url} 
            alt="Post" 
            className={`w-full object-cover ${post.aspectRatio === 'portrait' ? 'aspect-[4/5]' : post.aspectRatio === 'landscape' ? 'aspect-video' : 'aspect-square'}`}
          />
        )}
        
        {/* AI Toggle Button */}
        <button 
            onClick={() => setShowAiChat(!showAiChat)}
            className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full border border-white/20 hover:bg-white/20 transition-all group"
        >
            <Sparkles size={18} className={showAiChat ? "text-yellow-400" : "text-white group-hover:text-yellow-300"} />
        </button>
      </div>

      {/* AI Interaction Section */}
      {showAiChat && (
        <div className="bg-gray-900/50 border-b border-dark-border p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-start space-x-3 mb-3">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1.5 rounded-full mt-1">
                    <Sparkles size={12} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-300 font-medium mb-1">Ask Gemini about this post</p>
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            placeholder="e.g., What camera angle is this?"
                            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                        />
                        <button 
                            onClick={handleAskAi}
                            disabled={isTypingAi}
                            className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition disabled:opacity-50"
                        >
                            <SendHorizontal size={16} />
                        </button>
                    </div>
                </div>
            </div>
            
            {isTypingAi && (
                <div className="ml-10 text-xs text-gray-500 animate-pulse">Thinking...</div>
            )}
            
            {aiResponse && (
                <div className="ml-10 bg-gray-800 rounded-lg rounded-tl-none p-3 text-sm text-gray-200 border border-gray-700">
                    {aiResponse}
                </div>
            )}
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-4">
            <Heart 
                size={26} 
                className={`cursor-pointer transition-transform active:scale-75 ${liked ? 'fill-red-500 text-red-500' : 'text-white hover:text-gray-400'}`} 
                onClick={handleLike}
            />
            <MessageCircle size={26} className="text-white hover:text-gray-400 cursor-pointer -rotate-90" />
            <Send size={26} className="text-white hover:text-gray-400 cursor-pointer" />
          </div>
          <Bookmark size={26} className="text-white hover:text-gray-400 cursor-pointer" />
        </div>

        <div className="mb-2">
            <span className="font-bold text-sm">{post.likes + (liked ? 1 : 0)} likes</span>
        </div>

        <div className="mb-1">
            <span className="font-bold text-sm mr-2">{post.user.username}</span>
            <span className="text-sm text-gray-200">{post.caption}</span>
        </div>
        
        {post.comments.length > 0 ? (
            <div className="text-gray-500 text-sm cursor-pointer">View all {post.comments.length} comments</div>
        ) : (
            <div className="text-gray-500 text-xs uppercase tracking-wide mt-1">{post.timestamp}</div>
        )}
      </div>
    </div>
  );
};