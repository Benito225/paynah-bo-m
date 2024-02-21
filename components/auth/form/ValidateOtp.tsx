"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {useRouter} from "next13-progressbar";

interface AuthValidateOtpFormProps {
    lang: Locale
}

const formSchema = z.object({
    c1: z.string().max(1),
    c2: z.string().max(1),
    c3: z.string().max(1),
    c4: z.string().max(1),
    c5: z.string().max(1),
    c6: z.string().max(1),
})

export default function AuthValidateOtpForm({ lang }: AuthValidateOtpFormProps) {

    const [isLoading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const router = useRouter();

    const sendOtpForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            c1: "",
            c2: "",
            c3: "",
            c4: "",
            c5: "",
            c6: "",
        }
    });

    const errorsArray = Object.values(sendOtpForm.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);

        setShowConError(true);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);
        // }
    }

    return (
        <div>
            <div className={`px-16 py-5`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div className={`${showError ? 'animate-rotation-left' : 'animate-rotation-right'}`}>
                        <svg className={`w-5 h-5 ${showError && 'fill-[#ff0000]'}`} viewBox="0 0 21.656 27.07">
                            <path
                                d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                transform="translate(-4 -2)"/>
                        </svg>
                    </div>
                    <div>
                        {showConError && (
                            <p className={`text-xs text-[#e00000]`}>{`Code OTP invalide, réessayez !`}</p>
                        )}
                        {errorsArray.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArray.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...sendOtpForm}>
                        <form onSubmit={sendOtpForm.handleSubmit(onSubmit)} className="space-y-5">
                            <div className={`grid grid-cols-6 gap-4`}>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c1"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c2"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c3"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c4"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c5"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={``}>
                                    <FormField
                                        control={sendOtpForm.control}
                                        name="c6"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                               placeholder="" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}