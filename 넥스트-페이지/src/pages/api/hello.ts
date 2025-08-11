// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const base64Data = "some-random-base-64-data=";
  const encodedFileName = "hello-world";
  const pdfBuffer =  Buffer.from(base64Data, 'base64');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename*=utf-8''${encodedFileName}`);
  res.setHeader('Content-Length', pdfBuffer.length);
  res.send(pdfBuffer);
}
