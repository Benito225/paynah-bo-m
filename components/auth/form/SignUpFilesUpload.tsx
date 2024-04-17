"use client"

import React from "react";
import {Button} from "@/components/ui/button";
import AddMerchantKycProps from "@/components/auth/form/AddMerchantKyc";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {PhoneInput} from "react-international-phone";
import {UseFormRegisterReturn, UseFormReturn} from "react-hook-form";
import {infer, ZodArray, ZodEffects, ZodObject, ZodString, ZodTypeAny} from "zod";
import onSubmit from "@/components/auth/form/AddMerchantKyc";
import {Label} from "@/components/ui/label";


interface SignUpFilesUploadProps {
    lang: string,
    handleGoToBack: () => void,
    handleGoToNext: () => void,
    legalForm: { id: string; name: string; code: string; skaleetId: string; sk_document: any[]; company_type: number },
    isLoading: boolean,
    errorsArray: any[],
    stepOne: any,
    onSubmit: any,
}

export default function SignUpFilesUpload({lang, handleGoToBack, handleGoToNext, legalForm, isLoading, errorsArray, stepOne, onSubmit}: SignUpFilesUploadProps) {

    // console.log(errorsArray);
    // console.log(legalForm);

    return (
        <div className={`formContainer mx-auto max-w-4xl`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Insérez vos pièces justificatives</h2>
                <p className={`text-[#626262] w-full md:w-[60%] md:mx-auto text-sm md:text-base`}>{`Joignez vos pièces d'identité et les documents d'entreprise en suivant l'ordre définie. `}
                </p>
            </div>
            <div className={`px-4 mb-[0.5rem] md:mb-[5.5rem]`}>
                <Form {...stepOne}>
                    <form onSubmit={stepOne.handleSubmit(onSubmit)} className="" encType={`multipart/form-data`}>
                        {legalForm.company_type == 1 &&
                            <div></div>
                        }
                        {legalForm.company_type == 2 &&
                            <div className={`grid grid-cols-2 gap-4`}>
                                <div className={`col-span-2`}>
                                    <Label htmlFor="picture" className={`mb-2 block`}>Déclaration fiscale</Label>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.0.file"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="file" onChange={(event) => {
                                                        field.onChange(event.target?.files?.[0] ?? undefined);
                                                    }} disabled={isLoading} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.0.type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="hidden" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2`}>
                                    <Label htmlFor="picture" className={`mb-2 block`}>{`Justificatif d'identité`}</Label>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.1.file"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="file" onChange={(event) => {
                                                        field.onChange(event.target?.files?.[0] ?? undefined);
                                                    }} disabled={isLoading} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.1.type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="hidden" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={`col-span-2`}>
                                    <Label htmlFor="picture" className={`mb-2 block`}>{`RCCM`}</Label>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.2.file"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="file" onChange={(event) => {
                                                        field.onChange(event.target?.files?.[0] ?? undefined);
                                                    }} disabled={isLoading}/>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.2.type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="hidden" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        }
                        {legalForm.company_type == 3 &&
                            <div></div>
                        }
                        <div className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[3.5rem] md:mt-[5rem]`}>
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
    );
}