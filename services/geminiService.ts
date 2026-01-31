
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const explainQuestion = async (questionText: string, options: string[], correctAnswer: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      You are an expert tutor for the "Life in the UK" citizenship test.
      A student is confused about the following question:
      "${questionText}"
      Options: ${options.join(', ')}
      Correct Answer: ${correctAnswer}

      Provide a clear, encouraging, and historical/legal explanation of why this answer is correct. 
      Keep it concise (max 100 words). Focus on key facts that will help them remember.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "I'm sorry, I couldn't generate an explanation right now. Please refer to the official handbook.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI tutor. Please check your internet connection.";
  }
};
