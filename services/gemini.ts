import { GoogleGenAI } from "@google/genai";

// EDEN 11 DIRECTIVE: Utilize environmental variables for secure access.
const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("NexusAI Initialization Error:", error);
}

export const generateStrategicContent = async (topic: string, type: string): Promise<string> => {
    if (!ai) return "PROTOCOL FAILURE: API Key missing. Please configure credentials.";

    try {
        const prompt = `
        ACT AS NEXUS-AI, AN ADVANCED BUSINESS INTELLIGENCE UNIT.
        OBJECTIVE: Generate high-conversion ${type} content about "${topic}".
        TONE: Authoritative, Professional, Insightful.
        RESTRICTIONS: No fluff. Pure value.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Output generation failed.";
    } catch (error) {
        console.error("Generation Error:", error);
        return "An error occurred during the neural generation process.";
    }
};

export const analyzeTrendData = async (dataContext: string): Promise<string> => {
    if (!ai) return "PROTOCOL FAILURE: API Key missing.";

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