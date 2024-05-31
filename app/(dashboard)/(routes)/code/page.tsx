// "use client";
// import * as z from "zod"
// import Heading from "@/components/heading";
// import { Code} from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from "react-hook-form";
// import { Form, FormControl,FormField, FormItem } from "@/components/ui/form";
// import { ReactElement, JSXElementConstructor, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// // import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";
// import axios from "axios";
// import { Empty } from "@/components/empty";
// import { Loader } from "@/components/loader";
// import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
// import { cn } from "@/lib/utils";
// import { UserAvatar } from "@/components/user-avatar";
// import { BotAvatar } from "@/components/bot-avatar";
// import ReactMarkdown from "react-markdown";
// import { FormSchema } from "./constants";

// const CodePage = ()=>{
//     const router = useRouter();
//     const[messages ,setMessages] = useState<CreateChatCompletionRequestMessage[]>([])
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             prompt: ""
//         }
//     });

//     const isLoading = form.formState.isSubmitting;
//     const onSubmit = async (values: z.infer<typeof FormSchema>)=>{
//         try{
//         const userMessages:CreateChatCompletionRequestMessage = {
//             role:"user",
//             content: values.prompt,
//         }
//         const newMessages = [...messages , userMessages];
//         const reponse = await axios.post("/api/code" , {
//             messages: newMessages
//         });
//         setMessages((current)=>[...current , userMessages , reponse.data]);

//         form.reset();
//         }catch(error:any){
//             //TODO: open por model
//             console.log(error);
//         }finally{
//             router.refresh();
//         }
//     }

//     return(
//         <div>
//            <Heading 
//             title="Code Generation"
//             description="Generate code using descriptive text."
//             icon={Code}
//             iconColor="text-green-700"
//             bgColor="bg-green-700/10"
//             />
//             <div className="px-4 lg:px-8">
//                 <div>
//                    <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}
//                         className="
//                         rounded-lg
//                         border
//                         w-full
//                         p-4
//                         px-3
//                         md:px-6
//                         focus-within:shadow-sm
//                         grid
//                         grid-cols-12
//                         gap-2
//                         " >
//                             <FormField
//                                 name="prompt" 
//                                 render={({ field })=>(
//                                     <FormItem className="col-span-12 lg:col-span-10">
//                                         <FormControl className="m-0 p-0">
//                                             <Input
//                                             className="border-0 outline-none 
//                                             focus-visible:ring-0 focus-visible:ring-trasnparent"
//                                             disabled={isLoading}
//                                             placeholder="Simple toggle button using react hook."
//                                             {...field}/>
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                                 />
//                                 <Button className="col-span-12 lg:col-span-2 w-full "disabled={isLoading}>
//                                     Generate
//                                 </Button>
//                         </form>
//                    </Form>
//                 </div>
//                 <div className="space-y-4 mt-4">
//                     {/* Empty state */}
//                     {messages.length === 0 && !isLoading &&(
//                         <Empty label="No conversation started."/>
//                     )}
                    
//                     {/* Loading state */}
//                     {isLoading &&(
//                         <div className="p-8 rounder-lg w-full flex items-center justify-center bg-muted">
//                             <Loader />
//                         </div>
//                     )}
//                     <div
//                     className="flex flex-col-reverse gap-y-4">
//                         {messages.map((message)=>(
//                             <div 
//                               key={message.content}
//                               className={cn(
//                               "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                             message.content === "user" ? "bg-white border border-black/10" : "bg-muted")}
//                               >
//                                 {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
//                                 <ReactMarkdown 
//                                 components={{
//                                     pre: ({ node, ...props})=>(
//                                         <div className="overflow-auto w-full my-2 
//                                         bg-black-20/10 p-2 rounded-lg">
//                                             <pre {...props} />

//                                         </div>
//                                     ),
//                                     code: ({node, ...props})=>(
//                                         <code className="bg-black/10 rounded-lg p-1" {...props}/>
//                                     )
//                                 }}
//                                 className="text-sm overflow-hidden leading-7"
//                                 >
//                                     {message.content || ""}
//                                 </ReactMarkdown>
//                             </div>
//                         ))}
//                     </div> 
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default CodePage;
