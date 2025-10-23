
import { GoogleGenAI } from "@google/genai";
import type { DistrictData, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInsightsSummary = async (
  districtData: DistrictData,
  language: Language
): Promise<string> => {
  const langInstruction = language === 'hi' ? 'Hindi' : 'English';
  const districtName = language === 'hi' ? districtData.nameHi : districtData.name;

  const prompt = `
    You are a data analyst explaining MGNREGA performance data to a rural citizen in India with low data literacy.
    Your tone should be simple, encouraging, and easy to understand.
    Use emojis like 🟢 for good performance/growth, 🔴 for decline, and 🟠 for steady or average performance.
    Provide a short, bulleted summary based on the following data for ${districtName} district.
    Respond ONLY in ${langInstruction}. Do not use markdown like ** or ##.

    Data:
    - Total Households Benefited: ${districtData.totalHouseholds.toLocaleString('en-IN')}
    - Total Workers Employed: ${districtData.totalWorkers.toLocaleString('en-IN')}
    - Total Funds Utilized: ₹${districtData.totalFundsUsed} Lakhs
    
    Monthly Performance (Workers Employed, District vs State Average):
    ${districtData.monthlyPerformance.map(d => `- ${language === 'hi' ? d.monthHi : d.month}: Your District: ${d.districtValue}, State Average: ${d.stateValue}`).join('\n')}

    Based on this data, provide a simple summary of the district's performance in 3-4 bullet points. Mention if the district is doing better or worse than the state average in recent months.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights:", error);
    if (language === 'hi') {
      return "सारांश उत्पन्न करने में एक त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।";
    }
    return "An error occurred while generating the summary. Please try again later.";
  }
};
