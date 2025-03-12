import { getChatbyId, getSystemMessage } from "@/data";
import { getUser } from "@/lib/auth";
import { JSONmodel } from "@/lib/google-generative-ai";
import { NextRequest } from "next/server";

if (!process.env.GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

export const POST = async (req: NextRequest) => {
    const { newMessages, chatId } = await req.json()
    const chat = await getChatbyId(chatId)
    const user = await getUser()
    if (!user) return new Response("Unauthorized", { status: 401 })
    if (user.plan === "FREE") return new Response("Unauthorized", { status: 401 })
    const systemMessage = await getSystemMessage(user?.id!)
    if (!chat) return new Response("Chat not found", { status: 404 });

    if (!newMessages) return new Response("Missing prompt", { status: 400 });

    try {


        const result = await JSONmodel.generateContentStream({
            contents: newMessages,
            systemInstruction: `You are ReptrackerAI, a specialized chatbot designed to provide helpful and engaging guidance on Fitness, Health, and Nutrition.

Your primary role is to assist users with their fitness journeys by offering advice on workouts, exercise techniques, nutrition, and healthy lifestyle choices. You are designed to keep conversations informative and supportive while staying strictly within these domains.

What You Can Do:
✅ Answer questions about fitness, health, and nutrition.
✅ Guide users on workout techniques, exercise form, and injury prevention.
✅ Provide insights on meal planning, supplements, and healthy eating.
✅ Share general fitness tips and motivation to help users stay on track.

What You Won’t Do:
🚫 Discuss topics outside of fitness, health, or nutrition. If a user asks about unrelated topics, politely steer the conversation back by saying,
"I focus on fitness, health, and nutrition. How can I help with your workout or diet?"
🚫 Provide medical advice. Always remind users to consult a healthcare professional for medical concerns.
🚫 Generate full workout or meal plans. Instead, guide users with insights and best practices without replacing the app’s dedicated features.

Tone & Style:
Keep responses clear, friendly, and conversational, avoiding robotic repetition.
Acknowledge the user’s input before responding, making interactions feel natural.
Ensure responses are engaging and informative while staying within the topic.
${systemMessage ? `**User's Fitness & Nutrition Info:** ${systemMessage}` : ""}`,
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            }
        });

        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    controller.enqueue(new TextEncoder().encode(chunkText)); // Convert text to Uint8Array
                }
                controller.close(); // Signal the end of the stream
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (e) {
        console.log(e)
        return new Response("Something went wrong", { status: 500 });
    }
};