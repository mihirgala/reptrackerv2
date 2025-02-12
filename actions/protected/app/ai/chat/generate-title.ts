"use server"

import { db } from "@/lib/db";
import { JSONmodel } from "@/lib/google-generative-ai";

export const generateTitle = async (chatId: string, _messages: any) => {

    try {

        const promptMessage = `Generate a concise and catchy title for this chat (20 characters max).
        ${JSON.stringify(_messages)}`
        const result = await JSONmodel.generateContent(promptMessage)
        const response = result.response
        const title = JSON.parse(response.text())

        // Update the database
        await db.chat.update({
            where: { id: chatId },
            data: {
                name: title[0]
            }
        });

        return { name: title[0] }

    } catch (e: any) {
        console.error("Error generating title with Gemini:", e)
        return false
    }
};