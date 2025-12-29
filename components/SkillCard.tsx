
import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onDelete, isAdmin }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Research': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Field Work': return 'bg-emerald-100 text-emerald-800';
      case 'Soft Skills': return 'bg-stone-100 text-stone-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between group p-3 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-stone-800">{skill.name}</span>
        <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full w-fit font-medium uppercase tracking-tight ${getCategoryColor(skill.category)}`}>
          {skill.category}
        </span>
      </div>
      {isAdmin && onDelete && (
        <button 
          onClick={() => onDelete(skill.id)}
          className="text-stone-300 hover:text-red-500 transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SkillCard;
