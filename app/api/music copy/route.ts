
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

        const input = {
          fps: 24,
          width: 1024,
          height: 576,
          prompt,
          guidance_scale: 17.5,
          negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
      };
      
      const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
      console.log(response)
      //=> "https://replicate.delivery/mgxm/873a1cc7-0427-4e8d-ab3c-...

         return(NextResponse.json(response))
        } catch (error) {
           console.log("[VIDEO_ERROR]" , error);
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




















