"use client"

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PlusCircle, ClipboardList, Goal, Pencil, Search, SquarePen, Trash2, X} from "lucide-react";
import * as React from "react";
import {useEffect, useState} from "react";
import {formatCFA} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {NumericFormat} from "react-number-format";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {Plus, Send} from "lucide-react";
import {IUser} from '@/core/interfaces/user';
import {IBeneficiary} from '@/core/interfaces/beneficiary';
import {IOperator} from '@/core/interfaces/operator';
import {getOperators} from "@/core/apis/operator";
import {addBeneficiary} from "@/core/apis/beneficiary";

interface MainActionsProps {
    lang: string,
    merchant: IUser,
}

interface IBeneficiarySchema {
    firstName: string,
    lastName: string,
    email: string,
    type: string,
    paynahAccountNumber: string,
    operator: string,
    number: string,
    bankAccount: string
}

export default function BeneficiaryActions({lang, merchant}: MainActionsProps) {

    const [step, setStep] = useState(1);
    const [account, setAccount] = useState<{id: string, name: string}>({id: '', name: ''});
    const [beneficiary, setBeneficiary] = useState<{id: string, name: string}>({id: '', name: ''});
    const [existBenef, setExistBenef] = useState(true);
    const [payFees, setPayFees] = useState(false);
    const [amount, setAmount] = useState('0');
    const [totalAmount, setTotalAmount] = useState('');
    const [reason, setReason] = useState('');
    const [percentage, setPercentage] = useState('w-2/4');

    const [confirmStep, setConfirmStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    //
    const [isLoading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [operators, setOperators] = useState([]);
    const [showConError, setShowConError] = useState(false);
    const [beneficiaries, setBeneficiaries] = useState<IBeneficiarySchema[]>([]);

    const formSchema = z.object({
        lastName: z.string().min(2, { message: "Le nom doit contenir au moins deux lettres" }),
        firstName: z.string().min(2, { message: "Le prénoms doit contenir au moins deux lettres" }),
        email: z.string().email({message: "votre email doit avoir un format valide"}),
        type: z.string(),
        paynahAccountNumber: z.string(),
        operator: z.string(),
        number: z.string(),
        bankAccount: z.string()
    })

    const beneficiaryForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            email: "",
            type: "",
            paynahAccountNumber: "",
            operator: "",
            number: "",
            bankAccount: "",
        }
    });

    const errorsArray = Object.values(beneficiaryForm.formState.errors);

    // function nextStep() {
    //     if (step < 4) {
    //         setStep(step + 1);

    //         if (step + 1 == 4) {
    //             setPercentage('w-full');
    //         } else if (step + 1 == 3) {
    //             setPercentage('w-3/4');
    //         } else {
    //             setPercentage('w-2/4');
    //         }
    //     }
    // }

    function prevStep() {
        if (step > 1) {
            setStep(step - 1);

            if (step - 1 == 1) {
                setPercentage('w-2/4');
            }
        }
    }

    const { register, handleSubmit, formState: {errors}, setValue } = beneficiaryForm;

    const resetCreateBeneficiaryValues = () => {
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('email', '')
        setValue('paynahAccountNumber', '')
        setValue('operator', '')
        setValue('number', '')
        setValue('bankAccount', '')
        setBeneficiaries([]);
    }

    const getOperatorList = () => {
        // @ts-ignore
        getOperators(String(merchant.accessToken))
        .then(data => {
            setOperators(data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            setOperators([]);
        });
    }

    const handleChangeAccountType = (accountType: string) => {
        setAccountType(accountType);
        if (accountType === 'BANK') { setValue('operator', ''), setValue('number', ''); }
        if (accountType === 'MOBILE') { setValue('bankAccount', ''); setValue('paynahAccountNumber', ''); }
    }

    const deleteBeneficiaryItem = (index: number) => {
        let beneficiariesCopy: IBeneficiarySchema[] = [...beneficiaries];
        beneficiariesCopy.splice(index, 1);
        setBeneficiaries(beneficiariesCopy);
    }

    const addBeneficiaryItems = (data: any) => {
        try {
            formSchema.parse(data); // Valider les données
            setBeneficiaries([...beneficiaries, data]);
            console.log('Les données du formulaire sont valides !');
          } catch (error: any) {
            console.error('Erreur de validation du formulaire :', error.errors);
          }
    }

    const createBeneficiary = (e: any) => {
        e.preventDefault();
        console.log(beneficiaries[0]);
        // @ts-ignore
        addBeneficiary(beneficiaries[0], String(merchant.merchantsIds[0].id), String(merchant.accessToken))
        .then(data => {
            if (data.success) {
                setErrorMessage('');
                setStep(2);
                setPercentage('w-4/4');
            } else {
                setErrorMessage(data.message);
            }
        })
        .catch(err => {
            setErrorMessage('Une erreur est survénue');
        });
    }

    useEffect(() => {
        getOperatorList()
    }, []);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                <button>
                    <Avatar className={`cursor-pointer border border-[#cdcdcd] border-dashed`}>
                        <AvatarFallback className={`bg-transparent text-[#cdcdcd]`}>
                            <Plus className={`h-4`} />
                        </AvatarFallback>
                    </Avatar>
                </button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[42rem] xl:max-w-[46rem] 2xl:max-w-[49rem] overflow-y-auto max-h-[600px] overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                    <div>
                        <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                            <div className={`flex justify-between items-center space-x-3`}>
                                <h2 className={`text-base text-[#626262] font-medium`}>{`Ajouter un bénéficiaire`}</h2>
                                <DialogClose onClick={() => {setStep(1); setPercentage('w-2/4'); setConfirmStep(0); resetCreateBeneficiaryValues();}}>
                                    <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`} />
                                </DialogClose>
                            </div>
                        </div>
                        <div className={`h-1 bg-[#cfcfcf]`}>
                            <div className={`h-full ${percentage} duration-200 bg-black`}></div>
                        </div>
                    </div>

                    <div className={`min-h-[6rem] pt-2 pb-4 px-8`}>

                        <Form {...beneficiaryForm}>
                            <form onSubmit={undefined} className={`${step == 2 && 'hidden'} space-y-5 gap-6`}>
                                <div className={`flex items-center gap-5`}>
                                        <div className={'w-1/3'}>
                                                    <FormField
                                                        control={beneficiaryForm.control}
                                                        name="lastName"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <div className={`inline-flex space-x-3`}>
                                                                    <h3 className={`text-sm font-medium`}>Nom</h3>
                                                                </div>
                                                                <FormControl className={''}>
                                                                    <div>
                                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                            placeholder="Entrez votre nom" {...field} style={{
                                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                        }} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className={`text-xs`}>{errors.lastName && errors.lastName.message as string}</FormMessage>
                                                            </FormItem>
                                                        )}
                                                    />
                                        </div>
                                        <div className={'w-2/3'}>
                                                    <FormField
                                                        control={beneficiaryForm.control}
                                                        name="firstName"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <div className={`inline-flex space-x-3`}>
                                                                    <h3 className={`text-sm font-medium`}>Prénoms</h3>
                                                                </div>
                                                                <FormControl className={''}>
                                                                    <div>
                                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                            placeholder="Entrez votre prénoms" {...field} style={{
                                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                        }} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className={`text-xs`}>{errors.firstName && errors.firstName.message as string}</FormMessage>
                                                            </FormItem>
                                                        )}
                                                    />
                                        </div>
                                </div>
                                <div className={`gap-5`}>
                                        <div className={''}>
                                                    <FormField
                                                        control={beneficiaryForm.control}
                                                        name="email"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <div className={`inline-flex space-x-3`}>
                                                                    <h3 className={`text-sm font-medium`}>Email</h3>
                                                                </div>
                                                                <FormControl className={''}>
                                                                    <div>
                                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                            placeholder="Entrez votre email" {...field} style={{
                                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                        }} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className={`text-xs`}>{errors.email && errors.email.message as string}</FormMessage>
                                                            </FormItem>
                                                        )}
                                                    />
                                        </div>
                                </div>
                                <div className={`gap-5`}>
                                        <div className={''} >
                                        <FormField
                                            control={beneficiaryForm.control}
                                            name="type"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Type de compte</h3>
                                                    </div>
                                                    <FormControl>
                                                        <div>
                                                            <Select onValueChange={(value) => { field.onChange(value); handleChangeAccountType(value); }} defaultValue={field.value}>
                                                                <SelectTrigger className={`w-full ${showConError && "!border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`} style={{
                                                                    backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                }}>
                                                                    <SelectValue  placeholder="Choisir un type de compte"/>
                                                                </SelectTrigger>
                                                                <SelectContent className={`z-[999] bg-[#f0f0f0]`}>
                                                                    <SelectItem className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`} value="MOBILE">
                                                                        <div className={`inline-flex items-center space-x-2.5`}>
                                                                            <span className={`mt-[2px]`}>Mobile</span>
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`} value="BANK">
                                                                        <div className={`inline-flex items-center space-x-2.5`}>
                                                                            <span className={`mt-[2px]`}>Banque</span>
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className={`text-xs`}>{errors.type && errors.type.message as string}</FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        </div>
                                </div>
                                {
                                    accountType == "MOBILE" &&
                                    <div className={`flex items-center gap-5`}>
                                            <div className={'w-1/2'} >
                                            <FormField
                                                control={beneficiaryForm.control}
                                                name="operator"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className={`inline-flex space-x-3`}>
                                                            <h3 className={`text-sm font-medium`}>Opérateur Mobile Money</h3>
                                                        </div>
                                                        <FormControl>
                                                            <div>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <SelectTrigger className={`w-full ${showConError && "!border-[#e95d5d]"} px-4 font-light text-sm ${showConError && "border-[#e95d5d]"}`} style={{
                                                                        backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                    }}>
                                                                        <SelectValue  placeholder="Choisir un opérateur"/>
                                                                    </SelectTrigger>
                                                                    <SelectContent className={`z-[999] bg-[#f0f0f0]`}>
                                                                        {
                                                                            operators && operators.map((operator: IOperator) => (
                                                                                <SelectItem key={operator.id} className={`h-[3.1rem] inline-flex items-center font-light focus:bg-gray-100 cursor-pointer`} value={String(operator.code)}>
                                                                                    <div className={`inline-flex items-center space-x-2.5`}>
                                                                                        <span className={`mt-[2px]`}>{operator.name}</span>
                                                                                    </div>
                                                                                </SelectItem>
                                                                            ))
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className={`text-xs`}>{errors.operator && errors.operator.message as string}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            </div>
                                            <div className={'w-1/2'} >
                                            <FormField
                                                control={beneficiaryForm.control}
                                                        name="number"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <div className={`inline-flex space-x-3`}>
                                                                    <h3 className={`text-sm font-medium`}>Numéro de téléphone</h3>
                                                                </div>
                                                                <FormControl className={''}>
                                                                    <div>
                                                                        <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                            placeholder="Entrez votre numéro de téléphone" {...field} style={{
                                                                            backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                        }} />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className={`text-xs`}>{errors.number && errors.number.message as string}</FormMessage>
                                                            </FormItem>
                                                )}
                                            />
                                            </div>
                                    </div>
                                }
                                {
                                    accountType == "BANK" &&
                                    <div className={`flex items-center gap-5`}>
                                            <div className={'w-1/2'}>
                                                        <FormField
                                                            control={beneficiaryForm.control}
                                                            name="bankAccount"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <div className={`inline-flex space-x-3`}>
                                                                        <h3 className={`text-sm font-medium`}>Numéro de compte bancaire</h3>
                                                                    </div>
                                                                    <FormControl className={''}>
                                                                        <div>
                                                                            <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                                placeholder="Entrez votre numéro de compte bancaire" {...field} style={{
                                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                            }} />
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage className={`text-xs`}>{errors.bankAccount && errors.bankAccount.message as string}</FormMessage>
                                                                </FormItem>
                                                            )}
                                                        />
                                            </div>
                                            <div className={'w-1/2'}>
                                                        <FormField
                                                            control={beneficiaryForm.control}
                                                            name="paynahAccountNumber"
                                                            render={({field}) => (
                                                                <FormItem>
                                                                    <div className={`inline-flex space-x-3`}>
                                                                        <h3 className={`text-sm font-medium`}>Numéro de compte Paynah</h3>
                                                                    </div>
                                                                    <FormControl className={''}>
                                                                        <div>
                                                                            <Input type={`text`} className={`font-light text-sm ${showConError && "border-[#e95d5d]"}`}
                                                                                placeholder="Entrez votre numéro de compte Paynah" {...field} style={{
                                                                                backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                            }} />
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage className={`text-xs`}>{errors.paynahAccountNumber && errors.paynahAccountNumber.message as string}</FormMessage>
                                                                </FormItem>
                                                            )}
                                                        />
                                            </div>
                                    </div>
                                }
                                <div className={`flex items-center gap-6 mt-8 overflow-y-auto max-h-[90px]`}>
                                        <Button className={`px-6 items-center text-xs`} onClick={handleSubmit((data) => addBeneficiaryItems(data))}>
                                            <PlusCircle className={`h-4 w-4 mr-2`} />
                                            <span>Ajouter un compte</span>
                                        </Button>
                                </div>
                                <div className={'justify-start grid grid-cols-3 gap-3'}>
                                        {
                                            beneficiaries && beneficiaries.map((beneficiary: IBeneficiarySchema, index: number) => (
                                            <div key={index}
                                            className={`snap-end shrink-0 w-[30] 2xl:w-[24] bg-white flex flex-col justify-between space-y-8 2xl:space-y-8 p-4 rounded-3xl`}>
                                            <div className={`flex justify-between items-start`}>
                                                <div>
                                                    <div className={`inline-flex flex-col`}>
                                                        {/* <div
                                                            className={`mb-1 rounded-xl p-2 bg-[#f0f0f0] w-[2.7rem] h-[2.7rem] inline-flex justify-center items-center`}>
                                                            <svg className={`h-[1.1rem] fill-[#767676] w-auto`}
                                                                viewBox="0 0 19.474 17.751">
                                                                <defs>
                                                                    <clipPath id="clipPath1">
                                                                        <rect width="19.474" height="17.751"/>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(0)">
                                                                    <g transform="translate(0)" clipPath="url(#clipPath1)">
                                                                        <path
                                                                            d="M18.422,131.245v.295c0,.477,0,.954,0,1.431a2.758,2.758,0,0,1-2.792,2.786q-6.191,0-12.381,0a4.087,4.087,0,0,1-1.4-.157A2.762,2.762,0,0,1,0,132.973c0-2.774,0-5.548,0-8.323a3.5,3.5,0,0,1,.2-1.361,2.764,2.764,0,0,1,2.566-1.728q6.432,0,12.863,0a2.743,2.743,0,0,1,2.7,2.075,2.966,2.966,0,0,1,.085.663c.012.555,0,1.109,0,1.664,0,.028,0,.057-.009.1H15.7a2.586,2.586,0,0,0-.235,5.165c.924.031,1.849.01,2.774.012h.184"
                                                                            transform="translate(0 -118.007)"/>
                                                                        <path
                                                                            d="M466.573,292.279c.486,0,.973,0,1.459,0a.906.906,0,0,1,.96.96q0,1.145,0,2.291a.9.9,0,0,1-.949.958c-.978,0-1.955.008-2.933,0a2.1,2.1,0,0,1-.055-4.2c.505-.018,1.012,0,1.517,0v0m-1.438,2.844v-.01c.078,0,.156,0,.233,0a.729.729,0,0,0-.034-1.458c-.141,0-.282,0-.422,0a.726.726,0,0,0-.124,1.435,3.1,3.1,0,0,0,.347.032"
                                                                            transform="translate(-449.52 -283.733)"/>
                                                                        <path
                                                                            d="M232.826,2.991q2.429-1.4,4.859-2.805a1.238,1.238,0,0,1,1.748.471c.1.163.189.328.295.512l-6.9,1.848,0-.027"
                                                                            transform="translate(-226.02 0)"/>
                                                                        <path
                                                                            d="M301.2,56.416h-6.9l-.006-.017c.036-.013.072-.029.109-.039q2.519-.675,5.039-1.349a1.292,1.292,0,0,1,1.639.937c.041.149.079.3.123.468"
                                                                            transform="translate(-285.691 -53.352)"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </div> */}
                                                        <span
                                                            className={`text-[12px] font-light text-[#626262]`}>Compte { beneficiary.type == "BANK" ? 'Bancaire' : 'Mobile'} </span>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                                        <button className={`text-[#626262]`} onClick={()=> deleteBeneficiaryItem(index)}>
                                                            <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`} />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    {/* <DropdownMenuContent className="w-56 rounded-xl shadow-md" align={"end"}>
                                                        <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                            <ClipboardList className="mr-2 h-3.5 w-3.5"/>
                                                            <span className={`mt-[1.5px]`}>Détails du compte</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                            <Pencil className="mr-2 h-3.5 w-3.5"/>
                                                            <span className={`mt-[1.5px]`}>Modifier le nom du compte</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator/>
                                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                        <span className={`mt-[1.5px]`}>Supprimer le compte</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent> */}
                                            </DropdownMenu>
                                        </div>
                                        <div className={`inline-flex flex-col`}>
                                            <h3 className={`text-[10px] font-normal text-[#afafaf]`}>{beneficiary.type == "BANK" ? 'Numéro Compte bancaire' : 'Opérateur'} </h3>
                                            <span className={`text-base font-semibold`}>{beneficiary.type == "BANK" ? beneficiary.bankAccount : beneficiary.operator}</span>
                                            <h3 className={`text-[10px] font-normal text-[#afafaf]`}>{beneficiary.type == "BANK" ? 'Numéro Compte Paynah': 'Numéro de téléphone'}</h3>
                                            <span className={`text-base font-semibold`}>{beneficiary.type == "BANK" ? beneficiary.paynahAccountNumber : beneficiary.number}</span>
                                        </div>
                                            </div>
                                            ))
                                        }
                                </div>
                            </form>
                            <div className={`${step == 2 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                        <div className={`flex flex-col items-center`}>
                                                <span className="relative flex w-40 h-40">
                                                  <span
                                                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>
                                                  <span
                                                      className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>
                                                </span>
                                            <p className={`text-base mt-10`}>{`Votre bénéficiaire a été ajouté avec succès.`}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className={`flex justify-center items-center mb-3`}>
                                <Button onClick={() => { resetCreateBeneficiaryValues(); prevStep(); }} className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${step == 1 || step == 4 || confirmStep != 0 ? 'hidden' : 'block'}`}>
                                    Retour
                                </Button>
                                <Button onClick={(e) => { createBeneficiary(e)}} className={`mt-5 w-36 text-sm ${step === 1 && beneficiaries.length > 0 ? 'block' : 'hidden'}`}>
                                    Continuer
                                </Button>
                            </div>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}