import { GoogleGenAI } from "@google/genai";
import { MediaType } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaptionForImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Generate a catchy, short social media caption for this image. Include 3 relevant hashtags. Keep it under 200 characters.",
          },
        ],
      },
    });
    return response.text || "Cool capture! 📸";
  } catch (error) {
    console.error("Gemini Caption Error:", error);
    return "Just sharing a moment. ✨";
  }
};

export const askAiAboutPost = async (postUrl: string, postType: MediaType, question: string): Promise<string> => {
  try {
    // Note: In a real production scenario, we would fetch the image/video blob here and convert to base64.
    // For this demo, we'll assume we might not have direct blob access to external URLs (CORS) easily without a proxy.
    // However, if it's a user uploaded file (base64), we can send it.
    // We will use a text-only fallback if we can't access the media bytes, or simulate the 'vision' part
    // by describing the context if the URL is external.

    // If it's a data URL (local upload), we can process it.
    if (postUrl.startsWith('data:')) {
      const mimeType = postUrl.substring(postUrl.indexOf(':') + 1, postUrl.indexOf(';'));
      const base64Data = postUrl.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: `You are a helpful social media assistant. Answer this question about the media: "${question}". Keep it concise and fun.`,
            },
          ],
        },
      });
      return response.text || "I couldn't quite catch that, but it looks awesome!";
    } 
    
    // Fallback for external URLs (simulated for demo purposes as we can't download external images client-side easily due to CORS)
    return `(AI Simulation) I can see this is a ${postType.toLowerCase()} content. Based on your question "${question}", it seems interesting! (Note: Real AI analysis requires direct file access)`;
    
  } catch (error) {
    console.error("Gemini Q&A Error:", error);
    return "I'm having trouble connecting to the neural network right now. 🤖";
  }
};

export const generateAiComment = async (caption: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a friendly, relevant social media comment for a post with this caption: "${caption}". Keep it short, positive, and authentic. No quotes.`,
        });
        return response.text || "Great post!";
    } catch (error) {
        return "Love this! 🔥";
    }
}