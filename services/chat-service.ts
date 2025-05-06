import { createTravelAssistantPromptVietnam } from "@/utils/create-prompt-template";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export async function getChatResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createTravelAssistantPromptVietnam(prompt),
  });
  return response.text;
}
