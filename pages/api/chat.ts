const { Configuration, OpenAIApi } = require("openai");
import Secret from "../../secret";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

type Data = {
  data: { message: string } | null;
  error: { message: string } | null;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    const { chat } = req.body;
    if (!chat) {
      throw new Error("No chat provided");
    }
    const config = new Configuration({ apiKey: Secret.API_key });
    const openai = new OpenAIApi(config);

    const response = await openai.createCompletion("text-davinci-001", {
      prompt: chat,
      temperature: 0.9,
      max_tokens: 300,
    });
    const message = response.data.choices[0].text;
    if (!message) {
      throw new Error("No response");
    }
    console.log("replying with", message);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(message));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   if (req.method === "POST") {
//     const { body } = req;
//     const { chat } = body;
//     if (!chat) {
//       //console.log("No chat");
//     }
//     //console.log("Chat was", chat);

//     const OPENAI_API_KEY = Secret.API_key;
//     //console.log("API key acquired:",OPENAI_API_KEY);

//     const config = new Configuration({ apiKey: OPENAI_API_KEY });

//     const openai = new OpenAIApi(config);

//     (async () => {
//       //console.log("Calling OpenAI");
//       const response = await openai.createCompletion("text-davinci-001", {
//         prompt: chat,
//         temperature: 0.9,
//         max_tokens: 150,
//       });

//       const message = response.data.choices[0].text;
//       console.log("Got your message :)", message);

//       if (!message) {
//         res
//           .status(500)
//           .send({ error: { message: "Server error" }, data: null });
//       }

//       res.status(200).send({ error: null, data: { message } });
//     })();
//   } else {
//     res.status(404).send({ error: { message: "Page not found" }, data: null });
//   }
// }
