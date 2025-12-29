
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_DATA } from './constants';
import { PortfolioData, Skill } from './types';
import Navbar from './components/Navbar';
import SkillCard from './components/SkillCard';
import { enhanceBio, suggestSkills } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('Research');
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Persistence (Simulated Full Stack with LocalStorage)
  useEffect(() => {
    const savedData = localStorage.getItem('professor_portfolio_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('professor_portfolio_data', JSON.stringify(data));
  }, [data]);

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      category: newSkillCategory
    };
    
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setNewSkillName('');
  };

  const deleteSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleEnhanceBio = async () => {
    setIsEnhancing(true);
    const enhanced = await enhanceBio(data.bio);
    setData(prev => ({ ...prev, bio: enhanced }));
    setIsEnhancing(false);
  };

  const handleSkillSuggestions = async () => {
    setIsEnhancing(true);
    const researchTitles = data.researchAreas.map(r => r.title).join(', ');
    const suggestions = await suggestSkills(researchTitles);
    
    const newSkills: Skill[] = suggestions.map((name, index) => ({
      id: `suggested-${Date.now()}-${index}`,
      name,
      category: 'Research'
    }));

    setData(prev => ({
      ...prev,
      skills: [...prev.skills, ...newSkills]
    }));
    setIsEnhancing(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-4 border-emerald-800 shadow-2xl overflow-hidden shrink-0">
            <img 
              src="https://picsum.photos/seed/professor/600/600" 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block px-4 py-1 bg-emerald-800 text-emerald-100 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {data.university}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{data.name}</h1>
            <p className="text-xl md:text-2xl text-emerald-100/90 font-light mb-8 max-w-2xl italic leading-relaxed">
              "{data.title}"
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                Contact Office
              </a>
              <button className="bg-emerald-800/50 hover:bg-emerald-800 text-white px-8 py-3 rounded-full font-bold border border-emerald-700 transition-all">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto mt-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About Section */}
            <section id="about" className="scroll-mt-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-stone-800 flex items-center gap-3">
                  Biography <span className="h-0.5 w-12 bg-emerald-600"></span>
                </h2>
                {isAdmin && (
                  <button 
                    onClick={handleEnhanceBio}
                    disabled={isEnhancing}
                    className="text-xs flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    {isEnhancing ? 'Refining...' : 'Refine with AI'}
                  </button>
                )}
              </div>
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative group">
                {isAdmin ? (
                  <textarea 
                    value={data.bio}
                    onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full h-40 p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-stone-700 leading-relaxed"
                  />
                ) : (
                  <p className="text-lg text-stone-600 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-emerald-700 first-letter:mr-3 first-letter:float-left">
                    {data.bio}
                  </p>
                )}
              </div>
            </section>

            {/* Research Areas */}
            <section id="research" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-stone-800 mb-8 flex items-center gap-3">
                Current Research <span className="h-0.5 w-12 bg-emerald-600"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.researchAreas.map(area => (
                  <div key={area.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:border-emerald-200 transition-all group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{area.icon}</div>
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{area.title}</h3>
                    <p className="text-stone-500 text-sm">{area.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section id="publications" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-stone-800 mb-8 flex items-center gap-3">
                Key Publications <span className="h-0.5 w-12 bg-emerald-600"></span>
              </h2>
              <div className="space-y-4">
                {data.publications.sort((a,b) => b.year - a.year).map(pub => (
                  <div key={pub.id} className="bg-white border-l-4 border-emerald-600 p-6 rounded-r-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-stone-800 pr-4">{pub.title}</h4>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded text-sm shrink-0">{pub.year}</span>
                    </div>
                    <p className="text-stone-500 italic text-sm">{pub.journal}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            
            {/* Skills / Expertise */}
            <section className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-stone-800">Expertise</h3>
                {isAdmin && (
                  <button 
                    onClick={handleSkillSuggestions}
                    disabled={isEnhancing}
                    className="text-[10px] font-bold uppercase text-emerald-600 hover:underline disabled:opacity-50"
                  >
                    Auto-Suggest
                  </button>
                )}
              </div>
              
              <div className="space-y-3 mb-8">
                {data.skills.map(skill => (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    isAdmin={isAdmin} 
                    onDelete={deleteSkill}
                  />
                ))}
              </div>

              {isAdmin && (
                <form onSubmit={addSkill} className="border-t border-stone-100 pt-6">
                  <div className="space-y-3">
                    <input 
                      type="text"
                      placeholder="New Skill Name..."
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <select 
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value as Skill['category'])}
                      className="w-full text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Research">Research</option>
                      <option value="Technical">Technical</option>
                      <option value="Field Work">Field Work</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                    <button 
                      type="submit"
                      className="w-full bg-emerald-700 text-white text-sm font-bold py-3 rounded-xl hover:bg-emerald-800 transition-colors"
                    >
                      Add New Skill
                    </button>
                  </div>
                </form>
              )}

              {/* Contact Info Widget */}
              <div id="contact" className="mt-8 pt-8 border-t border-stone-100">
                <h4 className="text-stone-400 font-bold text-[10px] uppercase tracking-widest mb-4">Contact Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-stone-600 font-medium truncate">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-stone-600 font-medium">{data.location}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-24 py-12 border-t border-stone-200 text-center">
        <p className="text-stone-400 text-sm">© {new Date().getFullYear()} {data.name}. Developed for Academic Excellence.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-stone-300 hover:text-emerald-700 transition-colors">LinkedIn</a>
          <a href="#" className="text-stone-300 hover:text-emerald-700 transition-colors">ResearchGate</a>
          <a href="#" className="text-stone-300 hover:text-emerald-700 transition-colors">Google Scholar</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
