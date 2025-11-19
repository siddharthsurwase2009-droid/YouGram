import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Wand2, Loader2, Video } from 'lucide-react';
import { generateCaptionForImage } from '../services/geminiService';
import { MediaType } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, caption: string, type: MediaType) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>(MediaType.IMAGE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      
      // Simple type detection
      if (file.type.startsWith('video/')) {
        setMediaType(MediaType.VIDEO);
      } else {
        setMediaType(MediaType.IMAGE);
      }
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedFile || mediaType === MediaType.VIDEO) return; // Video caption generation is complex for this demo without frame extraction

    setIsGenerating(true);
    try {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            const imageBase64 = base64.split(',')[1];
            const genCaption = await generateCaptionForImage(imageBase64, selectedFile.type);
            setCaption(genCaption);
            setIsGenerating(false);
        };
        reader.readAsDataURL(selectedFile);
    } catch (e) {
        console.error(e);
        setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile, caption, mediaType);
      onClose();
      // Reset
      setSelectedFile(null);
      setPreview(null);
      setCaption('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-dark-lighter border border-dark-border rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-dark-border">
          <h2 className="text-lg font-semibold">Create New Post</h2>
          <button onClick={onClose} className="text-blue-500 font-semibold hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Media Preview Area */}
            <div className="flex-1 bg-black flex items-center justify-center relative border-b md:border-b-0 md:border-r border-dark-border min-h-[300px]">
                {preview ? (
                    mediaType === MediaType.VIDEO ? (
                        <video src={preview} controls className="max-h-full max-w-full object-contain" />
                    ) : (
                        <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
                    )
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <div className="mb-4 p-4 rounded-full bg-dark-lighter border-2 border-dashed border-gray-600">
                            <ImageIcon size={48} />
                        </div>
                        <p className="mb-4">Drag photos or videos here</p>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Select from computer
                        </button>
                    </div>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*,video/*" 
                    className="hidden" 
                />
            </div>

            {/* Caption Area */}
            {selectedFile && (
                <div className="w-full md:w-80 p-4 flex flex-col bg-dark-lighter">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <span className="font-semibold text-sm">creative_soul</span>
                    </div>
                    
                    <textarea 
                        className="w-full bg-transparent text-white resize-none focus:outline-none text-sm flex-1 mb-4"
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={2200}
                    />
                    
                    {mediaType === MediaType.IMAGE && (
                        <div className="mb-4">
                            <button 
                                onClick={handleGenerateCaption}
                                disabled={isGenerating}
                                className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all
                                    ${isGenerating 
                                        ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/30'
                                    }`}
                            >
                                {isGenerating ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Wand2 size={16} />
                                )}
                                <span>{isGenerating ? 'Dreaming up magic...' : 'Write with Gemini AI'}</span>
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-gray-400 text-xs pt-4 border-t border-dark-border">
                        <span>Add location</span>
                        <span className="text-white">Yosemite</span>
                    </div>
                    
                    <div className="mt-auto pt-4">
                        <button 
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition active:scale-95"
                        >
                            Share
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};