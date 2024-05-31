
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
const instructionMessage:CreateChatCompletionRequestMessage = {
  role: "system",
  content : "You are a code generator. You must answer only in markdown code snippet. Use code comments for exmplanations."
}

//function
export async function POST(
    req: Request
) {
        try{
        const {userId} = auth();
        const body = await req.json();
        const {messages} = body; 

        if(!userId) {
            return new NextResponse("Unauthorised" , {status:401})
        }
        
        if(!messages){
            return new NextResponse("Messages are required" , {status: 400})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage ,...messages],
          });
          console.log(response.choices[0].message);
        // const completion = await openai.chat.completions.create({
        //     messages: [{"role": "system", "content": "You are a helpful assistant."},
        //         {"role": "user", "content": "Who won the world series in 2020?"},
        //         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        //         {"role": "user", "content": "Where was it played?"}],
        //     model: "gpt-3.5-turbo",
        //   });
        
        //   console.log(completion.choices[0].message.content);
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
              console.error(error.status);  // e.g. 401
              console.error(error.message); // e.g. The authentication token you passed was invalid...
              console.error(error.code);  // e.g. 'invalid_api_key'
              console.error(error.type);  // e.g. 'invalid_request_error'
            } else {
              // Non-API error
              console.log(error);
            }
          }
    }
































































// // pages/api/conversation.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     const { messages } = req.body;

//     try {
//         const response = await axios.post("https://api.openai.com/v1/chat/completions", {
//             model: "gpt-4",
//             messages: messages,
//         }, {
//             headers: {
//                 "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         res.status(200).json(response.data.choices[0].message);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// }




















