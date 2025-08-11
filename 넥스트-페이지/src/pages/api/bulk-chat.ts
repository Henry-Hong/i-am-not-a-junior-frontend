import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nums }: { nums?: string[] } = req.query;

  const promises = nums
    ? nums.map((num) => fetch(`http://localhost:3005/ai/chat?num=${num}`))
    : [];

  const responses = await Promise.all(promises);
  const results = await Promise.all(responses.map((res) => res.json()));

  res.json({ value: results });
}

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
