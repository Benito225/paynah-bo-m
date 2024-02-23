"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


interface SignUpProfileChoiceProps {
    showErrorTwo: boolean,
    errorsArrayTwo: any[],
    stepTwo: any,
    showConErrorTwo: boolean,
    lang: string,
    onSubmitTwo: any,
    handleGoToBack: () => void
}

export default function SignUpProfileChoice({showErrorTwo, errorsArrayTwo, stepTwo, showConErrorTwo, lang, onSubmitTwo, handleGoToBack,}: SignUpProfileChoiceProps) {

    return (
        <div className={`formContainer mx-auto max-w-4xl`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-3xl mb-3`}>Sélectionnez votre Profil</h2>
            </div>
            <div className={`px-4 mb-[10.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
                        {errorsArrayTwo.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArrayTwo.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...stepTwo}>
                        <form onSubmit={stepTwo.handleSubmit(onSubmitTwo)} className="">
                            <div className={`grid grid-cols-3 gap-4`}>
                                <div className={`text-center`}>
                                    ffe
                                </div>
                                <div className={`text-center`}>
                                    ffe2
                                </div>
                                <div className={`text-center`}>
                                    ffe3
                                </div>
                            </div>
                            <div  className={`flex justify-center items-center space-x-5 mt-[5rem]`}>
                                <Button onClick={handleGoToBack} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-[9rem] h-[2.8rem]`}>
                                    Retour
                                </Button>
                                <Button type={`submit`} className={`!mb-1 w-[9rem] h-[2.8rem]`}>
                                   Continuer
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}