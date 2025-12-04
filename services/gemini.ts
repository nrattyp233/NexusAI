import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
    return localStorage.getItem('nexus_api_key') || '';
};

export const generateStrategicContent = async (topic: string, type: string): Promise<string> => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
        return "ERROR: API key required. Please configure your API key in Settings to enable content generation.";
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
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
    const apiKey = getApiKey();
    
    if (!apiKey) {
        return "API key required for AI analysis. Configure in Settings to enable insights.";
    }

    const ai = new GoogleGenAI({ apiKey });

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