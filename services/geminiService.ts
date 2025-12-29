
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceBio = async (currentBio: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert academic copywriter. Enhance the following professional biography for an Agricultural Science Professor to make it more compelling, formal, and prestigious, while keeping it under 150 words: "${currentBio}"`,
    });
    return response.text || currentBio;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentBio;
  }
};

export const suggestSkills = async (researchAreas: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these research areas in Agricultural Science: "${researchAreas}", suggest 5 relevant high-level technical skills or software tools. Return only a comma-separated list of skills.`,
    });
    const text = response.text || "";
    return text.split(',').map(s => s.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
