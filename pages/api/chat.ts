const { Configuration, OpenAIApi } = require("openai");
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  data: { message: string } | null;
  error: { message: string } | null;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resOjbect: Data = { data: null, error: null };
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  try {
    const { chat } = req.body;
    const { authorization } = req.headers;
    if (!chat) {
      res.statusCode = 400;
      resOjbect.error = { message: "No chat" };
      res.end(JSON.stringify(resOjbect));
    }
    if (!authorization) {
      res.statusCode = 401;
      resOjbect.error = { message: "Unauthorized request" };
      res.end(JSON.stringify(resOjbect));
    }
    const config = new Configuration({ apiKey: authorization });
    const openai = new OpenAIApi(config);
    const response = await openai.createCompletion("text-davinci-001", {
      prompt: chat,
      temperature: 0.9,
      max_tokens: 300,
    });
    const message = response.data.choices[0].text;
    if (!message) {
      res.statusCode = 500;
      resOjbect.error = { message: "GPT-3 Error" };
      res.end(JSON.stringify(resOjbect));
    }
    res.statusCode = 200;
    resOjbect.data = { message };
    res.end(JSON.stringify(resOjbect));
  } catch (error) {
    res.statusCode = 405;
    resOjbect.error = { message: "Internal server error" };
    res.end(JSON.stringify(resOjbect));
  }
}
