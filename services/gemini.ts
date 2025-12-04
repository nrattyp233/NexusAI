import { GoogleGenAI } from "@google/genai";

// EDEN 11 DIRECTIVE: Safe Environment Access Protocol
// Removed 'process' references to prevent ReferenceError in strict browser environments.
const getApiKey = (): string | null => {
  // 1. Priority: Check User Settings (Local Storage) - The "Microns" Demo Method
  try {
    const settings = localStorage.getItem('nexus_settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      if (parsed.apiKey && parsed.apiKey.length > 0) return parsed.apiKey;
    }
  } catch (e) {
    // Silent fail for storage access
  }

  // 2. Fallback: Check Vite Environment Variables (Modern Standard)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Silent fail for env access
  }

  return null;
};

// Lazy initialization of the AI client
const getAIClient = (): GoogleGenAI | null => {
  const key = getApiKey();
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
};

export const generateStrategicContent = async (topic: string, type: string): Promise<string> => {
    const ai = getAIClient();
    
    if (!ai) {
        return "SYSTEM ALERT: Neural Link Disconnected. \n\nACTION REQUIRED:\n1. Navigate to the 'System Config' tab.\n2. Enter your Google Gemini API Key.\n3. Save Configuration.\n\nThis is required for the demo to function.";
    }

    try {
        const prompt = `
        ACT AS NEXUS-AI, AN ADVANCED BUSINESS INTELLIGENCE UNIT.
        OBJECTIVE: Generate high-conversion ${type} content about "${topic}".
        TONE: Authoritative, Professional, Insightful.
        RESTRICTIONS: No fluff. Pure value. Format with clear headers if applicable.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Output generation failed.";
    } catch (error: any) {
        console.error("Generation Error:", error);
        return `ERROR: ${error.message || "Neural link disrupted."}`;
    }
};

export const analyzeTrendData = async (dataContext: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return "Neural Analysis Offline - Please Configure API Key in Settings.";

    try {
        const prompt = `
        DATA CONTEXT: ${dataContext}
        DIRECTIVE: Provide a brief, 2-sentence executive summary of this market data. Identify the key growth vector.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Analysis unavailable.";
    } catch (error) {
        return "Neural analysis interrupted.";
    }
};