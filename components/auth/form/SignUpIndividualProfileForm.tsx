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


interface SignUpIndividualProfileFormProps {
    showErrorIndividualProfile: boolean,
    errorsArrayIndividualProfile: any[],
    stepThreeIndividualProfile: any,
    showConErrorIndividualProfile: boolean,
    lang: string,
    onSubmitThreeIndividualProfile: any,
    handleGoToBack: () => void,
    isLoading: boolean,
    legalFormsData: { id: string; name: string; code: string; skaleetId: string; sk_document: any[]; company_type: number }[]
}

export default function SignUpIndividualProfile({ showErrorIndividualProfile, errorsArrayIndividualProfile, stepThreeIndividualProfile, showConErrorIndividualProfile, lang, onSubmitThreeIndividualProfile, handleGoToBack, isLoading, legalFormsData }: SignUpIndividualProfileFormProps) {
    const positions = legalFormsData.map(element => {
        return {
            key: element.id,
            value: element.name + ' (' + element.code + ')'
        };
    });

    const activitySectors = [
        {key: 'Informatique', value: 'Informatique'},
        {key: 'Commercial', value: 'Commercial'},
        {key: 'Gérant', value: 'Gérant'},
    ];

    return (
        <div className={`formContainer mx-auto max-w-2xl`}>
            <div className={`text-center mb-10`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Informations compte individuel</h2>
                <p className={`text-[#626262] w-[90%] lg:w-[80%] mx-auto text-sm md:text-base`}>Assurez-vous que les informations que vous allez renseigner soient les mêmes que celles sur vos pièces justificatives</p>
            </div>
            <div className={`px-4 mb-[0rem] md:mb-[5.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
                        {errorsArrayIndividualProfile.length > 0 && (
                            <div className={`text-center`}>
                                <ul className={`text-xs text-[#e00000]`}>
                                    {errorsArrayIndividualProfile.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Form {...stepThreeIndividualProfile}>
                        <form onSubmit={stepThreeIndividualProfile.handleSubmit(onSubmitThreeIndividualProfile)} className="">
                            <div className={`grid grid-cols-2 gap-2`}>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepThreeIndividualProfile.control}
                                        name="position"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                            <SelectTrigger className={`w-full ${stepThreeIndividualProfile.formState.errors.country?.message && "!border-[#e95d5d]"} px-5 font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`} style={{
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
                                        control={stepThreeIndividualProfile.control}
                                        name="accountName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Nom du compte" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} disabled={isLoading} />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2 md:col-span-1`}>
                                    <FormField
                                        control={stepThreeIndividualProfile.control}
                                        name="activitySector"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                                            <SelectTrigger className={`w-full ${stepThreeIndividualProfile.formState.errors.country?.message && "!border-[#e95d5d]"} px-5 font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`} style={{
                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                            }}>
                                                                <SelectValue  placeholder="Secteur d'activité"/>
                                                            </SelectTrigger>
                                                            <SelectContent className={`bg-[#f0f0f0]`}>
                                                                {activitySectors.map((activitySector, index) =>
                                                                    <SelectItem key={index} className={`font-light px-7 focus:bg-gray-100`} value={activitySector.key}>
                                                                        {activitySector.value}
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
                                        control={stepThreeIndividualProfile.control}
                                        name="lastname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Votre nom" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} disabled={isLoading}/>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepThreeIndividualProfile.control}
                                        name="firstname"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Input type={`text`} className={`font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`}
                                                               placeholder="Votre prénoms" {...field} style={{
                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                        }} disabled={isLoading}/>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2 md:col-span-2`}>
                                    <FormField
                                        control={stepThreeIndividualProfile.control}
                                        name="tel"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <PhoneInput
                                                        {...field}
                                                        className={`font-light ${showConErrorIndividualProfile && "!border-[#e95d5d]"}`}
                                                        style={
                                                            {
                                                                '--react-international-phone-text-color': '#000',
                                                                '--react-international-phone-border-color': showConErrorIndividualProfile ? '#e95d5d' : '#f0f0f0',
                                                                '--react-international-phone-height': '3.3rem',
                                                                '--react-international-phone-font-size': '14px',
                                                                '--react-international-phone-border-radius': '0.75rem',
                                                            }  as React.CSSProperties
                                                        }
                                                        defaultCountry="ci"
                                                        placeholder="Numéro de téléphone"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/*<div className={`col-span-2 md:col-span-1`}>*/}
                                {/*    <FormField*/}
                                {/*        control={stepThreeIndividualProfile.control}*/}
                                {/*        name="email"*/}
                                {/*        render={({field}) => (*/}
                                {/*            <FormItem>*/}
                                {/*                <FormControl>*/}
                                {/*                    <div>*/}
                                {/*                        <Input type={`email`} className={`font-light text-sm ${showConErrorIndividualProfile && "border-[#e95d5d]"}`}*/}
                                {/*                               placeholder="E-mail" {...field} style={{*/}
                                {/*                            backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                                {/*                        }} />*/}
                                {/*                    </div>*/}
                                {/*                </FormControl>*/}
                                {/*            </FormItem>*/}
                                {/*        )}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<FormField*/}
                                {/*    control={stepThreeIndividualProfile.control}*/}
                                {/*    name="companyStatus"*/}
                                {/*    render={({ field }) => (*/}
                                {/*        <FormItem className="col-span-2">*/}
                                {/*            <FormControl>*/}
                                {/*                <RadioGroup*/}
                                {/*                    onValueChange={field.onChange}*/}
                                {/*                    defaultValue={field.value}*/}
                                {/*                    className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-3"*/}
                                {/*                >*/}
                                {/*                    <FormItem className="inline-flex items-start space-x-3 space-y-0">*/}
                                {/*                        <FormControl>*/}
                                {/*                            <RadioGroupItem className={`mt-1`} value="new-company" />*/}
                                {/*                        </FormControl>*/}
                                {/*                        <FormLabel className="text-xs font-normal">*/}
                                {/*                            Entreprise naissante (le client teste ses idées avec des clients et prépare la constitution de sa société)*/}
                                {/*                        </FormLabel>*/}
                                {/*                    </FormItem>*/}
                                {/*                    <FormItem className="inline-flex items-start space-x-3 space-y-0">*/}
                                {/*                        <FormControl>*/}
                                {/*                            <RadioGroupItem className={`mt-1`} value="existing-company" />*/}
                                {/*                        </FormControl>*/}
                                {/*                        <FormLabel className="text-xs font-normal">*/}
                                {/*                            Entreprise existante (le client a déjà créé son entreprise et en a ses documents)*/}
                                {/*                        </FormLabel>*/}
                                {/*                    </FormItem>*/}
                                {/*                </RadioGroup>*/}
                                {/*            </FormControl>*/}
                                {/*        </FormItem>*/}
                                {/*    )}*/}
                                {/*/>*/}
                            </div>
                            <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[4rem] md:mt-[5rem]`}>
                                <Button onClick={handleGoToBack} type={"button"} className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`} disabled={isLoading}>
                                    Retour
                                </Button>
                                <Button type={`submit`} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`} disabled={isLoading}>
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