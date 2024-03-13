"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Plus, Send} from "lucide-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {NumericFormat} from "react-number-format";

interface OperationShortcutProps {
    lang: Locale
}

export default function OperationShortcut({lang}: OperationShortcutProps) {

    const [isLoading, setLoading] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const [activeSendMode, setActiveSendMode] = useState('direct');

    const formSchema = z.object({
        beneficiary: z.string().min(1, {
            message: 'Le champ est requis'
        }),
        accountNumber: z.string().min(1, {
            message: 'Le champ est requis'
        }),
        bankAmount: z.number(),
        sendMode: z.enum(["direct", "mm", "bank"], {
            required_error: "Vous devez choisir un mode d'envoi",
        }),
    });

    const sendMoney = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiary: "",
            sendMode: "direct",
            accountNumber: "",
            bankAmount: undefined
        }
    });

    async function triggerRadio(inputName: "direct" | "mm" | "bank") {
        sendMoney.setValue('sendMode', inputName);
        setActiveSendMode(inputName);
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        console.log("ok");
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
                                    <form onSubmit={sendMoney.handleSubmit(onSubmit)} className="space-y-3">
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
                                            <div className={`border border-[#e4e4e4] flex items-center rounded-lg px-1 py-1 2xl:py-1`}>
                                                <div className={`flex items-center w-full`}>
                                                    <span className={`text-[10.5px] text-[#84818a] 2xl:text-[12px] font-normal whitespace-nowrap mr-1 2xl:mr-1`}>{`Mode d'envoi`}</span>
                                                    <div className={`w-full`}>
                                                        <FormField
                                                            control={sendMoney.control}
                                                            name="sendMode"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroup
                                                                            onValueChange={field.onChange}
                                                                            defaultValue={field.value}
                                                                            className="flex items-center justify-between gap-0 rounded-lg !bg-[#f0f0f0] p-1 2xl:p-1.5 flex-row"
                                                                        >
                                                                            <FormItem onClick={() => triggerRadio('direct')} className="flex-1 items-center justify-center space-y-0">
                                                                                <button type={"button"} className={`w-full flex items-center justify-center rounded-lg ${field.value == 'direct' ? 'bg-white text-black' : 'text-[#64758b]'} whitespace-nowrap text-[10.5px] 2xl:text-[12px] font-medium px-1 2xl:px-2 py-1.5`}>
                                                                                    <svg className={`w-[.7rem] mr-1`} viewBox="0 0 44.203 44.203">
                                                                                        <defs>
                                                                                            <clipPath id="clip-path2">
                                                                                                <rect width="44.203" height="44.203"/>
                                                                                            </clipPath>
                                                                                        </defs>
                                                                                        <g transform="translate(0 -2)">
                                                                                            <g transform="translate(0 2)" clipPath="url(#clip-path2)">
                                                                                                <path
                                                                                                    d="M22.1,0C5.319,0,0,5.319,0,22.1S5.319,44.2,22.1,44.2s22.1-5.319,22.1-22.1S38.884,0,22.1,0m0,40.746C7.944,40.746,3.458,36.259,3.458,22.1S7.944,3.457,22.1,3.457,40.745,7.944,40.745,22.1,36.259,40.746,22.1,40.746"
                                                                                                    transform="translate(0 0)"/>
                                                                                                <path
                                                                                                    d="M39.814,20.3a8.227,8.227,0,0,0-5.73-2.075h-10.6v22.5h4.06v-7.31a4.455,4.455,0,0,1,0-4.28V22.046h6.268a4.366,4.366,0,0,1,2.959,1.05,3.351,3.351,0,0,1,1.191,2.673A3.267,3.267,0,0,1,36.775,28.4a4.428,4.428,0,0,1-2.961,1.029H30.36a2.15,2.15,0,0,0,.111,3.759h3.5a8.4,8.4,0,0,0,5.808-2.074A6.958,6.958,0,0,0,42.1,25.706a7.006,7.006,0,0,0-2.29-5.408"
                                                                                                    transform="translate(-8.464 -6.567)"/>
                                                                                            </g>
                                                                                        </g>
                                                                                    </svg>
                                                                                    <span>Direct</span>
                                                                                </button>
                                                                            </FormItem>
                                                                            <FormItem onClick={() => triggerRadio('mm')} className="flex-1 items-center justify-center space-y-0">
                                                                                <button type={"button"} className={`w-full flex items-center justify-center rounded-lg ${field.value == 'mm' ? 'bg-white text-black' : 'text-[#64758b]'} whitespace-nowrap text-[10.5px] 2xl:text-[12px] font-medium px-1 2xl:px-2 py-1.5`}>
                                                                                    <span>Mobile Money</span>
                                                                                </button>
                                                                            </FormItem>
                                                                            <FormItem onClick={() => triggerRadio('bank')} className="flex-1 items-center justify-center space-y-0">
                                                                                <button type={"button"} className={`w-full flex items-center justify-center rounded-lg ${field.value == 'bank' ? 'bg-white text-black' : 'text-[#64758b]'} whitespace-nowrap text-[10.5px] 2xl:text-[12px] font-medium pl-1 pr-[2px] 2xl:px-2 py-1.5`}>
                                                                                    <span>Virement</span>
                                                                                </button>
                                                                            </FormItem>
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {activeSendMode == "direct" &&
                                            <div className={`direct-form-inputs space-y-3`}>
                                                <FormField
                                                    control={sendMoney.control}
                                                    name="accountNumber"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div>
                                                                    <div className="relative">
                                                                        <input type="text" id="accountNumber" className={`primary-form-input h-[2.8rem] peer !bg-[#f4f4f7] focus:border focus:border-[#e4e4e4] ${field.value && '!bg-white border border-[#e4e4e4]'} focus:!bg-white`} placeholder=" " {...field} />
                                                                        <label htmlFor="accountNumber"
                                                                               className={`primary-form-label !bg-[#f4f4f7] ${field.value && '!bg-white'} peer-focus:!bg-white peer-focus:px-2 peer-focus:text-[#818181] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-3.5 left-5`}>Numéro de compte
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={sendMoney.control}
                                                    name="bankAmount"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div>
                                                                    <div className="relative">
                                                                        <NumericFormat
                                                                            id="bankAmount" className={`primary-form-input h-[2.8rem] peer !bg-[#f4f4f7] focus:border focus:border-[#e4e4e4] ${field.value && '!bg-white border border-[#e4e4e4]'} focus:!bg-white`} placeholder=" " {...field}
                                                                            thousandSeparator=" " prefix="FCFA " />
                                                                        {/*<input type="text" id="bankAmount" className={`primary-form-input h-[2.8rem] peer !bg-[#f4f4f7] focus:border focus:border-[#e4e4e4] ${field.value && '!bg-white border border-[#e4e4e4]'} focus:!bg-white`} placeholder=" " {...field} />*/}
                                                                        <label htmlFor="bankAmount"
                                                                               className={`primary-form-label !bg-[#f4f4f7] ${field.value && '!bg-white'} peer-focus:!bg-white peer-focus:px-2 peer-focus:text-[#818181] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-3.5 left-5`}>Montant
                                                                        </label>
                                                                        <Button type={`submit`} className={`absolute rounded-lg p-3 top-0 right-0`}>
                                                                            <Send className={`h-[1.1rem] text-[#fff] `} />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        }
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