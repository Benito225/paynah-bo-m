"use client"

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getCountriesList} from "@/core/apis/signup";
import {useEffect, useState} from "react";
import {fetchData} from "@/lib/api";
import { FlagImage } from "react-international-phone";
import AuthSignUpFormProps from "@/components/auth/form/SignUp";


interface SignUpCountryChoiceProps {
    showError: boolean,
    errorsArray: any[],
    stepOne: any,
    showConError: boolean,
    lang: string,
    onSubmit: any,
    countries: { id: string; name: string; code: string; distributorId: string }[]
}

export default function SignUpCountryChoice({ showError, errorsArray, stepOne, showConError, lang, onSubmit, countries }: SignUpCountryChoiceProps) {

    return (
        <div className={`formContainer mx-auto max-w-lg`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Sélectionnez votre pays</h2>
            </div>
            <div className={`px-4 md:px-16 mb-[8.5rem] md:mb-[10.5rem]`}>
                <div className={`flex items-center flex-col space-y-2 mb-4`}>
                    <div>
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
                    <Form {...stepOne}>
                        <form onSubmit={stepOne.handleSubmit(onSubmit)} className="space-y-5">
                            <div className={`grid grid-cols-6 gap-4 relative`}>
                                <div className={`col-span-5 md:col-span-6`}>
                                    <FormField
                                        control={stepOne.control}
                                        name="country"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        {/*<Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                                                        {/*       placeholder="E-mail" {...field} style={{*/}
                                                        {/*    backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                                                        {/*}} />*/}
                                                        {/*stepOne.formState.errors.country?.message*/}
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className={`w-full ${stepOne.formState.errors.country?.message && "!border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`} style={{
                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                            }}>
                                                                <SelectValue  placeholder="Choisir un pays"/>
                                                            </SelectTrigger>
                                                            <SelectContent className={`bg-[#f0f0f0]`}>
                                                                {countries.map((country, index) =>
                                                                    <SelectItem key={index} className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`} value={country.id}>
                                                                        <div className={`inline-flex items-center space-x-2.5`}>
                                                                            <FlagImage className={`w-7`} iso2={country.code.toLowerCase()} />
                                                                            <span className={`mt-[2px]`}>{country.name}</span>
                                                                        </div>
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

                                <div className={`col-span-1 text-center`}>
                                    <Button type={`submit`} className={`!mb-1 h-[3.3rem] w-[3.3rem] col-span-1 md:absolute md:top-[0] md:right-[-4.2rem]`}>
                                        <svg className={`fill-white h-5 w-6 stroke-white`} viewBox="0 0 35.108 27.574">
                                            <path d="M22.5,5.664a1.413,1.413,0,0,0,0,2l8.889,8.89H4.663a1.413,1.413,0,1,0,0,2.825H31.388L22.5,28.266a1.413,1.413,0,0,0,2,2l11.3-11.3a1.413,1.413,0,0,0,0-2L24.5,5.664A1.413,1.413,0,0,0,22.5,5.664Z" transform="translate(-2.25 -4.104)" strokeWidth="2.5" fillRule="evenodd"/>
                                        </svg>
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