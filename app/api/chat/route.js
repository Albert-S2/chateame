import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key is not configured" }),
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'messages' must be an array" }),
        { status: 400 }
      );
    }

    // Add a system prompt to guide the AI
    const systemMessage = {
      role: "system",
      content: "You are my colleague who helps me to practice my conversations in Spanish. I am currently on my B2 Spanish Level and I want to improve my Spanish. When answering, first re-write my words in correct Spanish using Spanish letters as well, then answer my question starting with '>>'  in a nice friendly way like a student from Spain. Please use popular language that will enhance my skills with time. But each of your answers shouldn't be longer than 400 letters.",
    };

    // Ensure the systemMessage is the first message
    const updatedMessages = [systemMessage, ...messages];

    // Call the OpenAI API with the updated messages
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use a valid model name
      messages: updatedMessages,
    });

    return new Response(
      JSON.stringify({ reply: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch from OpenAI" }),
      { status: 500 }
    );
  }
}