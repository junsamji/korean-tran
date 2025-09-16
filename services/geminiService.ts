import { GoogleGenAI, Type } from "@google/genai";
import type { Translation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const translationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      language: {
        type: Type.STRING,
        description: "The target language of the translation (e.g., 'English', 'Japanese').",
      },
      translation: {
        type: Type.STRING,
        description: "The translated text.",
      },
    },
    required: ["language", "translation"],
  },
};

export const translateText = async (text: string): Promise<Translation[]> => {
  const targetLanguages = "English, Japanese, Chinese, Vietnamese, German, and Thai";
  const prompt = `Translate the following Korean text into ${targetLanguages}. Provide the output as a JSON array where each object has a "language" and a "translation" key. Korean Text: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: translationSchema,
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);

    if (!Array.isArray(parsedJson)) {
        throw new Error("API response is not a JSON array.");
    }

    return parsedJson as Translation[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to translate text. The API returned an error.");
  }
};