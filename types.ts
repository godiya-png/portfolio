
export interface Skill {
  id: string;
  name: string;
  category: 'Research' | 'Technical' | 'Soft Skills' | 'Field Work';
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  link?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  university: string;
  bio: string;
  email: string;
  location: string;
  skills: Skill[];
  publications: Publication[];
  researchAreas: ResearchArea[];
}
