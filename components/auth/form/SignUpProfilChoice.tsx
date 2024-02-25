"use client"

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";


interface SignUpProfileChoiceProps {
    showErrorTwo: boolean,
    errorsArrayTwo: any[],
    stepTwo: any,
    showConErrorTwo: boolean,
    lang: string,
    onSubmitTwo: any,
    handleGoToBack: () => void
}

export default function SignUpProfileChoice({showErrorTwo, errorsArrayTwo, stepTwo, showConErrorTwo, lang, onSubmitTwo, handleGoToBack}: SignUpProfileChoiceProps) {

    async function triggerRadio(inputName: string) {
        stepTwo.setValue('profileType', inputName);
    }

    async function handleCadenaLock() {
        const padlock = document.getElementById('padlock');
        const indicator: HTMLElement | null = document.querySelector('.indicator');

        if (padlock && indicator) {
            padlock.classList.toggle('closed');
            indicator.style.transform = padlock.classList.contains('closed') ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) rotate(45deg)';
        }
    }

    return (
        <div className={`formContainer mx-auto max-w-4xl`}>
            <div className={`text-center mb-10`}>
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
                            <FormField
                                control={stepTwo.control}
                                name="profileType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className={`grid grid-cols-3 gap-6`}
                                            >
                                                <FormItem onClick={() => triggerRadio('individual')} className="flex cursor-pointer items-center justify-center space-x-3 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'individual' ? 'padlock-arc-open' : ''}`}>
                                                        </div>
                                                        <div className={`${field.value == 'individual' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} h-[12rem] flex items-center rounded-[2.5rem] pt-8 pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-3`}>Individuel</h2>
                                                                    <p className={`text-xs font-light`}>Consultants, Experts, Entreprises individuelles, Commerçants, Entrepreneurs, Personnes physiques ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'individual' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem]`}>
                                                                    <RadioGroupItem id={"individual"} value="individual" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                                <FormItem onClick={() => triggerRadio('company')} className="flex cursor-pointer items-center justify-center space-x-3 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'company' ? 'padlock-arc-open' : ''}`}>
                                                        </div>
                                                        <div className={`${field.value == 'company' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} h-[12rem] flex items-center rounded-[2.5rem] pt-8 pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-3`}>Entreprises</h2>
                                                                    <p className={`text-xs font-light`}>Sociétés commerciales (SARL, SA, Sociétés coopératives, SAS, SNC), Startup, Succursales ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'company' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem]`}>
                                                                    <RadioGroupItem id={"company"} value="company" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                                <FormItem onClick={() => triggerRadio('ong')} className="flex cursor-pointer items-center justify-center space-x-3 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'ong' ? 'padlock-arc-open' : ''}`}>
                                                        </div>
                                                        <div className={`${field.value == 'ong' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} h-[12rem] flex items-center rounded-[2.5rem] pt-8 pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-3`}>ONG</h2>
                                                                    <p className={`text-xs font-light`}>Sociétés civiles (Associations, Syndicats), organisations à but non lucratif ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'ong' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem]`}>
                                                                    <RadioGroupItem id={"ong"} value="ong" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div  className={`flex justify-center items-center space-x-5 mt-[5rem]`}>
                                <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-[9rem] h-[2.8rem]`}>
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