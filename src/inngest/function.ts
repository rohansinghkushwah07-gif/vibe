

import OpenAI from 'openai';
import { inngest } from "./client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Disable caching to avoid localStorage issues
  dangerouslyAllowBrowser: false,
});

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    console.log("helloWorld started", event.data);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Next.js developer. You write readable and maintainable code. You write simple Next.js and React snippets.',
        },
        {
          role: 'user',
          content: `Write a Next.js or React snippet for: ${event.data.value}`,
        },
      ],
    });

    const output = completion.choices[0]?.message?.content || 'No response';

    console.log("helloWorld completed", output);

    return { output };
  }
);