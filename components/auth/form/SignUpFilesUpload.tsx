"use client"

import React, {useCallback, useState} from "react";
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
import Dropzone, {useDropzone} from "react-dropzone";
import {cn} from "@/lib/utils";
import {AudioWaveform, File, FileDown, FileImage, FolderArchive, UploadCloud, Video, X} from "lucide-react";
import axios, {AxiosProgressEvent, CancelTokenSource} from "axios";
import {ScrollArea} from "@/components/ui/scroll-area";
import ProgressBar from "@/components/custom/progress";


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

interface FileUploadProgress {
    progress: number;
    File: File;
    source: CancelTokenSource | null;
}

export default function SignUpFilesUpload({lang, handleGoToBack, handleGoToNext, legalForm, isLoading, errorsArray, stepOne, onSubmit}: SignUpFilesUploadProps) {

    console.log(errorsArray);
    // console.log(legalForm);

    return (
        <div className={`formContainer mx-auto max-w-5xl`}>
            <div className={`text-center mb-28`}>
                <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Insérez vos pièces
                    justificatives</h2>
                <p className={`text-[#626262] w-full md:w-[60%] md:mx-auto text-sm md:text-base`}>{`Joignez vos pièces d'identité et les documents d'entreprise en suivant l'ordre définie. `}
                </p>
            </div>
            <div className={`px-4 mb-[0.5rem] md:mb-[5.5rem]`}>
                <Form {...stepOne}>
                    <form onSubmit={stepOne.handleSubmit(onSubmit)} className="" encType={`multipart/form-data`}>
                        {legalForm.company_type == 1 &&
                            <div className={`grid grid-cols-6 gap-4`}>
                                <div className={`col-span-2`}>
                                </div>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.0.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.0.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[0]?.file && !stepOne.getValues('kycFiles.0.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.0.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>{`Justificatif d'identité`}</h3>
                                                            {stepOne.getValues('kycFiles.0.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.0.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
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
                                </div>
                            </div>
                        }
                        {legalForm.company_type == 2 &&
                            <div className={`grid grid-cols-6 gap-4`}>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.0.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.0.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[0]?.file && !stepOne.getValues('kycFiles.0.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.0.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>Déclaration fiscale</h3>
                                                            {stepOne.getValues('kycFiles.0.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.0.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
                                        )}
                                    />
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>Déclaration fiscale</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.0.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading} />*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
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
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>{`Justificatif d'identité`}</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.1.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading} />*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.1.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.1.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[1]?.file && !stepOne.getValues('kycFiles.1.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.1.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>{`Justificatif d'identité`}</h3>
                                                            {stepOne.getValues('kycFiles.1.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.1.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
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
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>{`RCCM`}</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.2.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading}/>*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.2.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.2.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[2]?.file && !stepOne.getValues('kycFiles.2.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.2.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>RCCM</h3>
                                                            {stepOne.getValues('kycFiles.2.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.2.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
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
                            <div className={`grid grid-cols-6 gap-4`}>
                                <div className={`col-span-2`}>
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.0.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.0.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[0]?.file && !stepOne.getValues('kycFiles.0.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.0.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>Déclaration fiscale</h3>
                                                            {stepOne.getValues('kycFiles.0.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.0.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
                                        )}
                                    />
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>Déclaration fiscale</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.0.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading} />*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
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
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>{`Justificatif d'identité`}</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.1.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading} />*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.1.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.1.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[1]?.file && !stepOne.getValues('kycFiles.1.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.1.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>{`Justificatif d'identité`}</h3>
                                                            {stepOne.getValues('kycFiles.1.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.1.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
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
                                    {/*<Label htmlFor="picture" className={`mb-2 block`}>{`RCCM`}</Label>*/}
                                    {/*<FormField*/}
                                    {/*    control={stepOne.control}*/}
                                    {/*    name="kycFiles.2.file"*/}
                                    {/*    render={({field}) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input type="file" onChange={(event) => {*/}
                                    {/*                    field.onChange(event.target?.files?.[0] ?? undefined);*/}
                                    {/*                }} disabled={isLoading}/>*/}
                                    {/*            </FormControl>*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                    <FormField
                                        control={stepOne.control}
                                        name="kycFiles.2.file"
                                        render={(field) => (
                                            <Dropzone
                                                accept={{
                                                    "image/*": [".jpg", ".jpeg", ".png"],
                                                    "application/pdf": [".pdf"],
                                                }}
                                                onDropAccepted={(acceptedFiles) => {
                                                    acceptedFiles.map((acceptedFile) => {
                                                        return stepOne.setValue('kycFiles.2.file', acceptedFile);
                                                    });
                                                }}
                                                multiple={true}
                                                maxSize={2000000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div  {...getRootProps()} className={`min-h-[15rem] ${stepOne.formState.errors.kycFiles?.[2]?.file && !stepOne.getValues('kycFiles.2.file') ? "border-[#e95d5d] bg-[#FFF8F8]" : ""} flex justify-center items-center rounded-3xl border border-dashed py-4 px-6 ${stepOne.getValues('kycFiles.2.file') ? "border-green-800 bg-green-50" : "border-[#AFAFAF] bg-[#F0F0F0]"}`}>
                                                        <div className={`inline-flex flex-col items-center cursor-pointer`}>
                                                            <FileDown className={`h-10 w-10 text-[#AFAFAF]`} />
                                                            <h3 className={`mt-2 text-sm`}>Décision Ministériel</h3>
                                                            {stepOne.getValues('kycFiles.2.file') ?
                                                                <>
                                                                    <p className={`mt-6 text-xs mb-1 text-center font-medium`}>Fichier ajouté ! Cliquer pour changer le fichier</p>
                                                                    <p className={`font-light text-center text-[#626262] text-xs`}>{stepOne.getValues('kycFiles.2.file').name}</p>
                                                                </> :
                                                                <>
                                                                    <p className={`mt-6 text-xs text-center font-medium`}>Cliquer pour ajouter votre fichier</p>
                                                                    <p className={`font-light text-center text-xs`}>Votre document doit être au format Image ou PDF</p>
                                                                </>
                                                            }
                                                        </div>
                                                        <Input
                                                            {...getInputProps()}
                                                            id="dropzone-file"
                                                            accept="image/png, image/jpeg, application/pdf"
                                                            type="file"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
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
                        <div
                            className={`flex flex-col md:flex-row justify-center items-center space-y-1 md:space-x-5 mt-[3.5rem] md:mt-[5rem]`}>
                            <Button onClick={handleGoToBack} type={"button"}
                                    className={`!mb-1 bg-transparent text-black hover:text-white border border-black w-full md:w-[9rem] h-[2.8rem]`}
                                    disabled={isLoading}>
                                Retour
                            </Button>
                            <Button type={`submit`} className={`!mb-1 w-full md:w-[9rem] h-[2.8rem]`}
                                    disabled={isLoading}>
                                Uploader
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}