"use client"

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import React from "react";


interface SignUpProfileChoiceProps {
    showErrorTwo: boolean,
    errorsArrayTwo: any[],
    stepTwo: any,
    showConErrorTwo: boolean,
    lang: string,
    onSubmitTwo: any,
    handleGoToBack: () => void,
    isLoading: boolean,
    setProfilID: (value: (((prevState: number) => number) | number)) => void
}

export default function SignUpProfileChoice({ showErrorTwo, errorsArrayTwo, stepTwo, showConErrorTwo, lang, onSubmitTwo, handleGoToBack, isLoading, setProfilID }: SignUpProfileChoiceProps) {

    async function triggerRadio(inputName: string) {
        stepTwo.setValue('profileType', inputName);
        const pId = inputName == 'individual' ? 1 : (inputName == 'company' ? 2 : 3);
        setProfilID(pId);
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
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>{`De quel type d'activité s'agit-il ?`}</h2>
                <p className={`text-[#626262] w-[90%] lg:w-[70%] mx-auto text-sm md:text-base`}>Cette information nous aidera à adapter notre service à vos besoins et à vous proposer le forfait le mieux adapté.</p>
            </div>
            <div className={`px-4 mb-[0rem] md:mb-[3.5rem]`}>
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
                                                className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6`}
                                            >
                                                <FormItem className="flex flex-col items-center justify-center space-x-0 md:space-x-0 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'individual' ? 'padlock-arc-open' : ''} hidden md:block`}>
                                                        </div>
                                                        <div onClick={() => triggerRadio('individual')} className={`w-full cursor-pointer ${field.value == 'individual' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} md:h-[12rem] flex items-center rounded-3xl md:rounded-[2.5rem] pt-[1rem] md:pt-8 pb-5 md:pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-2 md:mb-3`}>Individuel</h2>
                                                                    <p className={`text-xs font-light`}>Consultants, Experts, Entreprises individuelles, Commerçants, Entrepreneurs, Personnes physiques ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'individual' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem] hidden md:block`}>
                                                                    <RadioGroupItem id={"individual"} value="individual" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`w-full`}>
                                                        <div className={`px-1.5 md:px-3 py-1.5 md:py-3 mt-1 md:mt-4 rounded-xl border border-[#ededed] bg-[#f8f8f8] flex justify-center items-center w-full`}>
                                                            <div className={`inline-flex items-center`}>
                                                                <div className={`font-light tracking-tight leading-3 text-[10px] lg:leading-3 lg:text-xs mr-2 md:mr-1 lg:mr-2`}>
                                                                    Frais de tenue <br/> de compte :
                                                                </div>
                                                                <div className={`inline-flex flex-col mr-1`}>
                                                                    <span className={`font-semibold tracking-tight -mb-[5px] lg:-mb-[4px] text-[1.7rem] lg:text-3xl`}>5 000</span>
                                                                </div>
                                                                <div className={`inline-flex flex-col`}>
                                                                    <span className={`font-semibold tracking-tight text-[10px] lg:text-xs -mb-1`}>FCFA</span>
                                                                    <span className={`font-light tracking-tight text-[10px] lg:text-xs`}>/mois</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                                <FormItem className="flex flex-col items-center justify-center space-x-0 md:space-x-0 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'company' ? 'padlock-arc-open' : ''} hidden md:block`}>
                                                        </div>
                                                        <div onClick={() => triggerRadio('company')} className={`w-full cursor-pointer ${field.value == 'company' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} md:h-[12rem] flex items-center rounded-3xl md:rounded-[2.5rem] pt-[1rem] md:pt-8 pb-5 md:pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-2 md:mb-3`}>Entreprises</h2>
                                                                    <p className={`text-xs font-light`}>Sociétés commerciales (SARL, SA, Sociétés coopératives, SAS, SNC), Startup, Succursales ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'company' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem] hidden md:block`}>
                                                                    <RadioGroupItem id={"company"} value="company" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`w-full`}>
                                                        <div className={`px-1.5 md:px-3 py-1.5 md:py-3 mt-1 md:mt-4 rounded-xl border border-[#ededed] bg-[#f8f8f8] flex justify-center items-center w-full`}>
                                                            <div className={`inline-flex items-center`}>
                                                                <div className={`font-light tracking-tight leading-3 text-[10px] lg:leading-3 lg:text-xs mr-2 md:mr-1 lg:mr-2`}>
                                                                    Frais de tenue <br/> de compte :
                                                                </div>
                                                                <div className={`inline-flex flex-col mr-1`}>
                                                                    <span className={`font-semibold tracking-tight -mb-[5px] lg:-mb-[4px] text-[1.7rem] lg:text-3xl`}>10 000</span>
                                                                </div>
                                                                <div className={`inline-flex flex-col`}>
                                                                    <span className={`font-semibold tracking-tight text-[10px] lg:text-xs -mb-1`}>FCFA</span>
                                                                    <span className={`font-light tracking-tight text-[10px] lg:text-xs`}>/mois</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                                <FormItem className="flex flex-col items-center justify-center space-x-0 md:space-x-0 space-y-0">
                                                    <div className={`relative`}>
                                                        <div className={`padlock-arc ${field.value == 'ong' ? 'padlock-arc-open' : ''} hidden md:block`}>
                                                        </div>
                                                        <div onClick={() => triggerRadio('ong')} className={`w-full cursor-pointer ${field.value == 'ong' ? 'bg-white border border-black' : 'bg-[#f0f0f0]'} md:h-[12rem] flex items-center rounded-3xl md:rounded-[2.5rem] pt-[1rem] md:pt-8 pb-5 md:pb-9 px-4 text-center relative z-[7]`}>
                                                            <div className={`flex flex-col h-full justify-between items-center`}>
                                                                <div>
                                                                    <h2 className={`font-semibold text-lg mb-2 md:mb-3`}>ONG</h2>
                                                                    <p className={`text-xs font-light`}>Sociétés civiles (Associations, Syndicats), organisations à but non lucratif ...</p>
                                                                </div>
                                                                <FormControl className={`${field.value == 'ong' ? "bg-black border-black" : "bg-[#909090] border-[#909090]"} -mb-4 h-[1.15rem] w-[1.15rem] hidden md:block`}>
                                                                    <RadioGroupItem id={"ong"} value="ong" />
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`w-full`}>
                                                        <div className={`px-1.5 md:px-3 py-1.5 md:py-3 mt-1 md:mt-4 rounded-xl border border-[#ededed] bg-[#f8f8f8] flex justify-center items-center w-full`}>
                                                            <div className={`inline-flex items-center`}>
                                                                <div className={`font-light tracking-tight leading-3 text-[10px] lg:leading-3 lg:text-xs mr-2 md:mr-1 lg:mr-2`}>
                                                                    Frais de tenue <br/> de compte :
                                                                </div>
                                                                <div className={`inline-flex flex-col mr-1`}>
                                                                    <span className={`font-semibold tracking-tight -mb-[5px] lg:-mb-[4px] text-[1.7rem] lg:text-3xl`}>7 000</span>
                                                                </div>
                                                                <div className={`inline-flex flex-col`}>
                                                                    <span className={`font-semibold tracking-tight text-[10px] lg:text-xs -mb-1`}>FCFA</span>
                                                                    <span className={`font-light tracking-tight text-[10px] lg:text-xs`}>/mois</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className={`mt-[2.7rem]`}>
                                <div className={`text-center mb-8`}>
                                    <p><Link className={`underline font-medium hover:font-semibold duration-200 text-sm`} href={`#`}>Voir toutes les conditions tarifaires</Link></p>
                                </div>
                                <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5`}>
                                    <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>
                                        Retour
                                    </Button>
                                    <Button type={`submit`} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}>
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