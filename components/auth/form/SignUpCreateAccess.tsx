"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import AuthResetAccessForm from "@/components/auth/form/ResetAccess";
import React, {useState} from "react";


interface SignUpCreateAccessProps {
    showErrorCreateAccess: boolean,
    errorsArrayCreateAccess: any[],
    stepFour: any,
    showConErrorCreateAccess: boolean,
    lang: string,
    onSubmitStepFour: any,
    handleGoToBack: any
}

export default function SignUpCreateAccess({ showErrorCreateAccess, errorsArrayCreateAccess, stepFour, showConErrorCreateAccess, lang, onSubmitStepFour, handleGoToBack }: SignUpCreateAccessProps) {

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <div className={`formContainer mx-auto max-w-lg`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Création de votre clé {`d'accès`}</h2>
                    {/*<p className={`text-[#626262] text-base`}>{`Veuillez refaire une nouvelle clé pour l'accès à la sérénité financière`}</p>*/}
                </div>
                <div>
                    <div className={`px-0 md:px-16 py-5 mb-[4.5rem] md:mb-[10.5rem]`}>
                        <div className={`flex items-center flex-col space-y-2 mb-4`}>
                            <div className={`${showErrorCreateAccess ? 'animate-rotation-left' : 'animate-rotation-right'}`}>
                                <svg className={`w-5 h-5 ${showErrorCreateAccess && 'fill-[#ff0000]'}`} viewBox="0 0 21.656 27.07">
                                    <path
                                        d="M14.828,16.889a1.354,1.354,0,0,0-1.354,1.354V22.3a1.354,1.354,0,0,0,2.707,0V18.242A1.354,1.354,0,0,0,14.828,16.889ZM21.6,11.475V8.768a6.768,6.768,0,1,0-13.535,0v2.707A4.061,4.061,0,0,0,4,15.535V25.01A4.061,4.061,0,0,0,8.061,29.07H21.6a4.061,4.061,0,0,0,4.061-4.061V15.535A4.061,4.061,0,0,0,21.6,11.475ZM10.768,8.768a4.061,4.061,0,1,1,8.121,0v2.707H10.768ZM22.949,25.01A1.354,1.354,0,0,1,21.6,26.363H8.061A1.354,1.354,0,0,1,6.707,25.01V15.535a1.354,1.354,0,0,1,1.354-1.354H21.6a1.354,1.354,0,0,1,1.354,1.354Z"
                                        transform="translate(-4 -2)"/>
                                </svg>
                            </div>
                            <div>
                                {showConErrorCreateAccess && (
                                    <p className={`text-xs text-[#e00000]`}>{`Le double de la clé d’accès choisi ne correspond pas, réessayez`}</p>
                                )}
                                {errorsArrayCreateAccess.length > 0 && (
                                    <div className={`text-center`}>
                                        <ul className={`text-xs text-[#e00000]`}>
                                            {errorsArrayCreateAccess.map((error, index) => (
                                                <li key={index}>{error.message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <Form {...stepFour}>
                                <form onSubmit={stepFour.handleSubmit(onSubmitStepFour)} className="">
                                    <div className={`grid grid-cols-1 gap-4`}>
                                        <div>
                                            <FormField
                                                control={stepFour.control}
                                                name="password"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className={`relative`}>
                                                                <Input className={`font-light text-sm ${showConErrorCreateAccess && "border-[#e95d5d]"}`} type={showPassword ? 'text' : 'password'}
                                                                       placeholder="Clé d'accès" {...field} style={{
                                                                    backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                }} />
                                                                <svg onClick={handleTogglePassword} className={`h-6 w-6 cursor-pointer ${showPassword ? 'fill-[#414141]' : 'fill-[#c1c1c1]'}  absolute top-4 right-4`} viewBox="0 0 28.065 19.104">
                                                                    <g transform="translate(0.325) rotate(1)">
                                                                        <path d="M0,0H18.622V18.622H0Z" transform="translate(0.539)" fill="none"/>
                                                                        <g transform="matrix(1, -0.017, 0.017, 1, 5.314, 18.08)">
                                                                            <path d="M0,0H0Z" transform="translate(0 -3.249)" fill="none"/>
                                                                            <path d="M12.917,15.748a5.622,5.622,0,1,0,0,3.748h4.076v3.748h3.748V19.5h1.874V15.748ZM7.622,19.5A1.874,1.874,0,1,1,9.5,17.622,1.874,1.874,0,0,1,7.622,19.5Z" transform="translate(-7.063 -26.436)"/>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={stepFour.control}
                                                name="password_confirmation"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div>
                                                                <Input type={`password`} className={`font-light text-sm ${showConErrorCreateAccess && "border-[#e95d5d]"}`}
                                                                       placeholder="Confirmation clé d'accès" {...field} style={{
                                                                    backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                }} />
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {/*<div  className={`flex justify-center items-center space-x-5 mt-[5rem]`}>*/}
                                    {/*    <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-[9rem] h-[2.8rem]`}>*/}
                                    {/*        Retour*/}
                                    {/*    </Button>*/}
                                    {/*    <Button type={`submit`} className={`!mb-1 w-[14rem] h-[2.8rem]`}>*/}
                                    {/*        Demande {`d'inscription`}*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
                                    <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[4rem] md:mt-[5rem]`}>
                                        <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>
                                            Retour
                                        </Button>
                                        <Button type={`submit`} className={`!mb-1 w-full md:w-[10rem] h-[2.8rem]`}>
                                            Valider
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}