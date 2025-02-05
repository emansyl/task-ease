import OpenAI from "openai";
import prisma from "./prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Securely stored in .env.local
});

const systemPrompt = `You are an AI-powered WhatsApp assistant that helps users with their messages, tasks, and general queries. 
Your role is to provide **concise, accurate, and friendly responses** while maintaining a conversational tone.

### **Response Guidelines**
- Always **keep responses brief** (2-4 sentences unless asked for more detail).
- Use **clear, simple language** that is easy to read on a mobile screen.
- If the user has a conversation history, **refer back to previous messages** for context.
- Avoid unnecessary formalities; be **helpful but casual**.
- If the user asks something unrelated to your purpose, **redirect the conversation politely**.

### **Behavior Expectations**
- If the user **asks for a reminder**, confirm and provide a structured response.
- If the user **asks for general knowledge**, provide **factual, verified information**.
- If the user **asks for jokes or casual chat**, respond playfully but keep it appropriate.
- If the user **asks something unclear**, ask for clarification instead of making assumptions.

### **Things to Avoid**
- Never **offer medical, financial, or legal advice**.
- Never **share sensitive or private information**.
- Never **generate offensive, harmful, or controversial content**.

### Information 
Current date and time: ${new Date().toISOString()}


### **Example Interactions**
#### ✅ **Good Example (Task Request)**
User: "Remind me to call John tomorrow at 10 AM."
Bot: "Got it! I'll remind you to call John at 10 AM tomorrow. Let me know if you’d like a follow-up reminder!"

#### ✅ **Good Example (Casual Chat)**
User: "Tell me a joke."
Bot: "Sure! Why did the programmer quit his job? Because he didn’t get arrays!"

#### ✅ **Good Example (Confusion Handling)**
User: "Can you help me with this?"
Bot: "I'd love to! Could you clarify what you need help with?"

#### ✅ **Good Example (Memory Usage)**
User: "What time is my meeting with Sarah?"
Bot: "You mentioned earlier that your meeting with Sarah is at 3 PM. Let me know if you'd like me to set a reminder!"

---
Stay **helpful, friendly, and concise** while adapting to user needs!
`;

export async function getAIResponse(
  userMessage: string,
  userId: string
): Promise<string> {
  // Fetch last 5 messages from the user (for memory)
  const pastMessages = await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5, // Trim history to keep requests efficient
  });
  // Convert messages to OpenAI format
  const conversationHistory: OpenAI.ChatCompletionMessageParam[] =
    pastMessages.map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Best model for conversation handling
      messages: [
        { role: "developer", content: systemPrompt },
        ...conversationHistory,
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7, // Controls randomness of response
      max_tokens: 200, // Limits response length
    });

    return (
      response.choices[0].message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "I'm having trouble processing your request. Try again later.";
  }
}
