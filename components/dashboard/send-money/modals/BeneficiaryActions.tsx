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
import {Form} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Banknote, ClipboardList, Goal, Pencil, Search, SquarePen, Trash2, X} from "lucide-react";
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
import {IOperator} from '@/core/interfaces/operator';
import {getOperators} from "@/core/apis/operator";
import {addBeneficiary} from "@/core/apis/beneficiary";

interface MainActionsProps {
    lang: string,
    merchant: IUser,
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

    const formSchema = z.object({
        beneficiary: z.string(),
    })

    const sendMoneyForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiary: "",
        }
    });

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

    const { register, handleSubmit, formState: {errors}, setValue } = useForm();

    const resetCreateBeneficiaryValues = () => {
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('email', '')
        setValue('paynahAccountNumber', '')
        setValue('operator', '')
        setValue('number', '')
        setValue('bankAccount', '')
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

    const handleChangeAccountType = (event: any) => {
        const accountType = event.target.value;
        setAccountType(accountType);
        if (accountType === 'BANK') { setValue('operator', '')}
        if (accountType === 'MOBILE') { setValue('bankAccount', '')}
    }

    const createBeneficiary = (data: any) => {
        // @ts-ignore
        addBeneficiary(data, String(merchant.merchantsIds[0].id), String(merchant.accessToken))
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
                <DialogContent className={`sm:max-w-[52rem] xl:max-w-[56rem] 2xl:max-w-[59rem]  overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
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
                        <Form {...sendMoneyForm}>
                            
                            <div className={`mt-4`}>
                                
                                {/*Step 1*/}
                                <div className={`${step == 1 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-2`}>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Nom</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`text`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                        placeholder="Entrez le nom du bénéfciaire" 
                                                        {...register("lastName", {required: "le nom est requis", minLength: { value: 2, message: 'le nom doit comporter au moins 2 caractères'}})}
                                                    />
                                                    {errors.lastName && <p className="text-red-600 text-sm" role="alert">{errors.lastName.message as string}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Prénoms</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`text`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                        placeholder="Entrez le prénoms du bénéficiaire" 
                                                        {...register("firstName", {required: "le prénom est requis", minLength: { value: 2, message: 'le nom doit comporter au moins 2 caractères'}})}
                                                    />
                                                    {errors.firstName && <p className="text-red-600 text-sm" role="alert">{errors.firstName.message as string}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-2`}>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Email</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`email`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                        placeholder="Entrez l'email du bénéficiaire" 
                                                        {...register("email", {required: "l'email est requis", pattern: { value: /^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]{2,}$/i, message: "l'email doit être valide"}})}
                                                    />
                                                    {errors.email && <p className="text-red-600 text-sm" role="alert">{errors.email.message as string}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Numéro de téléphone</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`phone-number`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                        placeholder="Entrez le numéro de téléphone du bénéficiaire" 
                                                        {...register("number", {required: "le numéro de téléphone est requis", pattern: { value: /^[0-9]{7,}$/i, message: "le numéro de téléphone doit être valide"}})}
                                                    />
                                                    {errors.number && <p className="text-red-600 text-sm" role="alert">{errors.number.message as string}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-2`}>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Numéro de compte Paynah</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`text`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                        placeholder="Entrez le numéro" 
                                                        {...register("paynahAccountNumber", {required: "le numéro de compte Paynah est requis", })}
                                                    />
                                                    {errors.paynahAccountNumber && <p className="text-red-600 text-sm" role="alert">{errors.paynahAccountNumber.message as string}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>Type de compte</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <select onChange={handleChangeAccountType} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem] p-4`}>
                                                        <option value="">Veuillez choisir une option</option>
                                                        <option value="BANK">Compte bancaire</option>
                                                        <option value="MOBILE">Compte mobile money</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4 mb-2`}>
                                        {
                                            accountType === 'MOBILE' &&
                                            <div>
                                                <div className={`w-full`}>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Opérateur</h3>
                                                    </div>
                                                    <div className={`relative mt-2 w-full`}>
                                                        <select className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem] p-4`} {...register("operator")}>
                                                        {
                                                            operators.map((operator: IOperator) => (
                                                                <option key={operator.id} value={operator.code}>{operator.name}</option>
                                                            ))
                                                        }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            accountType === 'BANK' &&
                                            <div>
                                                <div className={`w-full`}>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Numéro compte bancaire</h3>
                                                    </div>
                                                    <div className={`relative mt-2 w-full`}>
                                                        <Input type={`text`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                            placeholder="Entrez le numéro du compte bancaire" 
                                                            {...register("bankAccount")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {errorMessage && <p className="text-red-600 text-sm" role="alert">{errorMessage}</p>}
                                </div>

                                {/*step 2*/}
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
                                    <Button onClick={ 
                                        handleSubmit((data) => createBeneficiary(data)) 
                                         } className={`mt-5 w-36 text-sm ${step === 1 ? 'block' : 'hidden'}`}>
                                        Continuer
                                    </Button>
                                    {/* <Button onClick={() => {
                                        setConfirmStep(1);
                                        setStep(0);
                                    }} className={`mt-5 w-[30%] text-sm ${step == 4 ? 'block' : 'hidden'}`}>
                                        {`Confirmer l'envoi`}
                                    </Button>
                                    <Button onClick={() => sendMoneyAction()} className={`mt-3 w-[30%] text-sm ${confirmStep == 1 ? 'block' : 'hidden'}`}>
                                        {`Déverouiller`}
                                    </Button>
                                    <DialogClose onClick={() => {
                                        setStep(1); setPercentage('w-1/4'); setConfirmStep(0); resetSendMoneyValues();
                                    }}>
                                        <Button className={`mt-5 w-36 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${confirmStep == 2 ? 'block' : 'hidden'}`}>
                                            Terminer
                                        </Button>
                                    </DialogClose>
                                    <Button onClick={() => downloadTicket()} className={`mt-3 w-48 text-sm ${confirmStep == 2 ? 'block' : 'hidden'}`}>
                                        {`Télécharger le reçu`}
                                    </Button> */}
                                </div>
                            </div>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}