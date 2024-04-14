"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";


interface VerifyEmailProps {
    showErrorVerifyEmail: boolean,
    errorsArrayVerifyEmail: any[],
    stepVerifyEmail: any,
    showConErrorVerifyEmail: boolean,
    lang: string,
    onSubmitVerifyEmail: any,
    handleGoToBack: () => void,
    isLoading: boolean
}

export default function VerifyEmail({showErrorVerifyEmail, errorsArrayVerifyEmail, stepVerifyEmail, showConErrorVerifyEmail, lang, onSubmitVerifyEmail, handleGoToBack, isLoading}: VerifyEmailProps) {

    return (
        <div className={`formContainer mx-auto max-w-lg`}>
            <div className={`text-center mb-10`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Entrez votre adresse e-mail</h2>
                <p className={`text-center text-[#626262 text-sm md:text-base]`}>Entrez votre adresse e-mail professionnelle qui sera utilisée pour toutes vos opérations</p>
            </div>
            <div className={`px-4 md:px-6 mb-[0.5rem] md:mb-[0.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
                        {errorsArrayVerifyEmail.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArrayVerifyEmail.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...stepVerifyEmail}>
                        <form onSubmit={stepVerifyEmail.handleSubmit(onSubmitVerifyEmail)} className="">
                            <div className={`grid grid-cols-1 gap-4`}>
                                <div>
                                    <FormField
                                        control={stepVerifyEmail.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light ${stepVerifyEmail.formState.errors.email?.message && "!border-[#e95d5d]"} text-sm ${showConErrorVerifyEmail && "border-[#e95d5d]"}`}
                                                               placeholder="Email" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} disabled={isLoading}/>
                                                    </div>
                                                </FormControl>
                                                {/*<FormMessage className={`text-xs`}/>*/}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className={`mt-[7rem] md:mt-[10rem]`}>
                                <p className={`font-light text-sm md:text-base text-center mb-5 md:mb-5`}>En continuant, vous acceptez notre <Link className={`font-medium underline`} href={`#`}>contrat de confidatialité</Link> applicable au traitement de vos données personnelles.</p>
                                <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5`}>
                                    <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`} disabled={isLoading}>
                                        Retour
                                    </Button>
                                    <Button type={`submit`} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`} disabled={isLoading}>
                                        Continuer
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}