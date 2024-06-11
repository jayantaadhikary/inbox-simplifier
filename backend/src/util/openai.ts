import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getCompletion = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful email summarizing assistant. I am a user who needs help summarizing emails. I will provide you with the email and you will provide me with a summary of the email.",
      },
      {
        role: "user",
        content: `I need help summarizing the following email: ${prompt}. Summarize it for me. Return in json format {sender: string, recipient: string, subject: string, body: string}.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
};
