
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY! // This is also the default, can be omitted
});

//function
export async function POST(
    req: Request
){
        try{
        const {userId} = auth();
        const body = await req.json();
        const {prompt} = body; 

        if(!userId) {
            return new NextResponse("Unauthorised" , {status:401})
        }
        
        if(!prompt){
            return new NextResponse("Music is required" , {status: 400})
        }

      
        const response = await replicate.run(
          "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
          {
            input: {
              // alpha: 0.5,
              prompt_a: prompt,
              // prompt_b: "90's rap",
              // denoising: 0.75,
              // seed_image_id: "vibes",
              // num_inference_steps: 50
            }
          }
        );
         return(NextResponse.json(response))
        } catch (error) {
           console.log("[MUSIC_ERROR]" , error);
           return new NextResponse("Internal error" , {status: 500});
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




















