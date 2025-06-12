import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    let { topic } = await req.json();

    if (!topic || typeof topic !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'topic' must be a string" }),
        { status: 400 }
      );
    }

    const topicMessage = {
      role: "system",
      content: `When a topic is given, give 5 Spanish words that could be used to make this topic more fluent. The topic is: "${topic}". Provide the words in a line format, like this - each wor and translation from new line (eg): 
      
      word1Spanish   →   word1English 
      word2Spanish   →  word2English 
      word3Spanish   →   word3English 
      word4Spanish   →   word4English
      word5Spanish   →   word5English
      
      If the topic is not found, respond with "Topic not found." Never write a sentence, always as short an answer as possible.`,
    };

    const topicCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        topicMessage,
        { role: "user", content: topic },
      ],
    });

    const topicWords = topicCompletion.choices[0].message.content;
    return new Response(
      JSON.stringify({ topicWords }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in topic API:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}