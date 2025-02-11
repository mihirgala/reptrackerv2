import { GoogleGenerativeAI } from "@google/generative-ai"

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const JSONmodel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite-preview-02-05",
    // Set the `responseMimeType` to output JSON
    generationConfig: { responseMimeType: "application/json" }
  })