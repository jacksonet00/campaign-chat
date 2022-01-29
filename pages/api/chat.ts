const { Configuration, OpenAIApi } = require("openai");
import Secret from '../../secret'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: { message: string } | null;
  error: { message: string } | null;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { body } = req;
      const { chat } = body;
      if (!chat) {
        //console.log("No chat");
        res.status(422).send({ data: null, error: { message: "Please type in a message!"}});
      }
      //console.log("Chat was", chat);

      const OPENAI_API_KEY = Secret.API_key;
      //console.log("API key acquired:",OPENAI_API_KEY);

      const config = new Configuration({ apiKey: OPENAI_API_KEY});
  
      const openai = new OpenAIApi(config);
  
      (async () => {
        //console.log("Calling OpenAI");
        const response = await openai.createCompletion("text-davinci-001", {
        prompt: chat,
        temperature: 0.9,
        max_tokens: 150,
      });
  
      const message = response.data.choices[0].text;
      console.log("Got your message :)");
  
      if (!message) {
        res.status(500).send({ error: { message: 'Server error' }, data: null});
      }
  
      res.status(200).send({ error: null, data: { message }});
      })();
    } catch(error) {
      res.status(500).send({ error: { message: 'Server error' }, data: null});
    }
    
  } else {
    res.status(404).send({ error: { message: 'Page not found' }, data: null})
  }
}