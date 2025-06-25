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
      content: `Given the topic: '${topic}', provide 5 Spanish words useful for discussing this topic fluently. List each word on a new line with its English translation in the format: 
      
      word1Spanish   →   word1English 
      word2Spanish   →   word2English 
      word3Spanish   →   word3English 
      word4Spanish   →   word4English
      word5Spanish   →   word5English
      
      If the topic is not found, respond with 'Topic not found.' Provide only the list—no sentences or extra text.`,
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