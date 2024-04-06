"use client"

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import React from "react";


interface SignUpONGProfileFormProps {
    showErrorONGProfile: boolean,
    errorsArrayONGProfile: any[],
    stepThreeONGProfile: any,
    showConErrorONGProfile: boolean,
    lang: string,
    onSubmitThreeONGProfile: any,
    handleGoToBack: () => void
}

export default function SignUpONGProfile({showErrorONGProfile, errorsArrayONGProfile, stepThreeONGProfile, showConErrorONGProfile, lang, onSubmitThreeONGProfile, handleGoToBack}: SignUpONGProfileFormProps) {
    const positions = [
        {key: 'Association', value: 'Association'},
        {key: 'Syndicat', value: 'Syndicat'},
        {key: 'Fédération', value: 'Fédération'},
        {key: 'Institution religieuse', value: 'Institution religieuse'},
        {key: 'Autre', value: 'Autre'},
    ];

    const occupations = [
        {key: 'Président', value: 'Président'},
        {key: 'Secrétaire Général', value: 'Secrétaire Général'},
        {key: 'Trésorier', value: 'Trésorier'},
        {key: 'Développeur', value: 'Développeur'},
        {key: 'Autre', value: 'Autre'},
    ];

    return (
        <div className={`formContainer mx-auto max-w-2xl`}>
            <div className={`text-center mb-10`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Création de compte ONG</h2>
            </div>
            <div className={`px-4 mb-[0rem] md:mb-[5.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
                        {errorsArrayONGProfile.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArrayONGProfile.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...stepThreeONGProfile}>
                        <form onSubmit={stepThreeONGProfile.handleSubmit(onSubmitThreeONGProfile)} className="">
                            <div className={`grid grid-cols-2 gap-2`}>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="position"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className={`w-full ${stepThreeONGProfile.formState.errors.country?.message && "!border-[#e95d5d]"} px-5 font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`} style={{
                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                            }}>
                                                                <SelectValue  placeholder="Vous êtes"/>
                                                            </SelectTrigger>
                                                            <SelectContent className={`bg-[#f0f0f0]`}>
                                                                {positions.map((position, index) =>
                                                                    <SelectItem key={index} className={`font-light px-7 focus:bg-gray-100`} value={position.key}>
                                                                        {position.value}
                                                                    </SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2 md:col-span-1`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="denomination"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Dénomination" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2 md:col-span-1`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="occupation"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className={`w-full ${stepThreeONGProfile.formState.errors.country?.message && "!border-[#e95d5d]"} px-5 font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`} style={{
                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                            }}>
                                                                <SelectValue  placeholder="Votre fonction"/>
                                                            </SelectTrigger>
                                                            <SelectContent className={`bg-[#f0f0f0]`}>
                                                                {occupations.map((accupation, index) =>
                                                                    <SelectItem key={index} className={`font-light px-7 focus:bg-gray-100`} value={accupation.key}>
                                                                        {accupation.value}
                                                                    </SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="lastname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Votre nom" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="firstname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Votre prénoms" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2 md:col-span-2`}>
                                    <FormField
                                        control={stepThreeONGProfile.control}
                                        name="tel"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PhoneInput
                                                        {...field}
                                                        className={`font-light ${showConErrorONGProfile && "!border-[#e95d5d]"}`}
                                                        style={
                                                            {
                                                                '--react-international-phone-text-color': '#000',
                                                                '--react-international-phone-border-color': '#f0f0f0',
                                                                '--react-international-phone-height': '3.3rem',
                                                                '--react-international-phone-font-size': '14px',
                                                                '--react-international-phone-border-radius': '0.75rem',
                                                            }  as React.CSSProperties
                                                        }
                                                        defaultCountry="ci"
                                                        placeholder="Numéro de téléphone"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/*<div className={`col-span-2 md:col-span-1`}>*/}
                                {/*    <FormField*/}
                                {/*        control={stepThreeONGProfile.control}*/}
                                {/*        name="email"*/}
                                {/*        render={({field}) => (*/}
                                {/*            <FormItem>*/}
                                {/*                <FormControl>*/}
                                {/*                    <div>*/}
                                {/*                        <Input type={`email`} className={`font-light text-sm ${showConErrorONGProfile && "border-[#e95d5d]"}`}*/}
                                {/*                               placeholder="E-mail" {...field} style={{*/}
                                {/*                            backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                                {/*                        }} />*/}
                                {/*                    </div>*/}
                                {/*                </FormControl>*/}
                                {/*            </FormItem>*/}
                                {/*        )}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                            <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[3.5rem] md:mt-[5rem]`}>
                                <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}>
                                    Retour
                                </Button>
                                <Button type={`submit`} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}>
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