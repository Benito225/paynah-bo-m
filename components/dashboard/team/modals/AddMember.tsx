"use client"

import {IUser} from "@/core/interfaces/user";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {PlusCircle, X} from "lucide-react";
import * as React from "react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IOperator} from "@/core/interfaces/operator";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {z} from "zod";

interface AddMemberProps {
    lang: string,
    merchant: IUser,
    children: React.ReactNode
}

export default function AddMember({lang, merchant, children}: AddMemberProps) {
    const [step, setStep] = useState(1);
    const [percentage, setPercentage] = useState('w-1/4');

    const formSchema = z.object({
        lastName: z.string().min(2, { message: "Le nom doit contenir au moins deux lettres" }),
        firstName: z.string().min(2, { message: "Le prénoms doit contenir au moins deux lettres" }),
        email: z.string().email({message: "votre email doit avoir un format valide"}),
        number: z.string(),
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className={`sm:max-w-[42rem] xl:max-w-[46rem] 2xl:max-w-[49rem] overflow-y-hidden overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                <div>
                    <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                        <div className={`flex justify-between items-center space-x-3`}>
                            <h2 className={`text-base text-[#626262] font-medium`}>{`Ajouter un membre`}</h2>
                            <DialogClose onClick={() => {
                            }}>
                                <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`}/>
                            </DialogClose>
                        </div>
                    </div>
                    <div className={`h-1 bg-[#cfcfcf]`}>
                        <div className={`h-full ${percentage} duration-200 bg-black`}></div>
                    </div>
                </div>
                <div className={`min-h-[6rem] pt-2 pb-4 px-8`}>
                    {/*<Form {...beneficiaryForm}>*/}
                    {/*    <form onSubmit={undefined} className={`${step == 2 && 'hidden'} space-y-5 gap-6`}>*/}
                    {/*        <div className={`flex items-center gap-5`}>*/}
                    {/*            <div className={'w-1/3'}>*/}
                    {/*                <FormField*/}
                    {/*                    control={beneficiaryForm.control}*/}
                    {/*                    name="lastName"*/}
                    {/*                    render={({field}) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <div className={`inline-flex space-x-3`}>*/}
                    {/*                                <h3 className={`text-sm font-medium`}>Nom</h3>*/}
                    {/*                            </div>*/}
                    {/*                            <FormControl className={''}>*/}
                    {/*                                <div>*/}
                    {/*                                    <Input type={`text`}*/}
                    {/*                                           className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                           placeholder="Entrez votre nom" {...field} style={{*/}
                    {/*                                        backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                    }}/>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage*/}
                    {/*                                className={`text-xs`}>{errors.lastName && errors.lastName.message as string}</FormMessage>*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={'w-2/3'}>*/}
                    {/*                <FormField*/}
                    {/*                    control={beneficiaryForm.control}*/}
                    {/*                    name="firstName"*/}
                    {/*                    render={({field}) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <div className={`inline-flex space-x-3`}>*/}
                    {/*                                <h3 className={`text-sm font-medium`}>Prénoms</h3>*/}
                    {/*                            </div>*/}
                    {/*                            <FormControl className={''}>*/}
                    {/*                                <div>*/}
                    {/*                                    <Input type={`text`}*/}
                    {/*                                           className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                           placeholder="Entrez votre prénoms" {...field} style={{*/}
                    {/*                                        backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                    }}/>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage*/}
                    {/*                                className={`text-xs`}>{errors.firstName && errors.firstName.message as string}</FormMessage>*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={`gap-5`}>*/}
                    {/*            <div className={''}>*/}
                    {/*                <FormField*/}
                    {/*                    control={beneficiaryForm.control}*/}
                    {/*                    name="email"*/}
                    {/*                    render={({field}) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <div className={`inline-flex space-x-3`}>*/}
                    {/*                                <h3 className={`text-sm font-medium`}>Email</h3>*/}
                    {/*                            </div>*/}
                    {/*                            <FormControl className={''}>*/}
                    {/*                                <div>*/}
                    {/*                                    <Input type={`text`}*/}
                    {/*                                           className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                           placeholder="Entrez votre email" {...field} style={{*/}
                    {/*                                        backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                    }}/>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage*/}
                    {/*                                className={`text-xs`}>{errors.email && errors.email.message as string}</FormMessage>*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div*/}
                    {/*            className={`justify-start grid grid-cols-3 gap-5 ${beneficiaries.length > 0 && `h-[90px]`} overflow-y-auto`}>*/}
                    {/*            {*/}
                    {/*                beneficiaries && beneficiaries.map((beneficiary: IBeneficiarySchema, index: number) => (*/}
                    {/*                    <div key={index}*/}
                    {/*                         className={`snap-end shrink-0 w-[30] 2xl:w-[24] bg-white flex flex-col justify-between space-y-8 2xl:space-y-8 p-4 rounded-3xl`}>*/}
                    {/*                        <div className={`flex justify-between items-start`}>*/}
                    {/*                            <div>*/}
                    {/*                                <div className={`inline-flex flex-col`}>*/}
                    {/*                                    <span*/}
                    {/*                                        className={`text-[12px] font-light text-[#626262]`}>{displayAccountTypeLabel(beneficiary.type)}</span>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                            <DropdownMenu>*/}
                    {/*                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>*/}
                    {/*                                    <button className={`text-[#626262]`}*/}
                    {/*                                            onClick={() => deleteBeneficiaryItem(index)}>*/}
                    {/*                                        <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`}/>*/}
                    {/*                                    </button>*/}
                    {/*                                </DropdownMenuTrigger>*/}
                    {/*                            </DropdownMenu>*/}
                    {/*                        </div>*/}
                    {/*                        <div className={`inline-flex flex-col`}>*/}
                    {/*                            {*/}
                    {/*                                beneficiary.type == 'BANK' &&*/}
                    {/*                                <>*/}
                    {/*                                    <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Numéro*/}
                    {/*                                        Compte bancaire</h3>*/}
                    {/*                                    <span*/}
                    {/*                                        className={`text-base font-semibold`}>{beneficiary.bankAccount}</span>*/}
                    {/*                                </>*/}
                    {/*                            }*/}
                    {/*                            {*/}
                    {/*                                beneficiary.type == 'PAYNAH' &&*/}
                    {/*                                <>*/}
                    {/*                                    <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Numéro*/}
                    {/*                                        Compte Paynah</h3>*/}
                    {/*                                    <span*/}
                    {/*                                        className={`text-base font-semibold`}>{beneficiary.paynahAccountNumber}</span>*/}
                    {/*                                </>*/}
                    {/*                            }*/}
                    {/*                            {*/}
                    {/*                                beneficiary.type == 'MOBILE' &&*/}
                    {/*                                <>*/}
                    {/*                                    <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Opérateur*/}
                    {/*                                        Mobile</h3>*/}
                    {/*                                    <span*/}
                    {/*                                        className={`text-base font-semibold`}>{beneficiary.operator}</span>*/}
                    {/*                                    <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Numéro de*/}
                    {/*                                        téléphone</h3>*/}
                    {/*                                    <span*/}
                    {/*                                        className={`text-base font-semibold`}>{beneficiary.number}</span>*/}
                    {/*                                </>*/}
                    {/*                            }*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                ))*/}
                    {/*            }*/}
                    {/*        </div>*/}
                    {/*        <div className={`gap-5`}>*/}
                    {/*            <div className={''}>*/}
                    {/*                <FormField*/}
                    {/*                    control={beneficiaryForm.control}*/}
                    {/*                    name="type"*/}
                    {/*                    render={({field}) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <div className={`inline-flex space-x-3`}>*/}
                    {/*                                <h3 className={`text-sm font-medium`}>Type de compte</h3>*/}
                    {/*                            </div>*/}
                    {/*                            <FormControl>*/}
                    {/*                                <div>*/}
                    {/*                                    <Select onValueChange={(value) => {*/}
                    {/*                                        field.onChange(value);*/}
                    {/*                                        handleChangeAccountType(value);*/}
                    {/*                                    }} defaultValue={field.value}>*/}
                    {/*                                        <SelectTrigger*/}
                    {/*                                            className={`w-full ${showConError && "!border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                            style={{*/}
                    {/*                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                            }}>*/}
                    {/*                                            <SelectValue placeholder="Choisir un type de compte"/>*/}
                    {/*                                        </SelectTrigger>*/}
                    {/*                                        <SelectContent className={`z-[999] bg-[#f0f0f0]`}>*/}
                    {/*                                            <SelectItem*/}
                    {/*                                                className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`}*/}
                    {/*                                                value="MOBILE">*/}
                    {/*                                                <div*/}
                    {/*                                                    className={`inline-flex items-center space-x-2.5`}>*/}
                    {/*                                                    <span className={`mt-[2px]`}>Mobile Money</span>*/}
                    {/*                                                </div>*/}
                    {/*                                            </SelectItem>*/}
                    {/*                                            <SelectItem*/}
                    {/*                                                className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`}*/}
                    {/*                                                value="BANK">*/}
                    {/*                                                <div*/}
                    {/*                                                    className={`inline-flex items-center space-x-2.5`}>*/}
                    {/*                                                    <span*/}
                    {/*                                                        className={`mt-[2px]`}>Compte Bancaire</span>*/}
                    {/*                                                </div>*/}
                    {/*                                            </SelectItem>*/}
                    {/*                                            <SelectItem*/}
                    {/*                                                className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`}*/}
                    {/*                                                value="PAYNAH">*/}
                    {/*                                                <div*/}
                    {/*                                                    className={`inline-flex items-center space-x-2.5`}>*/}
                    {/*                                                    <span*/}
                    {/*                                                        className={`mt-[2px]`}>Compte Paynah</span>*/}
                    {/*                                                </div>*/}
                    {/*                                            </SelectItem>*/}
                    {/*                                        </SelectContent>*/}
                    {/*                                    </Select>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage*/}
                    {/*                                className={`text-xs`}>{errors.type && errors.type.message as string}</FormMessage>*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        {*/}
                    {/*            accountType == "MOBILE" &&*/}
                    {/*            <div className={`flex items-center gap-5`}>*/}
                    {/*                <div className={'w-1/2'}>*/}
                    {/*                    <FormField*/}
                    {/*                        control={beneficiaryForm.control}*/}
                    {/*                        name="operator"*/}
                    {/*                        render={({field}) => (*/}
                    {/*                            <FormItem>*/}
                    {/*                                <div className={`inline-flex space-x-3`}>*/}
                    {/*                                    <h3 className={`text-sm font-medium`}>Opérateur Mobile*/}
                    {/*                                        Money</h3>*/}
                    {/*                                </div>*/}
                    {/*                                <FormControl>*/}
                    {/*                                    <div>*/}
                    {/*                                        <Select onValueChange={field.onChange}*/}
                    {/*                                                defaultValue={field.value}>*/}
                    {/*                                            <SelectTrigger*/}
                    {/*                                                className={`w-full ${showConError && "border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                                style={{*/}
                    {/*                                                    backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                                }}>*/}
                    {/*                                                <SelectValue placeholder="Choisir un opérateur"/>*/}
                    {/*                                            </SelectTrigger>*/}
                    {/*                                            <SelectContent className={`z-[999] bg-[#f0f0f0]`}>*/}
                    {/*                                                {*/}
                    {/*                                                    operators && operators.map((operator: IOperator) => (*/}
                    {/*                                                        <SelectItem key={operator.id}*/}
                    {/*                                                                    className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`}*/}
                    {/*                                                                    value={String(operator.code)}>*/}
                    {/*                                                            <div*/}
                    {/*                                                                className={`inline-flex items-center space-x-2.5`}>*/}
                    {/*                                                                <Image*/}
                    {/*                                                                    className={`h-[1.6rem] w-[1.6rem]`}*/}
                    {/*                                                                    src={operator.logoUrl}*/}
                    {/*                                                                    alt={operator.code} height={512}*/}
                    {/*                                                                    width={512}/>*/}
                    {/*                                                                <span*/}
                    {/*                                                                    className={`mm-label`}>{operator.name}</span>*/}
                    {/*                                                            </div>*/}
                    {/*                                                        </SelectItem>*/}
                    {/*                                                    ))*/}
                    {/*                                                }*/}
                    {/*                                            </SelectContent>*/}
                    {/*                                        </Select>*/}
                    {/*                                    </div>*/}
                    {/*                                </FormControl>*/}
                    {/*                                <FormMessage*/}
                    {/*                                    className={`text-xs`}>{errors.operator && errors.operator.message as string}</FormMessage>*/}
                    {/*                            </FormItem>*/}
                    {/*                        )}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className={'w-1/2'}>*/}
                    {/*                    <FormField*/}
                    {/*                        control={beneficiaryForm.control}*/}
                    {/*                        name="number"*/}
                    {/*                        render={({field}) => (*/}
                    {/*                            <FormItem>*/}
                    {/*                                <div className={`inline-flex space-x-3`}>*/}
                    {/*                                    <h3 className={`text-sm font-medium`}>Numéro de téléphone</h3>*/}
                    {/*                                </div>*/}
                    {/*                                <FormControl className={''}>*/}
                    {/*                                    <div>*/}
                    {/*                                        <Input type={`text`}*/}
                    {/*                                               className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                               placeholder="Entrez votre numéro de téléphone" {...field}*/}
                    {/*                                               style={{*/}
                    {/*                                                   backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                               }}/>*/}
                    {/*                                    </div>*/}
                    {/*                                </FormControl>*/}
                    {/*                                <FormMessage*/}
                    {/*                                    className={`text-xs`}>{errors.number && errors.number.message as string}</FormMessage>*/}
                    {/*                            </FormItem>*/}
                    {/*                        )}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        {*/}
                    {/*            accountType == "BANK" &&*/}
                    {/*            <div className={`gap-5`}>*/}
                    {/*                <div className={''}>*/}
                    {/*                    <FormField*/}
                    {/*                        control={beneficiaryForm.control}*/}
                    {/*                        name="bankAccount"*/}
                    {/*                        render={({field}) => (*/}
                    {/*                            <FormItem>*/}
                    {/*                                <div className={`inline-flex space-x-3`}>*/}
                    {/*                                    <h3 className={`text-sm font-medium`}>Numéro de compte*/}
                    {/*                                        bancaire</h3>*/}
                    {/*                                </div>*/}
                    {/*                                <FormControl className={''}>*/}
                    {/*                                    <div>*/}
                    {/*                                        <Input type={`text`}*/}
                    {/*                                               className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                               placeholder="Entrez votre numéro de compte bancaire" {...field}*/}
                    {/*                                               style={{*/}
                    {/*                                                   backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                               }}/>*/}
                    {/*                                    </div>*/}
                    {/*                                </FormControl>*/}
                    {/*                                <FormMessage*/}
                    {/*                                    className={`text-xs`}>{errors.bankAccount && errors.bankAccount.message as string}</FormMessage>*/}
                    {/*                            </FormItem>*/}
                    {/*                        )}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        {*/}
                    {/*            accountType == "PAYNAH" &&*/}
                    {/*            <div className={`gap-5`}>*/}
                    {/*                <div className={''}>*/}
                    {/*                    <FormField*/}
                    {/*                        control={beneficiaryForm.control}*/}
                    {/*                        name="paynahAccountNumber"*/}
                    {/*                        render={({field}) => (*/}
                    {/*                            <FormItem>*/}
                    {/*                                <div className={`inline-flex space-x-3`}>*/}
                    {/*                                    <h3 className={`text-sm font-medium`}>Numéro de compte*/}
                    {/*                                        Paynah</h3>*/}
                    {/*                                </div>*/}
                    {/*                                <FormControl className={''}>*/}
                    {/*                                    <div>*/}
                    {/*                                        <Input type={`text`}*/}
                    {/*                                               className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}*/}
                    {/*                                               placeholder="Entrez votre numéro de compte Paynah" {...field}*/}
                    {/*                                               style={{*/}
                    {/*                                                   backgroundColor: field.value ? '#fff' : '#f0f0f0',*/}
                    {/*                                               }}/>*/}
                    {/*                                    </div>*/}
                    {/*                                </FormControl>*/}
                    {/*                                <FormMessage*/}
                    {/*                                    className={`text-xs`}>{errors.paynahAccountNumber && errors.paynahAccountNumber.message as string}</FormMessage>*/}
                    {/*                            </FormItem>*/}
                    {/*                        )}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        <div className={`flex items-center gap-6 mt-8 max-h-[90px]`}>*/}
                    {/*            <Button className={`px-6 items-center text-xs`}*/}
                    {/*                    onClick={handleSubmit((data) => addBeneficiaryItems(data))}>*/}
                    {/*                <PlusCircle className={`h-4 w-4 mr-2`}/>*/}
                    {/*                <span>Ajouter un compte</span>*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*    <div className={`${step == 2 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>*/}
                    {/*        <div className={`w-[70%] mx-auto`}>*/}
                    {/*            <div className={`flex flex-col items-center`}>*/}
                    {/*                            <span className="relative flex w-40 h-40">*/}
                    {/*                              <span*/}
                    {/*                                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>*/}
                    {/*                              <span*/}
                    {/*                                  className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>*/}
                    {/*                            </span>*/}
                    {/*                <p className={`text-base mt-10`}>{`Votre bénéficiaire a été ajouté avec succès.`}</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className={`flex justify-center items-center mb-3`}>*/}
                    {/*        <Button onClick={() => {*/}
                    {/*            resetCreateBeneficiaryValues();*/}
                    {/*            prevStep();*/}
                    {/*        }}*/}
                    {/*                className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${step == 1 || step == 4 || confirmStep != 0 ? 'hidden' : 'block'}`}>*/}
                    {/*            Retour*/}
                    {/*        </Button>*/}
                    {/*        <Button onClick={() => createBeneficiary()}*/}
                    {/*                className={`mt-5 w-40 text-sm ${step === 1 && beneficiaries.length > 0 ? 'block' : 'hidden'}`}>*/}
                    {/*            Ajouter Bénéficiaire*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</Form>*/}
                </div>
            </DialogContent>
        </Dialog>
    );
}