import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        let {leng, word} = await req.json(); 

        if (!word || typeof word !== "string") {
            return new Response(
                JSON.stringify({ error: "Invalid request: 'word' must be a string" }),
                { status: 400 }
            );
        }

        if (!leng || typeof leng !== "string") {
            return new Response(
                JSON.stringify({ error: "Invalid request: 'leng' must be a string" }),
                { status: 400 }
            );
        }

        if (leng !== "Español" && leng !== "Inglés") {
            return new Response(
                JSON.stringify({ error: "Invalid value for 'leng'. Must be 'Español' or 'Inglés'." }),
                { status: 400 }
            );
        }

        const dictionaryMessage = {
            role: "system",
            content: `Translate the word '${word}' into ${leng} with strict dictionary accuracy. Include the article if applicable. If the word cannot be found, reply with: 'Word not found.' Provide only the translation — no full sentences or extra explanation.`,
        };

        const dictionaryComplition = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                dictionaryMessage,
                { role: "user", content: word },
            ],
        });

        const translation = dictionaryComplition.choices[0].message.content;
        return new Response(
            JSON.stringify({ translation }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in dictionary API:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}