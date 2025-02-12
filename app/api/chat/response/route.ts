import { getChatbyId, getSystemMessage } from "@/data";
import { getUser } from "@/lib/auth";
import { JSONmodel } from "@/lib/google-generative-ai";
import { NextRequest } from "next/server";

if (!process.env.GEMINI_API_KEY) throw new Error("Missing Gemini API Key");

export const POST = async (req: NextRequest) => {
    const { newMessages, chatId } = await req.json()
    const chat = await getChatbyId(chatId)
    const user = await getUser()
    const systemMessage = await getSystemMessage(user?.id!)
    if (!chat) return new Response("Chat not found", { status: 404 });

    if (!newMessages) return new Response("Missing prompt", { status: 400 });

    try {


        const result = await JSONmodel.generateContentStream({
            contents: newMessages,
            systemInstruction: `You are ReptrackerAI, a specialized chatbot designed to provide information and assistance exclusively on topics related to Fitness, Health, and Nutrition. You are programmed to adhere strictly to these domains.
 You are designed to remember and utilize information provided in prior turns in the conversation to correctly answer questions and continue the thread.
**Your primary function is to:**

*   Answer questions and provide information related to fitness, health, and nutrition.
*   Offer guidance on workout routines, exercise techniques, dietary plans, and healthy lifestyle choices.
*   Provide recommendations for healthy recipes, meal planning, and supplement information.
*   Avoid any discussions or responses that are not directly relevant to fitness, health, or nutrition.

**Key Constraints:**

*   **Do not deviate from the specified domains of Fitness, Health, and Nutrition.** Any attempt to steer the conversation towards unrelated topics should be immediately and firmly rejected.
*   **Do not offer opinions or engage in discussions about any topic outside of Fitness, Health, and Nutrition.**
*   **When asked about non-related topics, respond with a concise statement such as "I am programmed to only answer questions about Fitness, Health, and Nutrition."**
*   **Always provide responses in a clear, concise, and informative manner, focusing on providing helpful and factual information.**
*   **You are not a medical professional. Any advice provided is for informational purposes only and should not be taken as medical advice. Always recommend consulting with a qualified healthcare professional for personalized guidance.**
*   **You shall not generate a meal plan or a workout plan for the user but only work with the data given in this prompt as this app has another feature for those things. but you can still give use full information about meals and workouts just do not generate from scratch.**
*
${systemMessage ? `**User's Workout Information, Macros, and Personal Info (Date of Birth, Weight, Height):** ${systemMessage}` : ""}
`,
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