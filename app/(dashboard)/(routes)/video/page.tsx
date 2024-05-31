"use client";
import * as z from "zod"
import Heading from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from "react-hook-form";
import { FormSchema } from "./constant";
import { Form, FormControl,FormField, FormItem } from "@/components/ui/form";
import { ReactElement, JSXElementConstructor, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";
import axios from "axios";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { POST } from "@/app/api/code/route";

const VideoPage = ()=>{
    const router = useRouter();
    const[video ,setVideo] = useState<string>()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>)=>{
        try{
        setVideo(undefined);

        const response = await fetch("/api/video" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        if(!response.ok){
            throw new Error("Network response was not ok.")
        }
        const data = await response.json()
        setVideo(data[0]);

        form.reset()
        
        }catch(error:any){
            //TODO: open por model
            console.log(error);
        }finally{
            router.refresh();
        }
    }

    return(
        <div>
           <Heading 
            title="Video Generator"
            description="Generate video from the text."
            icon={VideoIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                   <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        " >
                            <FormField
                                name="prompt" 
                                render={({ field })=>(
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                            className="border-0 outline-none 
                                            focus-visible:ring-0 focus-visible:ring-trasnparent"
                                            disabled={isLoading}
                                            placeholder="A clown fish dancing around the coral reef."
                                            {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                                <Button className="col-span-12 lg:col-span-2 w-full "disabled={isLoading}>
                                    Generate
                                </Button>
                        </form>
                   </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {/* Empty state */}
                    {!video && !isLoading &&(
                        <Empty label="No video generated."/>
                    )}
                    
                    {/* Loading state */}
                    {isLoading &&(
                        <div className="p-8 rounder-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {video && (
                        <video className="h-full aspect-auto rounded-lg border bg-black" controls>
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>

        </div>
    )
}

export default VideoPage;
