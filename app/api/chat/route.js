import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    let { message, level, history } = await req.json(); // Expecting message, level, and history

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'message' must be a string" }),
        { status: 400 }
      );
    }

    if (!level || typeof level !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'level' must be a string" }),
        { status: 400 }
      );
    }

    if (!Array.isArray(history)) {
      console.warn("Invalid or missing history. Defaulting to an empty array.");
      history = []; // Default to an empty array if history is invalid
    }

    console.log("Received history from frontend:", history);

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

    // Add the corrected sentence to the conversation history
    const updatedHistory = [
      ...history,
      { role: "user", content: correctedSentence },
    ];

    console.log("Updated history for OpenAI:", updatedHistory);

    // Second role: Provide a conversational response
    const conversationSystemMessage = {
      role: "system",
      content: `You are a young adult from Spain who likes to have online conversations. Your goal is to speak as close to real person at that age es possible. Respond to the user's input in a conversational and friendly way, using vocabulary suitable for a ${level} Spanish level. Keep your response under 400 characters.`,
    };

    const conversationCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        conversationSystemMessage,
        ...updatedHistory, // Include the conversation history
      ],
    });

    const conversationalResponse = conversationCompletion.choices[0].message.content;

    // Return both responses
    return new Response(
      JSON.stringify({
        corrected: correctedSentence,
        reply: conversationalResponse,
        history: updatedHistory, // Return the updated history to the frontend
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