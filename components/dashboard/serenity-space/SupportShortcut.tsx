"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Send} from "lucide-react";

interface SupportShortcutProps {
    lang: Locale
}

export default function SupportShortcut({lang}: SupportShortcutProps) {

    const [isLoading, setLoading] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const formSchema = z.object({
        supportMessage: z.string().min(1, {
            message: 'Le champ est requis'
        }),
    })

    const sendMsgToSupport = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            supportMessage: "",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        setShowConError(true);
    }

    return (
        <div>
            <Form {...sendMsgToSupport}>
                <form onSubmit={sendMsgToSupport.handleSubmit(onSubmit)}>
                    <FormField
                        control={sendMsgToSupport.control}
                        name="supportMessage"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className={`relative`}>
                                        <Input type={`text`} className={`font-light px-3 text-xs min-w-[20rem] h-[2rem] ${showConError && "border-[#e95d5d]"}`}
                                               placeholder="Écrivez votre message" {...field} style={{
                                            backgroundColor: field.value ? '#f4f4f7' : '#f4f4f7',
                                        }} />
                                        <button className={`absolute top-2 right-3`} type={"submit"}>
                                            <Send className={`h-4 w-auto text-[#d3d3d3] `} />
                                        </button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}