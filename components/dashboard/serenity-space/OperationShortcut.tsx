"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Plus, Send} from "lucide-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface OperationShortcutProps {
    lang: Locale
}

export default function OperationShortcut({lang}: OperationShortcutProps) {

    const [isLoading, setLoading] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const formSchema = z.object({
        beneficiary: z.string().min(1, {
            message: 'Le champ est requis'
        }),
    })

    const sendMoney = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiary: "",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setLoading(true);

        setShowConError(true);
    }

    return (
        <div className={`operation-shortcut flex-grow`}>
            <div className={`bg-white rounded-2xl px-3 py-5 h-full`}>
                <h2 className={`font-medium text-base`}>Opérations rapides</h2>
                <div className={`mt-2`}>
                    <Tabs defaultValue="send" className="w-full rounded-2xl">
                        <TabsList className={`rounded-xl flex !bg-[#f0f0f0]`}>
                            <TabsTrigger className={`rounded-lg flex-1 px-1 2xl:px-2 text-[10.5px] 2xl:text-[12px]`} value="send">{`Envoi d'argent`}</TabsTrigger>
                            <TabsTrigger className={`rounded-lg flex-1 px-1 2xl:px-2 text-[10.5px] 2xl:text-[12px]`} value="link">{`Lien de paiement`}</TabsTrigger>
                            <TabsTrigger className={`rounded-lg flex-1 px-1 2xl:px-2 text-[10.5px] 2xl:text-[12px]`} value="topup">{`Rechargement`}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="send">
                            <div className={`mt-5`}>
                                <div className={`beneficiary-fav mb-5`}>
                                    <h3 className={`text-xs font-light text-gray-400`}>Bénéficiaires favoris</h3>
                                    <div className={`inline-flex space-x-1 mt-2`}>
                                        <Avatar className={`cursor-pointer`}>
                                            <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                        </Avatar>
                                        <Avatar className={`cursor-pointer`}>
                                            <AvatarFallback className={`bg-[#aedaff] text-[#31a1ff]`}>DB</AvatarFallback>
                                        </Avatar>
                                        <Avatar className={`cursor-pointer`}>
                                            <AvatarFallback className={`bg-[#e0aeff] text-[#bc51ff]`}>JK</AvatarFallback>
                                        </Avatar>
                                        <Avatar className={`cursor-pointer`}>
                                            <AvatarFallback className={`bg-[#aeffba] text-[#02b71a]`}>RA</AvatarFallback>
                                        </Avatar>
                                        <Avatar className={`cursor-pointer`}>
                                            <AvatarFallback className={`bg-[#ffadae] text-[#e03c3e]`}>YA</AvatarFallback>
                                        </Avatar>
                                        <button>
                                            <Avatar className={`cursor-pointer border border-[#cdcdcd] border-dashed`}>
                                                <AvatarFallback className={`bg-transparent text-[#cdcdcd]`}>
                                                    <Plus className={`h-4`} />
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </div>
                                </div>
                                <Form {...sendMoney}>
                                    <form onSubmit={sendMoney.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={sendMoney.control}
                                            name="beneficiary"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <div className="relative">
                                                                <input type="text" id="beneficiary" className={`primary-form-input h-[2.8rem] peer !bg-[#f4f4f7] focus:border focus:border-[#e4e4e4] ${field.value && '!bg-white border border-[#e4e4e4]'} focus:!bg-white`} placeholder=" " {...field} />
                                                                <label htmlFor="beneficiary"
                                                                       className={`primary-form-label !bg-[#f4f4f7] ${field.value && '!bg-white'} peer-focus:!bg-white peer-focus:px-2 peer-focus:text-[#818181] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-3.5 left-5`}>Nom du bénéficiaire
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <div className={`border border-[#e4e4e4] rounded-lg px-2 py-2`}>
                                                <div className={`inline-flex items-center`}>
                                                    <span className={`text-xs font-light`}>{`Mode d'envoi`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </TabsContent>
                        <TabsContent value="link">Change your password here.</TabsContent>
                        <TabsContent value="topup">Change your password 3.</TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}