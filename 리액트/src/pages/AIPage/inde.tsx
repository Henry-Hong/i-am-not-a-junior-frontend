import { useState } from "react";
import { createAzure } from "@ai-sdk/azure";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function fetchAzureChatCompletion({
  messages,
}: {
  messages: string;
}) {
  const azure = createAzure({
    apiKey: process.env.AZURE_KEY,
    resourceName: "santa-toeic-cms",
  });
  const { text } = await generateText({
    model: azure("gpt-4o-mini"),
    prompt: messages,
  });
  return text;
}

export default function AIPage() {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt") as string;
    const response = await fetchAzureChatCompletion({ messages: prompt });
    console.log(response);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
