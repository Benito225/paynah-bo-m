"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import React, {useEffect, useRef, useState} from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {useRouter} from "next13-progressbar";
import { decodeToken } from "react-jwt";
import {Minus} from "lucide-react";
import {useCookies} from "react-cookie";
import {sendOtp, validateOtp} from "@/core/apis/login";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {REGEXP_ONLY_DIGITS_AND_CHARS} from "input-otp";

interface AuthValidateOtpFormProps {
    lang: Locale
}

const formSchema = z.object({
    otp: z.string().min(6, {
        message: "Votre code doit être de 6 Caractères"
    })
})

export default function AuthValidateOtpForm({ lang }: AuthValidateOtpFormProps) {

    // const { getInputProps } = useInputMask({ mask: '9' });

    const [isLoading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const [countDown, setCountDown] = useState(300);
    const [clickTriggered, setClickTriggered] = useState(false);
    const [alreadyClickTriggered, setAlreadyClickTriggered] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['username', 'username-token']);

    const formRef = useRef<HTMLButtonElement>(null);

    const router = useRouter();

    const formatCountDown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `0${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const validateOtpForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        }
    });

    const otp = validateOtpForm.getValues('otp');

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown > 0) {
                setCountDown(countDown - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        if (otp.length == 6) {
            setClickTriggered(true);
        } else {
            setClickTriggered(false);
            setAlreadyClickTriggered(false);
        }

        if (clickTriggered && !alreadyClickTriggered) {
            formRef.current?.click();
            setAlreadyClickTriggered(true);
        }

        return () => clearInterval(interval);
    }, [countDown, otp, clickTriggered, alreadyClickTriggered]);

    const errorsArray = Object.values(validateOtpForm.formState.errors);
    const username = cookies["username"];

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        setShowConError(false);
        setShowError(false);

        if (!username) {
            return router.push(Routes.auth.sendOtp.replace('{lang}', lang));
        }

        const validateOtpRes = await validateOtp(values, username);

        if (!validateOtpRes.success) {
            setLoading(false);
            setShowConError(true);

            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);

            return toast.error(validateOtpRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setShowConError(false);
            setShowError(false);

            setCookie('username-token', validateOtpRes.data);

            router.push(Routes.auth.resetAccess.replace('{lang}', lang));
        }
    }

    async function reSendOtp() {
        setLoading(true);

        if (!username) {
            return router.push(Routes.auth.sendOtp.replace('{lang}', lang));
        }

        const values = {
            username: username
        };

        const sendOtpRes = await sendOtp(values);
        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });

        if (!sendOtpRes.success) {
            setLoading(false);
            toast.dismiss(toastLoading);

            return toast.error(sendOtpRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });

        } else {
            setLoading(false);
            toast.dismiss(toastLoading);
            setCountDown(300);

            return toast.success("Code envoyé avec succès !", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });
        }
    }

    return (
        <div className={`formContainer mx-auto max-w-lg`}>
            <div className={`text-center mb-16`}>
                {/*<h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Bientôt terminé !</h2>*/}
                {/*<p className={`text-[#626262] text-sm md:text-base`}>Veuillez saisir le code OTP que nous vous avons envoyé par mail</p>*/}
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Bientôt terminé !</h2>
                <p className={`text-[#626262] text-sm md:text-base`}>Saisissez le code à 6 chiffres que nous avons envoyé sur <span className={`font-medium text-black`}>{username}</span> </p>
            </div>
            <div className={`mb-[7rem] md:mb-[10.5rem]`}>
                <div className={`px-1 md:px-10 mb-6`}>
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
                                <p className={`text-xs text-center text-[#e00000]`}>{`Code OTP invalide, réessayez !`}</p>
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
                        <Form {...validateOtpForm}>
                            <form id="formSubmit" onSubmit={validateOtpForm.handleSubmit(onSubmit)} className="space-y-5 flex justify-center">
                                <FormField
                                    control={validateOtpForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} disabled={isLoading} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={0} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={1} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={2} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={3} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={4} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl`} index={5} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <button ref={formRef} className={`hidden`} type={"submit"}>submit</button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className={`font-semibold text-center mb-1.5`}>
                    {formatCountDown(countDown)}
                    {/*<span>02</span>:<span>14</span>*/}
                </div>
                <p className={`text-sm md:text-base text-center font-light`}>{`Vous n'avez rien reçu ?`} <Link onClick={reSendOtp} className={`duration-200 hover:font-semibold font-medium ${isLoading && 'opacity-50 cursor-not-allowed'} `} href="#">Renvoyer le code</Link> </p>
                <div className={`mt-6 text-center`}>
                    <Link href={Routes.auth.sendOtp.replace('{lang}', lang)} className={`text-xs md:text-sm hover:underline underline-offset-1 font-medium duration-300`}>{`< Retour`}</Link>
                </div>
            </div>
        </div>
    );
}