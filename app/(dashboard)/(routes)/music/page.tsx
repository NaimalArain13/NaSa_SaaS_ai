"use client";
import * as z from "zod"
import Heading from "@/components/heading";
import { Music } from "lucide-react";
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

const MusicPage = ()=>{
    const router = useRouter();
    const[music ,setMusic] = useState<string>()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>)=>{
        try{
        setMusic(undefined);

        const response = await fetch("/api/music" , {
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
        setMusic(data.audio);

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
            title="Music Generator"
            description="Generate music from the text."
            icon={Music}
            iconColor="text-emerald-700"
            bgColor="bg-emerald-700/10"
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
                                            placeholder="Paino solo."
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
                    {!music && !isLoading &&(
                        <Empty label="No music generated."/>
                    )}
                    
                    {/* Loading state */}
                    {isLoading &&(
                        <div className="p-8 rounder-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>

        </div>
    )
}

export default MusicPage;
