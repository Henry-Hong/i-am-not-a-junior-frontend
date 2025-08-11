import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { num } = req.query;
  // await new Promise((res) => setTimeout(res, random(500, 1000)));
  const response = await fetch(`http://localhost:3005/ai/chat?num=${num}`);
  const result = await response.json();
  res.json({ value: result });
}

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
