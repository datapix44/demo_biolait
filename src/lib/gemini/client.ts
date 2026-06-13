import { GoogleGenAI } from "@google/genai";

let geminiClient: GoogleGenAI | null = null;

function getClient() {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }
  return geminiClient;
}

export interface GenerateImageParams {
  prompt: string;
  conversationHistory?: { role: "user" | "model"; parts: string[] }[];
}

export interface GenerateImageResult {
  imageBase64: string | null;
  revisedPrompt: string;
  mock: boolean;
}

export async function generateCreation(
  params: GenerateImageParams
): Promise<GenerateImageResult> {
  // Feature flag — use mock when GEMINI_API_KEY is not set
  if (!process.env.GEMINI_API_KEY) {
    return mockGenerate(params.prompt);
  }

  try {
    const client = getClient();
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: params.prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    let imageBase64: string | null = null;
    let revisedPrompt = params.prompt;

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.text) {
        revisedPrompt = part.text;
      }
      if (part.inlineData) {
        imageBase64 = part.inlineData.data ?? null;
      }
    }

    return { imageBase64, revisedPrompt, mock: false };
  } catch (error) {
    console.error("Gemini generation error:", error);
    return mockGenerate(params.prompt);
  }
}

function mockGenerate(prompt: string): GenerateImageResult {
  return {
    imageBase64: null,
    revisedPrompt: `[MOCK] ${prompt}`,
    mock: true,
  };
}
