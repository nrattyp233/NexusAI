import { GoogleGenAI } from "@google/genai";

export const generateStrategicContent = async (topic: string, type: string): Promise<string> => {
    // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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
    // Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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