
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  name: "Dr. Julian Thorne",
  title: "Professor of Sustainable Agronomy",
  university: "Global Agricultural University",
  bio: "With over 20 years of experience in soil science and sustainable crop management, Dr. Thorne focuses on bridging the gap between traditional farming techniques and modern biotechnological advancements. His work has been instrumental in developing drought-resistant cultivation strategies for sub-Saharan regions.",
  email: "j.thorne@agri-uni.edu",
  location: "Academic Square, Bio-Research Wing",
  skills: [
    { id: '1', name: 'Soil Micro-biome Analysis', category: 'Research' },
    { id: '2', name: 'Precision Irrigation', category: 'Field Work' },
    { id: '3', name: 'R Statistical Modeling', category: 'Technical' },
    { id: '4', name: 'Grant Writing', category: 'Soft Skills' }
  ],
  publications: [
    { id: 'p1', title: 'Carbon Sequestration in Semi-Arid Soil Systems', journal: 'Nature Plants', year: 2023 },
    { id: 'p2', title: 'The Future of Non-GMO Pest Resistance', journal: 'Journal of Agronomy', year: 2022 },
    { id: 'p3', title: 'Nitrogen Runoff: A 10-Year Study in the Delta', journal: 'Environmental Science Today', year: 2021 }
  ],
  researchAreas: [
    { id: 'r1', title: 'Climate Resilience', description: 'Developing crop varieties that thrive in extreme temperature fluctuations.', icon: '🌡️' },
    { id: 'r2', title: 'Organic Enrichment', description: 'Utilizing local bio-waste for high-yield soil nutrition.', icon: '🌱' },
    { id: 'r3', title: 'Hydroponics', description: 'Advanced urban farming techniques using mineral nutrient solutions.', icon: '💧' }
  ]
};
