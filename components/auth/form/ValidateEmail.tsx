"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import React, {useEffect, useRef, useState} from "react";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {UseFormReturn} from "react-hook-form";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {REGEXP_ONLY_DIGITS_AND_CHARS} from "input-otp";
interface ValidateEmailProps {
    showErrorValidateEmail: boolean,
    errorsArrayValidateEmail: any[],
    stepValidateEmail: any,
    showConErrorValidateEmail: boolean,
    lang: string,
    onSubmitValidateEmail: any,
    handleGoToBack: () => void,
    stepVerifyEmail: any,
    step: number
}

export default function ValidateEmail({showErrorValidateEmail, errorsArrayValidateEmail, stepValidateEmail, showConErrorValidateEmail, lang, onSubmitValidateEmail, handleGoToBack, stepVerifyEmail, step}: ValidateEmailProps) {
    const [countDown, setCountDown] =  useState(300);
    const [clickTriggered, setClickTriggered] = useState(false);
    const [alreadyClickTriggered, setAlreadyClickTriggered] = useState(false);
    const [alreadyStartCount, setAlreadyStartCount] = useState(false);

    const formRef = useRef<HTMLButtonElement>(null);

    const formatCountDown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `0${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const otp = stepValidateEmail.getValues('otp');
    // console.log(otp);

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown > 0) {
                setCountDown(countDown - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);


        if (step == 3) {
            if (!alreadyStartCount) {
                setCountDown(300);
                setAlreadyStartCount(true);
            }
        } else {
            setAlreadyStartCount(false);
        }

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
    }, [countDown, otp]);

    return (
        <div className={`formContainer mx-auto max-w-lg`}>
            <div className={`text-center mb-16`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Confirmez votre adresse e-mail</h2>
                <p className={`text-[#626262] text-sm md:text-base`}>Saisissez le code à 6 chiffres que nous avons envoyé sur <span className={`font-medium text-black`}>{stepVerifyEmail.getValues('email')}</span> </p>
            </div>
            <div className={`mb-[1rem] md:mb-[1rem]`}>
                <div className={`px-1 md:px-10 mb-6`}>
                    <div className={`flex items-center flex-col space-y-2 mb-4`}>
                        <div className={`${showErrorValidateEmail ? 'animate-rotation-left' : 'animate-rotation-right'}`}>
                            <svg className={`w-5 h-5 ${showErrorValidateEmail && 'fill-[#ff0000]'}`} viewBox="0 0 21.656 27.07">
                                <path
                                    d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                    transform="translate(-4 -2)"/>
                            </svg>
                        </div>
                        <div>
                            {showConErrorValidateEmail && (
                                <p className={`text-xs text-[#e00000]`}>{`Code OTP invalide, réessayez !`}</p>
                            )}
                            {errorsArrayValidateEmail.length > 0 && (
                                <div className={`text-center`}>
                                    <ul className={`text-xs text-[#e00000]`}>
                                        {errorsArrayValidateEmail.map((error, index) => (
                                            <li key={index}>{error.message}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <Form {...stepValidateEmail}>
                            <form id="formSubmit" onSubmit={stepValidateEmail.handleSubmit(onSubmitValidateEmail)} className="space-y-5 flex justify-center">
                                <FormField
                                    control={stepValidateEmail.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={0} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={1} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={2} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={3} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={4} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }}/>
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot className={`bg-white border-[#f0f0f0] font-medium !rounded-xl h-[2.9rem] w-[2.9rem] md:h-[3.3rem] md:w-[3.3rem] text-lg text-center md:text-xl ${showConErrorValidateEmail && "border-[#e95d5d]"}`} index={5} style={{
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
                </div>
                <p className={`text-sm w-[80%] mx-auto md:text-base text-center font-light`}>{`Vous n'avez rien reçu ? Vérifiez vos spams ou`} <a className={`duration-200 hover:font-semibold font-medium`} href="#">Renvoyer le code</a> </p>

                <div className={`mt-[7rem] md:mt-[10rem]`}>
                    <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5`}>
                        <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>
                            Retour
                        </Button>
                        <Button type={`button`} onClick={() =>  formRef.current?.click()} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}>
                            Continuer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}