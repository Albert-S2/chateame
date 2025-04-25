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
    const { message } = await req.json(); // Expecting a single user message

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'message' must be a string" }),
        { status: 400 }
      );
    }

    // First role: Correct the user's sentence
    const correctionSystemMessage = {
      role: "system",
      content: "You are a Spanish grammar expert. Correct the following sentence in proper Spanish without adding anything else.",
    };

    const correctionCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        correctionSystemMessage,
        { role: "user", content: message },
      ],
    });

    const correctedSentence = correctionCompletion.choices[0].message.content;

    // Second role: Provide a conversational response
    const conversationSystemMessage = {
      role: "system",
      content: "You are a young adult from Spain, who like to have onlice conversation. thank to that user can practice its spanish with you. Respond to the user's input in a conversational and friendly way, using vocabulary suitable for a B2 Spanish level. Keep your response under 400 characters.",
    };

    const conversationCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        conversationSystemMessage,
        { role: "user", content: message },
      ],
    });

    const conversationalResponse = conversationCompletion.choices[0].message.content;

    // Return both responses
    return new Response(
      JSON.stringify({
        corrected: correctedSentence,
        reply: conversationalResponse,
      }),
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