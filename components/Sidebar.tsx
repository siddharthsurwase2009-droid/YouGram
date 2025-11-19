import React from 'react';
import { Home, Search, PlusSquare, Heart, User, Compass, Film } from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  currentUser: UserType;
  onCreateClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, onCreateClick }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-black border-r border-dark-border fixed left-0 top-0 p-4 z-50">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent italic">
            StreamGram
          </h1>
        </div>
        
        <nav className="flex-1 space-y-4">
          <NavItem icon={<Home size={26} />} label="Home" active />
          <NavItem icon={<Search size={26} />} label="Search" />
          <NavItem icon={<Compass size={26} />} label="Explore" />
          <NavItem icon={<Film size={26} />} label="Reels" />
          <NavItem icon={<Heart size={26} />} label="Notifications" />
          <div onClick={onCreateClick} className="cursor-pointer">
             <NavItem icon={<PlusSquare size={26} />} label="Create" />
          </div>
          <NavItem icon={<User size={26} />} label="Profile" />
        </nav>

        <div className="mt-auto px-2 py-4 border-t border-dark-border">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-dark-lighter p-2 rounded-lg transition">
                <img src={currentUser.avatarUrl} alt="Me" className="w-8 h-8 rounded-full ring-2 ring-gray-700" />
                <span className="font-medium text-sm">{currentUser.username}</span>
            </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-dark-border z-50 px-4 py-3 flex justify-between items-center">
        <Home size={24} className="text-white" />
        <Compass size={24} className="text-gray-500" />
        <div onClick={onCreateClick} className="bg-gradient-to-r from-secondary to-primary p-2 rounded-xl -mt-6 shadow-lg shadow-pink-900/50 cursor-pointer transform active:scale-95 transition">
            <PlusSquare size={24} className="text-white" />
        </div>
        <Film size={24} className="text-gray-500" />
        <img src={currentUser.avatarUrl} alt="Me" className="w-6 h-6 rounded-full ring-1 ring-gray-500" />
      </div>
    </>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${active ? 'font-bold text-white' : 'text-gray-400 hover:text-white hover:bg-dark-lighter'}`}>
    <div className="group-hover:scale-110 transition-transform duration-200">
        {icon}
    </div>
    <span className="text-base">{label}</span>
  </div>
);