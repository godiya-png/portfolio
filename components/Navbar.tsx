
import React from 'react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, setIsAdmin }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold">T</div>
        <span className="text-xl font-serif font-bold text-stone-800 hidden sm:inline">Prof. Thorne</span>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-sm font-medium text-stone-600">
          <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
          <a href="#research" className="hover:text-emerald-700 transition-colors">Research</a>
          <a href="#publications" className="hover:text-emerald-700 transition-colors">Publications</a>
          <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
        </div>
        
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            isAdmin ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-stone-100 text-stone-500 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          {isAdmin ? 'Admin Mode' : 'View Only'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
