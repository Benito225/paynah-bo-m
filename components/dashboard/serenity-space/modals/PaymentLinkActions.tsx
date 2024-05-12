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
import {Copy, Send} from "lucide-react";
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import {IUser} from "@/core/interfaces/user";
import {IAccount} from "@/core/interfaces/account";
import {generateQuickPaymentLink} from '@/core/apis/payment';
import {login} from '@/core/apis/login';
import toast from "react-hot-toast";

interface PaymentLinkActionsProps {
    lang: string,
    paymentLink: any,
    beneficiaries: IBeneficiary[],
    merchant: IUser,
    accounts: IAccount[],
    activeSendMode: string,
}

export default function PaymentLinkActions({paymentLink, beneficiaries, merchant, accounts, activeSendMode}: PaymentLinkActionsProps) {

    const [step, setStep] = useState(1);
    const [account, setAccount] = useState('');
    const [beneficiary, setBeneficiary] = useState<IBeneficiary>({ });
    const [existBenef, setExistBenef] = useState(true);
    const [payFees, setPayFees] = useState(false);
    const [amount, setAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [reason, setReason] = useState('');
    const [percentage, setPercentage] = useState('w-1/4');

    const [confirmStep, setConfirmStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    const [displayBeneficiaryForm, setDisplayBeneficiaryForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConError, setShowConError] = useState(false);
    const [bankAccountId, setBankAccountId] = useState('');
    const [operator, setOperator] = useState('');
    const [paymentLinkToShare, setPaymentLinkToShare] = useState('aaa');

    const formSchema = z.object({
        lastName: z.string().min(2, {message: 'veuillez saisir votre nom'}),
        firstName: z.string().min(2, {message: 'veuillez saisir votre prénoms'}),
        email: z.string().email({message: 'veuillez saisir votre email'}),
        beneficiary: z.string(),
    })

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const sendMoneyForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            email: "",
            beneficiary: "",
        }
    });

    const { handleSubmit, formState: {errors}, setValue } = sendMoneyForm;

    function initPaymentLinkPayloadParams() {
        setAmount(paymentLink.getValues('amount'));
        setAccount(paymentLink.getValues('accountNumber'));
        setBankAccountId(paymentLink.getValues('accountNumber'));
    }

    function updateFormValue(value: any) {
        if (step == 1) {
            initPaymentLinkPayloadParams();
            setBeneficiary(value)
            setStep(2);
            setPercentage('w-2/4');
        } else if (step == 2) {
            setStep(3);
            setPercentage('w-3/4');
        }
    }

    function showBeneficiaryForm() {
        if(displayBeneficiaryForm){
            resetCreateBeneficiaryValues();
        }
        setDisplayBeneficiaryForm(!displayBeneficiaryForm);
    }

    function nextStep() {
        if (step < 4) {
            setStep(step + 1);

            if (step + 1 == 3) {
                setPercentage('w-3/4');
            } else if (step + 1 == 2) {
                setPercentage('w-2/4');
            } else {
                setPercentage('w-full');
            }
        }
    }

    function prevStep() {
        setShowConError(false);
        setErrorMessage('');
        if (step > 1) {
            setStep(step - 1);

            if (step - 1 == 1) {
                setPercentage('w-1/4');
            } else if (step - 1 == 2) {
                setPercentage('w-2/4');
            } else if (step - 1 == 3) {
                setPercentage('w-3/4');
            }
        }
    }


    function downloadTicket() {
        console.log('downloadTicket');
    }

    function resetCreateBeneficiaryValues(){
        setValue('lastName', '');
        setValue('firstName', '');
        setValue('email', '');
        setBeneficiary({});
    }

    function resetSendPaymentLink() {
        setStep(1)
        resetCreateBeneficiaryValues()
        // setAccount({id: '', name: ''})
        // setBeneficiary({id: '', name: ''})
        setExistBenef(true)
        setPayFees(false)
        setAmount(0)
        setTotalAmount('')
        setReason('')
        setPercentage('w-1/4')
        setErrorMessage('')
        setConfirmStep(0)
        setShowPassword(false)
        setAccessKey('')
        setBankAccountId('')
    }

    const sendPaymentLinkToRecipient = async () => {
        // @ts-ignore
        const payload = {
            bankAccountId: bankAccountId,
            firstName: beneficiary.firstName,
            lastName: beneficiary.lastName,
            phoneNumber: '',
            email: beneficiary.email,
            amount: Number(amount),
        };
        console.log(payload);
        const isAuthenticate = await authenticateMerchant(accessKey);
        if(isAuthenticate){
            generateQuickPaymentLink(payload, String(merchant?.merchantsIds[0]?.id), String(merchant.accessToken))
            .then(data => {
                console.log(data);
                if (data.success) {
                    setErrorMessage('');
                    setStep(4);
                    setPercentage('w-full');
                    setPaymentLinkToShare(data.data);
                } else {
                    return toast.error(data.message, {
                        className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                    });
                }
            })
            .catch(() => {
                return toast.error('Une erreur est survénue', {
                    className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                });
            });
        }
    }

    const authenticateMerchant = async (password: string) => {
        // @ts-ignore
        let isAuthenticate = false;
        if(password.trim().length > 0){
            const payload = {
                username: merchant.login,
                password: password,
            }
            try {
                await login(payload, false);
                setShowConError(false);
                setErrorMessage("");
                isAuthenticate = true;
            } catch (error) {
                setShowConError(true);
                setErrorMessage("Identifiants invalides");
            }
        } else {
            setShowConError(true);
            setErrorMessage("veuillez saisir votre clé d'accès");
        }
        return isAuthenticate;
    }

    const addNewBeneficiary = (data: any) => {
        try {
          formSchema.parse(data); // Valider les données
          updateFormValue(data);
        } catch (error) {
            console.error('Erreur de validation du formulaire :', error);
        }
    }

    const copyPaymentLink = async () => {
        try {
            await navigator.clipboard.writeText(paymentLinkToShare);
            toast.success("Lien de paiement copié!", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });
        } catch (err) {
            return toast.error("une erreur est survenue!", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }
    }

    useEffect(() => {
        if (payFees) {
            const amountWithoutString = String(amount).match(/\d+/g)?.join('');
            const amountNumber = parseInt(amountWithoutString ?? '0');
            const finalAmountNumber =  amountNumber * (1 / 100) + amountNumber;
            const finalAmount = formatCFA(finalAmountNumber);
            setTotalAmount(finalAmount);
        } else {
            setTotalAmount(String(amount));
        }

    }, [amount, payFees, paymentLink]);

    return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={`absolute rounded-lg p-3 top-0 right-0`}>
                        <Send className={`h-[1.1rem] text-[#fff] `} />
                    </Button>
                </DialogTrigger>
                <DialogContent className={`${step == 1 ? "sm:max-w-[46rem] xl:max-w-[50rem] 2xl:max-w-[53rem]" : "sm:max-w-[40rem]"}  overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                    <div>
                        <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                            <div className={`flex justify-between items-center space-x-3`}>
                                <h2 className={`text-base text-[#626262] font-medium`}>{`Lien de paiement`}</h2>
                                <DialogClose onClick={() => {setStep(1); setPercentage('w-1/4'); setConfirmStep(0); resetSendPaymentLink();}}>
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
                            {/*Step 1*/}
                            <div className={`${step == 1 ? 'flex' : 'hidden'} items-center justify-between space-x-3`}>
                                <h3 className={`text-sm font-medium`}>1- Choisissez le destinataire</h3>
                                <div className={`relative`}>
                                    <Input type={`text`} className={`font-normal pl-9 bg-white text-xs rounded-full h-[2.8rem] w-[15rem]`}
                                           placeholder="Recherchez un bénéficiaire" onChange={(e) => console.log(e.target.value) }/>
                                    <Search className={`absolute h-4 w-4 top-3.5 left-3`} />
                                </div>
                            </div>
                            <div className={`mt-4`}>
                                {/*Step 1*/}
                                <div className={`${step == 1 ? 'flex' : 'hidden'} flex-col`}>
                                    <div className={`mb-3`}>
                                        <div className={`inline-flex text-sm font-normal space-x-1 rounded-lg py-1 px-1 bg-[#f0f0f0]`}>
                                            <button onClick={() => showBeneficiaryForm()} type={"button"} className={`${!displayBeneficiaryForm ? "bg-white px-3 py-1.5 rounded-lg" : "px-3 py-1.5"}`}>
                                                Bénéficiaires enregistrés
                                            </button>
                                            <button onClick={() => showBeneficiaryForm()} type={"button"}  className={`${displayBeneficiaryForm ? "bg-white px-3 py-1.5 rounded-lg" : "px-3 py-1.5"}`}>
                                                Nouveau bénéficiaire
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`mt-1`}>
                                        {
                                            !displayBeneficiaryForm &&
                                            <div className={`grid grid-cols-3 gap-3`}>
                                            {
                                                beneficiaries.map((beneficiary: IBeneficiary) => (
                                                <div key={beneficiary.id} onClick={() => updateFormValue(beneficiary)} 
                                                    className={`bg-white inline-flex items-center cursor-pointer space-x-2 rounded-lg p-2 ${beneficiary.id == '1' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}>
                                                    <Avatar className={`cursor-pointer`}>
                                                        <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                    </Avatar>
                                                    <div className={`inline-flex flex-col`}>
                                                        <h3 className={`text-xs font-medium`}>{`${beneficiary.firstName} ${beneficiary.lastName}`}</h3>
                                                        <span className={`text-xs -mt-[1px] text-[#626262]`}>{beneficiary.email}</span>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                            </div>
                                        }
                                        {
                                            displayBeneficiaryForm &&
                                            <div className={``}>
                                               <form onSubmit={undefined} className={`${step == 2 && 'hidden'} space-y-5 gap-6`}>
                                                    <div className={`flex items-center gap-5`}>
                                                        <div className={'w-1/3'}>
                                                                <FormField
                                                                    control={sendMoneyForm.control}
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
                                                                    control={sendMoneyForm.control}
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
                                                                        control={sendMoneyForm.control}
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
                                                </form>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/*Step 2*/}
                                <div className={`${step == 2 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                            <div className={`flex flex-col items-center`}>
                                            <svg className={`h-[4rem] w-auto`} viewBox="0 0 169.57 119">
                                                <g>
                                                    <g>
                                                        <path className="t-cls-1"
                                                              d="M67.24,34.31c-.09.84-.03,1.63,1.07,1.91,1.03.26,2.07.59,3.01,1.07,1.69.86,2.24.31,2.01-1.34.45-1.26-.03-1.7-1.21-1.77-1.06-.06-2.11-.37-3.18-.41-.57-.02-1.56-.79-1.7.54Z"/>
                                                        <path className="t-cls-1"
                                                              d="M103.75,82.04c1.39.05,2.13-1.53,2.26-2.79.12-1.21-1.06-1.71-2.25-1.98-1.18.25-2.6.82-2.55,2.1.04,1.25,1.28,2.63,2.54,2.67Z"/>
                                                        <path className="t-cls-1"
                                                              d="M65.85,25.87c.76.16,1.4.44,1.83-.56,1.02-2.33,2.12-4.63,3.23-7.04-7.24-.7-14.35-1.39-21.47-2.08,5.86-.74,11.61.15,17.33.89,3.46.46,6.14.1,7.67-3.36.03-.06.02-.14.06-.46H6.36c7.07,1.77,14.18,3.24,21.28,4.71,12.74,2.63,25.48,5.25,38.21,7.9Z"/>
                                                        <path className="t-cls-1"
                                                              d="M118.41,12.17c-13.24-8.08-29.76-4.07-38.36,9.47-2.2,3.46-3.88,7.11-4.63,11.16-.11.58-.05,1.32-.59,1.67,0,.03.01.06.02.09.17,1.48-.44,3.22,1.73,3.9,1.94.61,2.42.43,2.43-1.6,0-1.09.1-2.16.27-3.2-.38.03-.76.05-1.13.08-1.61.11-1.6-2.89,0-3,.59-.04,1.21-.08,1.86-.12.43-1.35.99-2.67,1.68-3.97,2-3.77,4.46-6.84,7.37-9.26-.32-.5-.63-1.01-.95-1.51-.97-1.54,1.2-3.04,2.16-1.52l.9,1.43c3.92-2.64,8.55-4.2,13.88-4.67,8.97-.8,16.9,6.56,17.25,15.52,1.57-.37,2.24,2.52.66,2.89-.26.06-.49.11-.72.16-.54,7.16-4.02,12.88-9.56,17.69-.08.9-.78,1.72-1.56,1.34-1.46,1.3-1.21,1.45,1.02,2.39.12-.81.92-1.17,1.44-1.69,2.47-2.45,5.01-4.84,6.87-7.82,2.81-4.51,4.7-9.3,4.49-14.73-.03-.91-.01-1.82.22-2.72.05-.13.09-.27.14-.4-.75-.92-.74-2.13-.95-3.23-.71-3.71-2.61-6.35-5.93-8.37Z"/>
                                                        <path className="t-cls-1"
                                                              d="M110.14,7.06c3.95.77,7.45,2.62,11.18,5.11-1.5-4.81-9.07-10.4-12.9-9.92.22,1.04.5,2.09.64,3.15.1.77.1,1.47,1.08,1.66Z"/>
                                                        <path className="t-cls-1"
                                                              d="M71.02,73.65c.08,1.17-.89,1.13-1.77,1.13-4.09.02-5.85,1.8-5.7,5.96.05,1.38-.27,1.88-1.73,1.97-3.16.19-4.4,1.63-4.38,4.8.02,1.83.34,3.64.72,5.41.46,2.17,2.52,3.99,4.48,4.15,1.96.16,3.32-.8,4.24-2.48.76-1.37.65-2.68-.16-4-1.14-1.84-2.09-3.78-2.61-5.89-.17-.69-.49-1.6.53-1.88.82-.22,1.1.58,1.38,1.17.83,1.71,1.38,3.55,2.48,5.14,1.9,2.74,3.83,3.48,5.74,2.15,1.6-1.12,1.89-4.54.46-6.6-.9-1.3-1.92-2.51-2.53-3.98-.31-.76-.74-1.75.22-2.19.81-.37,1.29.56,1.62,1.2.79,1.48,1.85,2.75,2.9,4.03.91,1.12,2.1,1.59,3.52,1.49,1.37-.09,2.71-.36,3.28-1.81.52-1.32-.43-2.18-1.26-3.01-1.35-1.35-2.7-2.71-3.67-4.37-.29-.5-.58-1.1,0-1.57.6-.49,1.1-.05,1.51.36.99,1,2.07,1.94,2.94,3.03,1.78,2.21,3.84,2.87,6.29,1.88-.94-.74-1.84-1.52-3.22-1.13-.59.17-1.27.08-1.18-.77.16-1.57-1-2.15-1.97-2.89-1.91-1.46-3.97-2.75-5.74-4.35-2.05-1.85-3.99-2.45-6.22-.48.38,1.18-.27,2.31-.19,3.5ZM65.15,90.61c-2.22.33-4.09,1.04-4.32,3.65-.87-2.92,1.18-4.71,4.32-3.65ZM78.65,81.13c.8-1.03,1.65-1.11,3.14-.25-.76.53-1.88.11-2.4.99-.22.37-.26,1.2-.92.76-.63-.42-.19-1.03.18-1.5ZM74.48,86.25c-2.55-1.11-4.19-.75-4.69,2.21-.56-1.95-.31-2.77.76-3.42,1.23-.75,2.27-.51,3.92,1.22Z"/>
                                                        <path className="t-cls-1"
                                                              d="M109.02,52.46c-18.2-6.54-36.45-12.96-54.67-19.46-13.22-4.72-26.44-9.42-39.67-14.09-2.06-.73-4.12-1.46-5.84-2.22,3.87,1.98,7.98,4.61,12.18,7.05,14.94,8.67,29.82,17.42,44.73,26.13,17.49,10.22,34.99,20.42,52.47,30.65,1.13.66,2.43,1.14,3.02,2.48,0,0,0,0,0,0,1.14-.45,1.92.41,2.76.9,8.05,4.65,16.06,9.36,24.33,14.08.17-1.18-.25-2.08-.54-2.97-3.4-10.15-7.01-20.23-10.45-30.36-.62-1.83-1.79-2.85-3.58-3.46-6.05-2.07-12.07-4.23-18.09-6.38-1.25-.45-2.79-.55-3.54-1.91-1.09.37-2.11-.09-3.11-.44Z"/>
                                                        <path className="t-cls-1"
                                                              d="M87.44,10.96c1.97-1.37,4.08-2.5,6.33-3.31,1.21-.44,1.5-1.12,1.01-2.27-.35-.81-.75-1.64-.49-2.55-1.39-.4-2.69-.06-4,.54-2.33,1.08-4.51,2.41-6.54,3.97-.7.54-1.43.97-2.24,1.27,1.43.19,2.35,1.2,3.3,2.12.87.84,1.67.89,2.63.22Z"/>
                                                        <path className="t-cls-1"
                                                              d="M95.86,2.65c.94,3.36,3.11,4.04,6.21,3.02.85-.28,1.82-.02,2.71-.14.84-.11,2.26.75,2.36-.84.09-1.42-.64-2.6-2.29-2.7-1.98-.11-3.91-.68-5.92-.54-.04,0-.09-.01-.13-.02-.97.87-2.48.17-3.55.73.02,0,.04,0,.07,0,.22.13.49.27.55.48Z"/>
                                                        <path className="t-cls-1"
                                                              d="M88.56,82.25c-1.18.31-2.12.72-2.65,1.97-1.03,2.45-3.12,3.39-5.63,3.31-1.57-.05-2.35.24-2.6,2.04-.39,2.84-2.8,4.75-5.63,4.54-1.63-.12-2.58.26-3.43,1.69-1.6,2.68-3.97,4.14-7.84,3.41,2.77,2.37,4.04,5.07,5.6,7.6,2.62,4.25,6.5,6.4,11.63,6.4,13.56.01,21.49-5.5,27.23-19.16.39-.92.77-1.84,1.18-2.75-.07.01-.14.02-.2.04-1.43.07-2.45-.69-3.37-1.65-.03-.03-.05-.07-.07-.1-1.02.87-1.47,2.39-3.27,3.04.76-1.78,1.76-2.93,2.82-4.01-.01-.08-.03-.16-.03-.25.36-2.15,2.04-3.53,3.13-5.25.35-.56.72-1.1,1.09-1.65.97-1.46,1.5-2.99.27-4.55-1.13-1.43-3.34-1.78-5.19-.65-3.13,1.92-5.41,4.8-7.86,7.47-1.1,1.2-1.92,2.69-3.48,3.42-.09,0-.17-.02-.25-.04-1.64,2.61-3.87,4.3-7.01,5.04-3.9.92-7.64,2.35-10.67,5.27.36-1.72,1.72-2.37,2.86-3.19,1.57-1.11,3.34-1.87,5.19-2.29,3.62-.82,6.87-2.19,9.09-5.31,0-.02-.02-.03-.03-.04-.04-1.46,1.08-2.31,1.85-3.29.78-.98.65-1.65-.23-2.26-.5.93-1.61.94-2.52,1.18ZM100.03,79.34c.45-1.74,1.88-2.59,3.44-3,1.91.15,3.17.98,3.52,2.75.25,1.31-1.94,4.09-3.1,4.12-1.02.03-4.11-2.88-3.86-3.87ZM94.01,85.91c1.6,1.07,3.05,2.32,4.38,3.7-.18.22-.35.44-.53.66-1.46-1.25-2.93-2.49-4.39-3.74.18-.21.36-.41.55-.62ZM95.99,91.31c-1.09-.6-2.26-1.12-3-2.79,1.66.68,2.72,1.3,3,2.79Z"/>
                                                        <path className="t-cls-1"
                                                              d="M73.66,30.84c.32-1.53.8-3.04,1.44-4.47.76-1.72.33-2.64-1.49-3.01-.4-.08-.78-.26-1.13-.48-.57-.35-1.22-.74-.83-1.53.31-.64,1.08-.64,1.53-.35,3.47,2.25,4.93-.19,6.49-2.62.93-1.47,2.3-2.59,3.51-3.82.8-.81.81-1.48-.03-2.3-.91-.9-2.14-1.63-2.23-3.13,0,0,0,0,0,0-1.17,1.7-2.28,3.47-4.47,4.05.01.07.02.14.02.22-.37,1.41-1.41,2.41-2.25,3.51-2.89,3.82-4.83,8.06-5.91,12.7-.54,2.28-.27,2.65,1.98,2.86,1.1.11,2.2.25,3.3.42-.47-.65-.07-1.37.07-2.05Z"/>
                                                        <path className="t-cls-2"
                                                              d="M103.85,29.14c3.81-.26,7.53-.7,11.3-1.39,3.58-.65,3.59-.28,7.14-1.11-.35-8.96-8.28-16.32-17.25-15.52-5.33.47-9.95,2.03-13.88,4.67,2.86,4.55,5.72,9.09,8.57,13.64,1.37-.09,2.74-.19,4.11-.28Z"/>
                                                        <path className="t-cls-2"
                                                              d="M89.06,17.38c-2.9,2.41-5.36,5.49-7.37,9.26-.69,1.3-1.25,2.62-1.68,3.97,5.2-.33,11.99-.65,16.75-.98-2.57-4.08-5.13-8.17-7.7-12.25Z"/>
                                                        <path className="t-cls-2"
                                                              d="M104.34,32.11c-.93.06-1.86.13-2.79.19,3.11,4.96,6.21,10.18,10.57,13.68.45.36.6.9.56,1.41,5.54-4.81,9.02-10.54,9.56-17.69-2.94.64-3.26.37-6.66.99-3.75.69-7.45,1.16-11.24,1.42Z"/>
                                                        <path className="t-cls-2"
                                                              d="M121.24,83s0,0,0,0c-.59-1.34-1.89-1.82-3.02-2.48-17.48-10.23-34.98-20.43-52.47-30.65-14.91-8.71-29.79-17.46-44.73-26.13-4.2-2.44-8.31-5.07-12.18-7.05,1.72.76,3.78,1.49,5.84,2.22,13.23,4.67,26.45,9.37,39.67,14.09,18.22,6.5,36.47,12.92,54.67,19.46,1,.35,2.02.81,3.11.44-.05-.09-.11-.17-.15-.27.49-.29.69-.63.14-1.06-.02-.16-.02-.31,0-.44-2.23-.95-2.48-1.09-1.02-2.39-.08-.04-.17-.09-.25-.16-4.55-3.65-7.8-8.91-11.05-14.09-.41-.66-.83-1.31-1.24-1.97-5.58.38-13.43.77-19.28,1.15-.17,1.04-.27,2.11-.27,3.2-.01,2.03-.49,2.21-2.43,1.6-2.17-.68-1.56-2.42-1.73-3.9,0-.03-.01-.06-.02-.09-.15.1-.34.17-.6.2-.11-.51.05-1.11-.41-1.53-.1-.08-.17-.17-.23-.25-1.09-.16-2.2-.31-3.3-.42-2.25-.21-2.52-.58-1.98-2.86,1.08-4.64,3.02-8.88,5.91-12.7.84-1.1,1.88-2.1,2.25-3.51,0-.08,0-.15-.02-.22-.08.02-.14.05-.22.07-.34-.31-.67-.62-1.01-.94,0,0,0,0-.01,0-.91-.04-1.82-.1-2.73-.1H15.38c-4.4,0-8.81-.08-13.21-.06-.74.01-1.9-.5-2.15.57-.2.82.92,1.02,1.52,1.39,2.83,1.72,5.74,3.29,8.41,5.29,14.25,10.73,28.54,21.41,42.81,32.1,6.8,5.1,13.6,10.19,20.43,15.31-.85,1.08-2.04,1.53-2.48,2.67,0,0,0,0,0,0,0,0,0,0,0,0,.15.17.29.34.44.51.02.05.03.1.04.15,2.23-1.97,4.17-1.38,6.22.48,1.77,1.6,3.83,2.89,5.74,4.35.97.74,2.13,1.32,1.97,2.89-.09.85.59.94,1.18.77,1.38-.39,2.28.39,3.22,1.13.24-.1.48-.19.72-.32.34.36.69.72,1.03,1.08-.05.21-.12.39-.2.55.88.61,1.01,1.27.23,2.26-.77.98-1.89,1.83-1.85,3.29,0,.02.02.03.03.04.06-.08.12-.15.18-.24.16.17.32.34.49.51-.04.07-.09.13-.13.2.08.02.16.03.25.04,1.56-.73,2.38-2.22,3.48-3.42,2.45-2.67,4.73-5.55,7.86-7.47,1.85-1.13,4.06-.78,5.19.65,1.23,1.56.7,3.09-.27,4.55-.37.55-.74,1.09-1.09,1.65-1.09,1.72-2.77,3.1-3.13,5.25,0,.09.02.17.03.25.09-.09.17-.18.26-.26.18.32.37.64.55.96-.13.08-.25.18-.37.27.03.03.05.07.07.1.92.96,1.94,1.72,3.37,1.65.07-.02.14-.03.2-.04.07-.15.13-.3.2-.44.51-.71.97-.14,1.44.05,0,0,0,0,0,0,0,0,0,0,0,0,.63-2.1,1.92-3.8,3.3-5.45,1.27-1.51,2.23-3.81,3.82-4.39,1.64-.59,3.28,1.66,5.07,2.38.07.03.16.03.24.04,0,0,0,0,0,0,.2-.14.39-.29.59-.43.05-.03.1-.03.15-.05ZM68.94,33.77c1.07.04,2.12.35,3.18.41,1.18.07,1.66.51,1.21,1.77.23,1.65-.32,2.2-2.01,1.34-.94-.48-1.98-.81-3.01-1.07-1.1-.28-1.16-1.07-1.07-1.91.14-1.33,1.13-.56,1.7-.54ZM74.5,13.26c-.04.32-.03.4-.06.46-1.53,3.46-4.21,3.82-7.67,3.36-5.72-.74-11.47-1.63-17.33-.89,7.12.69,14.23,1.38,21.47,2.08-1.11,2.41-2.21,4.71-3.23,7.04-.43,1-1.07.72-1.83.56-12.73-2.65-25.47-5.27-38.21-7.9-7.1-1.47-14.21-2.94-21.28-4.71h68.14Z"/>
                                                        <path className="t-cls-2"
                                                              d="M105.26,94.05c-5.74,13.65-13.68,19.17-27.23,19.16-5.13,0-9.01-2.15-11.63-6.4-1.56-2.53-2.83-5.23-5.6-7.6,3.86.73,6.24-.73,7.84-3.41.86-1.43,1.8-1.82,3.43-1.69,2.83.21,5.24-1.7,5.63-4.54.25-1.8,1.02-2.09,2.6-2.04,2.51.08,4.59-.86,5.63-3.31.53-1.25,1.47-1.65,2.65-1.97.9-.24,2.01-.26,2.52-1.18-.05-.03-.09-.07-.15-.1-.44-.35-.83-.76-1.28-1.11-.04-.03-.08-.06-.12-.09-2.45.98-4.51.33-6.29-1.88-.88-1.09-1.95-2.03-2.94-3.03-.41-.41-.92-.85-1.51-.36-.58.47-.29,1.07,0,1.57.97,1.66,2.32,3.02,3.67,4.37.82.83,1.77,1.68,1.26,3.01-.57,1.45-1.91,1.72-3.28,1.81-1.41.09-2.6-.37-3.52-1.49-1.05-1.29-2.11-2.56-2.9-4.03-.34-.63-.81-1.57-1.62-1.2-.96.44-.53,1.43-.22,2.19.61,1.47,1.63,2.68,2.53,3.98,1.42,2.06,1.14,5.48-.46,6.6-1.92,1.34-3.85.59-5.74-2.15-1.1-1.59-1.65-3.43-2.48-5.14-.28-.58-.56-1.39-1.38-1.17-1.03.28-.7,1.18-.53,1.88.51,2.12,1.47,4.05,2.61,5.89.81,1.31.92,2.62.16,4-.92,1.68-2.28,2.63-4.24,2.48-1.96-.16-4.02-1.98-4.48-4.15-.38-1.77-.7-3.58-.72-5.41-.03-3.16,1.21-4.61,4.38-4.8,1.46-.09,1.78-.59,1.73-1.97-.15-4.16,1.61-5.94,5.7-5.96.88,0,1.86.04,1.77-1.13-.08-1.19.57-2.32.19-3.5,0,0-.01,0-.02.02-.38-.07-.69-.18-.47-.67-.8.58-1.07,1.46-1.2,2.34-.11.75-.27,1.06-1.16,1.17-3.8.46-6.13,2.78-6.57,6.52-.11.95-.24,1.31-1.3,1.54-2.89.63-4.53,2.29-4.58,5.11-.11,5.76,1.03,11.24,5.28,15.53,1.2,1.21,2.06,2.52,2.76,4.04,2.3,5.01,6.1,8.4,11.66,8.94,9.76.94,18.42-1.57,24.94-9.39,3.53-4.24,5.94-9.1,7.53-14.38-.51.29-1.08.28-1.63.39-.41.91-.79,1.83-1.18,2.75Z"/>
                                                        <path className="t-cls-2"
                                                              d="M90.93,80.96c.05.03.1.07.15.1.09-.16.16-.33.2-.55-.34-.36-.69-.72-1.03-1.08-.25.13-.48.22-.72.32.04.03.08.06.12.09.45.35.84.76,1.28,1.11Z"/>
                                                        <path className="t-cls-2"
                                                              d="M71.18,70.16s.01,0,.02-.02c-.02-.05-.02-.1-.04-.15-.15-.17-.29-.34-.44-.51,0,0,0,0,0,0-.22.49.09.6.47.67Z"/>
                                                        <path className="t-cls-2"
                                                              d="M106.63,90.86c-.07.15-.13.3-.2.44.55-.11,1.13-.1,1.63-.39,0,0,0,0,0,0-.47-.19-.93-.76-1.44-.05Z"/>
                                                        <path className="t-cls-2"
                                                              d="M138.59,63.4c-.58-1.73-1.56-2.74-3.28-3.33-6.72-2.3-13.42-4.69-20.1-7.1-.7-.25-1.68-.16-2.07-1.19,2.69-2.1,5.14-4.45,7.17-7.19,4.88-6.57,7.44-13.76,5.85-22.04-.1.56.03,1.18-.47,1.62-.15-.12-.28-.26-.39-.39-.05.13-.09.27-.14.4-.24.89-.26,1.81-.22,2.72.21,5.43-1.68,10.23-4.49,14.73-1.86,2.98-4.4,5.37-6.87,7.82-.52.51-1.32.88-1.44,1.69.06.03.12.05.18.08.62.51.75,1.04.08,1.61-.09.04-.17.06-.26.09.75,1.36,2.29,1.46,3.54,1.91,6.02,2.15,12.04,4.31,18.09,6.38,1.79.61,2.96,1.63,3.58,3.46,3.44,10.13,7.05,20.21,10.45,30.36.3.89.72,1.79.54,2.97-8.28-4.73-16.29-9.44-24.33-14.08-.84-.49-1.62-1.35-2.76-.9-.07.42-.21.74-.74.49,0,0,0,0,0,0,8.9,5.23,17.8,10.47,26.72,15.68.86.5,1.75,1.54,2.88.53,1-.9.18-1.89-.11-2.75-3.78-11.19-7.64-22.35-11.4-33.54Z"/>
                                                        <path className="t-cls-2"
                                                              d="M121.24,83c-.05.02-.1.03-.15.05-.2.14-.39.29-.59.43.52.26.67-.07.74-.49Z"/>
                                                        <path className="t-cls-2"
                                                              d="M112.13,51.57c.54.43.35.77-.14,1.06.04.1.1.18.15.27.09-.03.17-.05.26-.09.67-.57.54-1.1-.08-1.61-.06-.03-.12-.05-.18-.08-.02.14-.03.28,0,.44Z"/>
                                                        <path className="t-cls-2"
                                                              d="M99.26.81c-.13.27-.29.47-.46.63.04,0,.09,0,.13.02,2.01-.14,3.94.43,5.92.54,1.65.1,2.38,1.28,2.29,2.7-.1,1.59-1.52.73-2.36.84-.89.12-1.86-.14-2.71.14-3.1,1.02-5.27.34-6.21-3.02-.06-.21-.33-.35-.55-.48-.02,0-.04,0-.07,0-.06.03-.11.06-.17.09-.17.22-.34.44-.5.66-.1-.03-.19-.05-.28-.08-.26.9.14,1.73.49,2.55.49,1.15.2,1.83-1.01,2.27-2.25.81-4.36,1.94-6.33,3.31-.96.67-1.76.62-2.63-.22-.95-.92-1.88-1.94-3.3-2.12-.1.04-.21.08-.31.12-.09.13-.18.26-.27.39,0,0,0,0,0,0,.09,1.5,1.32,2.23,2.23,3.13.84.82.83,1.49.03,2.3-1.21,1.23-2.58,2.35-3.51,3.82-1.56,2.43-3.02,4.87-6.49,2.62-.45-.29-1.22-.29-1.53.35-.39.79.26,1.18.83,1.53.35.22.73.4,1.13.48,1.82.37,2.25,1.29,1.49,3.01-.64,1.43-1.12,2.94-1.44,4.47-.14.67-.54,1.4-.07,2.05.13.02.26.03.38.05.63.33.77.92.86,1.53.53-.35.48-1.09.59-1.67.75-4.05,2.43-7.7,4.63-11.16,8.6-13.54,25.12-17.55,38.36-9.47,3.32,2.02,5.22,4.66,5.93,8.37.21,1.09.2,2.31.95,3.23.17-.48.37-.94.86-1.23,0,0,0,0,0,0,0,0,0,0,0,0-.76-10.32-8.06-19.32-17.62-21.62-4.07-.97-8.2-1.18-12.35-.56.94.74,2.08.14,3.08.46ZM121.32,12.17c-3.73-2.49-7.23-4.34-11.18-5.11-.98-.19-.98-.89-1.08-1.66-.14-1.06-.42-2.11-.64-3.15,3.83-.48,11.4,5.11,12.9,9.92Z"/>
                                                        <path className="t-cls-2"
                                                              d="M73.97,32.94c-.13-.02-.26-.04-.38-.05.06.09.14.17.23.25.46.42.3,1.02.41,1.53.26-.02.45-.1.6-.2-.09-.62-.24-1.2-.86-1.53Z"/>
                                                        <path className="t-cls-2"
                                                              d="M125.29,23.77c.11.14.24.27.39.39.5-.44.37-1.06.47-1.62,0,0,0,0,0,0-.49.29-.69.75-.86,1.23Z"/>
                                                        <path className="t-cls-2"
                                                              d="M154.55,47.42c-8.78-3.59-17.56-7.18-26.34-10.76-.11.3-.22.61-.34.91,8.78,3.58,17.55,7.15,26.33,10.73l.35-.87Z"/>
                                                        <path className="t-cls-2"
                                                              d="M144.04,59.78l-.35.78c8.48,3.92,16.97,7.85,25.45,11.77.14-.29.29-.59.43-.88-8.51-3.89-17.02-7.78-25.53-11.67Z"/>
                                                        <path className="t-cls-2"
                                                              d="M76.45,13.18c2.2-.58,3.3-2.35,4.47-4.05.06-.24.2-.42.41-.53.06,0,.12.02.18.03.81-.3,1.55-.73,2.24-1.27,2.03-1.56,4.21-2.89,6.54-3.97,1.31-.61,2.61-.94,4-.54.03-.1.06-.2.1-.29.22-.31.49-.46.85-.38,1.08-.56,2.59.14,3.55-.73-.96-.14-2.18.35-2.62-1.08h0s0,0,0,0c-7.24.67-12.66,4.73-17.78,9.4-1,.91-1.6,2.36-3.18,2.56,0,0,0,0,0,0,.5.18,1.13.22,1.23.87Z"/>
                                                        <path className="t-cls-2"
                                                              d="M76.45,13.18c-.1-.64-.73-.69-1.23-.87.34.31.67.62,1.01.94.08-.02.15-.05.22-.07Z"/>
                                                        <path className="t-cls-2"
                                                              d="M81.17,8.75l.06-.06s-.02.03-.03.05c.11-.03.21-.08.31-.12-.06,0-.11-.02-.18-.03-.21.12-.35.3-.41.53.09-.13.18-.26.27-.39,0,0-.02,0-.03.01Z"/>
                                                        <path className="t-cls-2"
                                                              d="M81.17,8.75s.02,0,.03-.01c.01-.02.02-.03.03-.05l-.06.06Z"/>
                                                        <path className="t-cls-2"
                                                              d="M95.08,2.25c.05-.04.11-.06.17-.09-.36-.08-.64.07-.85.38-.04.1-.07.2-.1.29.09.03.19.05.28.08.17-.22.34-.44.5-.66Z"/>
                                                        <path className="t-cls-2"
                                                              d="M98.8,1.43c.17-.16.33-.36.46-.63-1-.32-2.14.28-3.08-.46h0c.44,1.43,1.65.94,2.62,1.08Z"/>
                                                        <path className="t-cls-2"
                                                              d="M148.09,106.58c-.1,1.92-.54,3.77-1.1,5.59-.56,1.83-1.35,3.53-2.79,4.91-1.59,1.52-3.35.99-5.46.28,2.41,2.57,5.38,2.05,7.37-1.06,2.19-3.43,2.92-7.3,2.99-11.53-1.24.44-.98,1.2-1.01,1.81Z"/>
                                                        <path className="t-cls-2"
                                                              d="M153.2,101.6c2.34,3.68,7.38,6.04,10.71,5.25,1.58-.37,2.97-1.1,2.58-2.99-5.1,5.02-8.85.15-13.29-2.26Z"/>
                                                        <path className="t-cls-2"
                                                              d="M147.72,55.76c.1-.28.2-.56.31-.84-2.86-1.21-5.58-2.77-8.61-3.55-.09.21-.18.42-.26.63,2.86,1.25,5.72,2.51,8.57,3.76Z"/>
                                                        <path className="t-cls-2"
                                                              d="M153.01,108.07c.4,2.3,1.32,4.38,2.63,6.29.2-.09.41-.17.61-.26l-2.62-6.29-.62.26Z"/>
                                                        <path className="t-cls-2"
                                                              d="M80.4,91.96c-1.85.42-3.63,1.17-5.19,2.29-1.15.81-2.5,1.47-2.86,3.19,3.03-2.92,6.77-4.35,10.67-5.27,3.13-.74,5.36-2.43,7.01-5.04-.24-.06-.42-.22-.53-.47-2.23,3.11-5.47,4.48-9.09,5.31Z"/>
                                                        <path className="t-cls-2"
                                                              d="M90.02,87.12c.04-.07.09-.13.13-.2-.16-.17-.32-.34-.49-.51-.06.08-.12.15-.18.24.12.25.29.4.53.47Z"/>
                                                        <path className="t-cls-2"
                                                              d="M102.79,89.59c-.22-.29-.38-.61-.44-.97-1.06,1.08-2.06,2.24-2.82,4.01,1.79-.65,2.25-2.17,3.27-3.04Z"/>
                                                        <path className="t-cls-2"
                                                              d="M103.16,89.32c-.18-.32-.37-.64-.55-.96-.09.09-.17.17-.26.26.06.36.22.68.44.97.12-.1.23-.19.37-.27Z"/>
                                                        <path className="t-cls-2"
                                                              d="M103.89,83.21c1.16-.03,3.35-2.81,3.1-4.12-.35-1.77-1.61-2.6-3.52-2.75-1.56.41-2.99,1.26-3.44,3-.25.99,2.84,3.9,3.86,3.87ZM103.76,77.27c1.19.27,2.37.77,2.25,1.98-.13,1.26-.87,2.84-2.26,2.79-1.26-.04-2.5-1.42-2.54-2.67-.05-1.28,1.37-1.85,2.55-2.1Z"/>
                                                        <path className="t-cls-2"
                                                              d="M98.38,89.61c-1.33-1.38-2.78-2.63-4.38-3.7-.18.21-.36.41-.55.62,1.46,1.25,2.93,2.49,4.39,3.74.18-.22.35-.44.53-.66Z"/>
                                                        <path className="t-cls-2"
                                                              d="M95.99,91.31c-.28-1.5-1.34-2.12-3-2.79.74,1.68,1.91,2.19,3,2.79Z"/>
                                                        <path className="t-cls-2"
                                                              d="M60.84,94.26c.23-2.61,2.1-3.32,4.32-3.65-3.14-1.05-5.19.73-4.32,3.65Z"/>
                                                        <path className="t-cls-2"
                                                              d="M69.8,88.46c.49-2.95,2.14-3.31,4.69-2.21-1.65-1.73-2.69-1.97-3.92-1.22-1.07.65-1.32,1.47-.76,3.42Z"/>
                                                        <path className="t-cls-2"
                                                              d="M78.47,82.64c.66.44.71-.38.92-.76.51-.89,1.64-.46,2.4-.99-1.49-.87-2.34-.78-3.14.25-.37.47-.81,1.08-.18,1.5Z"/>
                                                        <path className="t-cls-3"
                                                              d="M122.24,29.7c.22-.05.46-.1.72-.16,1.58-.37.91-3.26-.66-2.89.04,1.05.02,2.07-.05,3.06Z"/>
                                                        <path className="t-cls-3"
                                                              d="M90.27,14.36c-.96-1.52-3.13-.03-2.16,1.52.32.5.63,1.01.95,1.51.68-.57,1.38-1.1,2.11-1.59l-.9-1.43Z"/>
                                                        <path className="t-cls-3"
                                                              d="M112.68,47.39s-.05.05-.08.07c-.25.21-.51.42-.76.64-.28.24-.52.45-.73.63.79.38,1.48-.44,1.56-1.34Z"/>
                                                        <path className="t-cls-3"
                                                              d="M78.16,30.73c-1.6.11-1.61,3.11,0,3,.37-.03.74-.05,1.13-.08.17-1.04.41-2.05.73-3.05-.64.04-1.27.08-1.86.12Z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                                <p className={`text-sm text-[#707070] mt-3`}>{`Vous êtes sur le point de générer un lien`}</p>
                                                <p className={`text-sm text-[#707070]`}>
                                                    <span>{`de paiement de `}</span>
                                                    <span className={`text-black`}>{`XOF ${formatCFA(amount)}`}</span>{` à `}
                                                    <span>{`créditer `}</span>
                                                </p>
                                                <p className={`text-sm text-[#707070]`}>
                                                    <span>{`sur le compte `}</span>
                                                    <span className={`text-black`}>{`${paymentLink.getValues('accountCoreBankId')}`}</span>
                                                </p>
                                            </div>
                                    </div>
                                </div>

                                {/*step 3*/}
                                <div className={`${step == 3 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                            <div className={`flex flex-col items-center`}>
                                                <svg className={`w-32 h-auto`} viewBox="0 0 136.22 124.183">
                                                    <defs>
                                                        <clipPath id="clip-pathConfirm">
                                                            <rect width="136.22" height="124.183" fill="none"/>
                                                        </clipPath>
                                                    </defs>
                                                    <g clipPath="url(#clip-pathConfirm)">
                                                        <path d="M97.532,86.1c-1.421,4.278-2.629,8.42-4.166,12.437A69.633,69.633,0,0,1,80.3,119.66a10.445,10.445,0,0,1-3.626,2.162c-1.081.485-2.349.549-3.438,1.021-6.519,2.83-12.716.578-18.852-1.291-19.568-5.962-33.239-18.8-42.27-36.849C5.49,71.459,2.122,57.253.061,42.682c-.342-2.421.761-3.845,2.78-4.979,6.792-3.813,12.242-8.948,15.4-16.215A32.587,32.587,0,0,0,20.928,8.079c-.031-3.848.755-4.684,4.434-5.64A68.7,68.7,0,0,1,45.475.1c5.989.235,12,.01,18-.1a4.649,4.649,0,0,1,4.843,3.015c3.7,8.112,9.23,14.388,17.859,17.6a5.214,5.214,0,0,1,2.592,3c2.585,7.822,4.977,15.707,7.431,23.572.149.477.3.954.48,1.544,2.9-3.754,3.743-4.1,8.212-3.526a38.344,38.344,0,0,1-2.337-4.068c-.717-1.662-.816-3.436.717-4.791,1.517-1.341,3.266-.873,4.641.069,3.678,2.517,7.366,5.059,10.774,7.919,7.571,6.353,13.717,13.8,16.451,23.545,1.661,5.919,1.727,11.763-2.024,17.032-3.858,5.419-9.537,6.733-15.731,6.357A52.841,52.841,0,0,1,97.532,86.1M87.267,35.012c-.9-2.5-1.864-5.388-3.017-8.2a3.812,3.812,0,0,0-1.829-1.725A38.266,38.266,0,0,1,65.337,8.818,4.607,4.607,0,0,0,60.775,6.28c-4.931.11-9.863.119-14.8.154-3.3.024-4.06.616-4.584,3.942a39.056,39.056,0,0,1-16.661,26.67c-2.548,1.808-3.325,3.6-2.748,6.673,2.468,13.161,6.031,25.912,12.873,37.56Q48.5,104.5,74.763,110.486c1.818.418,3.353.351,4.61-1.338A66.781,66.781,0,0,0,90.8,85.813c.753-2.929.731-2.934-2.382-4.1-3.124,4.041-7.654,5.7-12.455,6.861-1.812.44-3.634.862-5.406,1.429-6.711,2.149-12.741.669-18.316-3.326-13.734-9.84-20.005-31.82-13.5-47.4,2.494-5.979,6.386-10.6,12.832-12.527,3.251-.969,6.577-1.686,9.835-2.635a18.112,18.112,0,0,1,16.015,2.541c3.563,2.478,6.667,5.616,9.852,8.355m1.765,44.542c.972-1.472,2.8-2.4,1.307-3.877a15.451,15.451,0,0,0-4.269-2.885,2.208,2.208,0,0,0-2.645,3.157,8.82,8.82,0,0,0,2.6,2.89c9.006,6.231,18.841,10.458,29.806,11.638,4.916.529,9.8.156,13.892-3.073,5.444-4.3,6.569-10.224,5.313-16.576C132.165,56.31,122,47.259,111.076,39.234c-.3,1.075-.285,2.382-.931,2.983-.817.763-4.615-1.028-5.142-2.613-.268-.8.677-2.01,1.07-3.028-1.868-.683-3.346.27-3.193,2.609a7.926,7.926,0,0,0,3.935,6.408A38.249,38.249,0,0,1,118.912,57a10.059,10.059,0,0,0,1.795,1.515L119.17,60.5a10.139,10.139,0,0,0-.726-2.79,28.755,28.755,0,0,0-9.688-9.908,18.17,18.17,0,0,0-7.133-1.943c-2.161-.219-3.428,1.342-3.644,3.481,1.578.731,3.174,1.4,4.707,2.192,4.588,2.365,8.543,5.357,10.706,10.306a1.774,1.774,0,0,1-.655,2.545,18.641,18.641,0,0,0-.753-3.663,11.725,11.725,0,0,0-2.029-2.942c-3.408-3.97-8.084-5.967-12.74-7.937a6.747,6.747,0,0,0-3.776-.673,3.551,3.551,0,0,0-2.075,2.413c-.186.918.312,2.64,1,2.963a37.926,37.926,0,0,1,13.1,10.251,8,8,0,0,0,1.878,1.17l-1.178,1.517a14.7,14.7,0,0,0-1.113-2.018,35.9,35.9,0,0,0-10.921-9.212c-.407-.224-1.039-.683-1.232-.549-1.35.932-1.762-.413-2.468-.941C88.764,53.509,87.139,52.2,85.5,50.92c.247,1.047.928,1.769,1.1,2.6a3.33,3.33,0,0,1-.389,2.528,2.59,2.59,0,0,1-2.349.429C80.14,55,79.746,54.057,82,51.053l.664-.882-.351-.646c-1.113.5-2.654.713-3.223,1.571a4.361,4.361,0,0,0-.32,3.673,12.161,12.161,0,0,0,3.366,4.1c5.415,4.318,11.089,8.319,16.4,12.76,2.944,2.463,6.133,2.876,9.649,2.727a11.056,11.056,0,0,1,1.34.1,3.212,3.212,0,0,1-2.105.623A37.621,37.621,0,0,1,88,69.2c-1.429-.887-2.926-1.779-4.585-.446a4.859,4.859,0,0,0-1.238,5.252c2.062-2.629,3.292-2.792,6.147-.811.6.418,1.211.828,1.785,1.281,2.151,1.7,1.918,3.553-1.072,5.075M32.1,1.765c-2.489.518-4.7.954-6.895,1.44-2.909.645-3.551,1.408-3.538,4.365.056,12.879-5.484,22.8-16.4,29.379-3.791,2.285-4.834,4.561-4.1,8.806,2.458,14.24,5.984,28.1,12.881,40.915,5.814,10.8,13.589,19.858,23.974,26.545.522.336,1.276.841,1.717.687,2.714-.951,5.37-2.07,8.322-3.243C31.585,99.879,22.507,84.1,16.614,66.107l-7.2,2.178c-.057-.178-.113-.356-.17-.534l6.783-2.307c-1.87-8.755-3.708-17.358-5.547-25.973L3.028,40q-.019-.309-.037-.62c2.094-.189,4.19-.348,6.278-.589.533-.061,1.416-.29,1.49-.6.5-2.053,2.25-2.683,3.77-3.6,8.539-5.154,14.581-12.212,16.484-22.224.641-3.37.72-6.848,1.088-10.6m53.289,77.5c-2.384.942-4.4,2.117-6.55,2.513-5.4.991-9.778-1.423-13.516-5-6.6-6.308-9.827-14.282-10.841-23.2-.745-6.552-.091-12.914,3.527-18.653,3.874-6.146,10.495-8.011,17.035-4.855A21.823,21.823,0,0,1,84.4,38.556c2.361,3.94,4.217,8.183,6.173,12.055l1.746-2.356A37.786,37.786,0,0,0,80.459,29.627c-4.633-3.877-9.867-6.521-16.117-5.539-7.932,1.247-12.464,6.659-14.933,13.743-4.028,11.559-2.157,22.731,3.383,33.373,3.368,6.469,8.09,11.719,14.949,14.693,7.3,3.165,15.664,1.19,20.1-4.787l-2.454-1.846m-26.944.974A43.559,43.559,0,0,1,48.9,64.394l-7.763,1.56c-.037-.185-.075-.369-.113-.555l7.643-1.8a44.15,44.15,0,0,1-.909-23.183c-2.807.545-5.266,1.064-7.741,1.484a2.226,2.226,0,0,0-2.023,2.007,39,39,0,0,0-.7,14.475C38.553,67.6,42.047,75.8,48.561,82.574c.4.413,1.171.942,1.562.809,2.688-.912,5.322-1.986,8.324-3.144m7.583-35.711a7.062,7.062,0,0,0,2.617,5.877,4.649,4.649,0,0,1,1.454,2.4c.989,5.22,1.846,10.466,2.733,15.705.215,1.27.759,2.267,2.212,1.893,2.507-.647,5-1.393,7.432-2.262A1.943,1.943,0,0,0,83.41,66.5c-1.124-2.964-2.033-6.12-3.764-8.715a11.9,11.9,0,0,1-1.814-10.2,6.2,6.2,0,0,0-1.95-6.5,5.773,5.773,0,0,0-6.662-1.13,5.152,5.152,0,0,0-3.193,4.58M40.114,114.435c.792.475,1.283.789,1.793,1.072a70.788,70.788,0,0,0,21.182,7.5,13.121,13.121,0,0,0,4.508.5c2.863-.5,5.65-1.446,8.468-2.208-9.736-1.928-18.963-5.015-27.142-10.131l-8.808,3.262M73.271,88.343c-.045-.186-.091-.372-.137-.557L67.41,89.38l-.127-.338L69.6,87.916c-3.149-2.038-6.46-4.194-9.791-6.318-.407-.26-1.007-.609-1.372-.485-2.666.907-5.294,1.925-8.04,2.947,6.748,6.434,14.49,7.741,22.878,4.284M38.746,41.432c3-.589,5.66-1.083,8.3-1.661a1.892,1.892,0,0,0,1.161-.874c1.465-3.008,2.857-6.052,4.269-9.08l-3.938.9c2.5-1.833,6.167-1.3,7.934-4.36-9.057,1.118-14.753,6.242-17.731,15.08m43.883,9.39c-.4,1.282-1.354,2.819-.947,3.4.638.9,2.175,1.228,3.387,1.625.2.066.982-.734,1-1.151.07-1.944-1.245-2.914-3.438-3.871m22.644-12.374.013.854c1.221.748,2.41,1.56,3.688,2.2.3.148.891-.306,1.349-.483a20.677,20.677,0,0,0-2.783-3.177c-.367-.29-1.489.379-2.267.609M92.98,70.963c1.476-2.419-.494-2.969-1.857-3.93-.913,2.826-.913,2.826,1.857,3.93" transform="translate(0 0)"/>
                                                        <path d="M150.994,31.111l-3.911,7.936a7.439,7.439,0,0,0-5.867-4.952c3.253-2.251,3.46-5.377,3.479-8.788.685,3.719,3.544,4.87,6.3,5.8m-5.607-2.14-2.117,4.743,3.789,3.095,2.828-5.126-4.5-2.712" transform="translate(-37.908 -6.794)"/>
                                                        <path d="M128.129,151.191a61.57,61.57,0,0,0,6.226-19.981,37.772,37.772,0,0,1-6.226,19.981" transform="translate(-34.395 -35.222)"/>
                                                        <path d="M175.386,54.476l-2.266,4.549L169.7,55.96c.6-1.7,1.249-3.541,1.777-5.039l3.909,3.555m-3.5-1.484-1.258,2.735,2.179,1.693,1.707-2.933-2.629-1.5" transform="translate(-45.554 -13.669)"/>
                                                        <path d="M157.765,144.113c-3.28-1.177-8.892-8.958-8.782-13.153A73.223,73.223,0,0,0,152.9,138.3a62.58,62.58,0,0,0,4.868,5.812" transform="translate(-39.992 -35.155)"/>
                                                        <path d="M136.707,31.968l-3.727-4.724.48-.388,3.779,4.662-.532.451" transform="translate(-35.697 -7.209)"/>
                                                        <path d="M153.935,24.877l2.8-5.16.568.3-2.8,5.153-.571-.293" transform="translate(-41.322 -5.293)"/>
                                                        <path d="M108.126,132.169l6.725-9.686a23.116,23.116,0,0,1-6.725,9.686" transform="translate(-29.025 -32.879)"/>
                                                        <path d="M87.743,23l-5.684-7.922.552-.394,5.67,7.932L87.743,23" transform="translate(-22.028 -3.94)"/>
                                                        <path d="M37.865,129.158l-6.983,2.165c-.067-.213-.135-.427-.2-.64l6.978-2.182q.1.328.208.656" transform="translate(-8.236 -34.495)"/>
                                                    </g>
                                                </svg>
                                                <p className={`text-sm text-[#707070] mt-3`}>{`Entrez votre clé d'accès pour valider l'envoi`}</p>

                                                <div className={`w-full mt-12`}>
                                                    <div className={`relative`}>
                                                        <Input className={`font-normal text-sm ${showConError && "border-[#e95d5d]"}`} type={showPassword ? 'text' : 'password'}
                                                               placeholder="Clé d'accès" onChange={(e) => {setAccessKey(e.target.value)}} style={{
                                                            backgroundColor: accessKey != '' ? '#fff' : '#f0f0f0',
                                                        }} />
                                                        <svg onClick={handleTogglePassword} className={`h-6 w-6 cursor-pointer ${showPassword ? 'fill-[#414141]' : 'fill-[#c1c1c1]'}  absolute top-4 right-4`} viewBox="0 0 28.065 19.104">
                                                            <g transform="translate(0.325) rotate(1)">
                                                                <path d="M0,0H18.622V18.622H0Z" transform="translate(0.539)" fill="none"/>
                                                                <g transform="matrix(1, -0.017, 0.017, 1, 5.314, 18.08)">
                                                                    <path d="M0,0H0Z" transform="translate(0 -3.249)" fill="none"/>
                                                                    <path d="M12.917,15.748a5.622,5.622,0,1,0,0,3.748h4.076v3.748h3.748V19.5h1.874V15.748ZM7.622,19.5A1.874,1.874,0,1,1,9.5,17.622,1.874,1.874,0,0,1,7.622,19.5Z" transform="translate(-7.063 -26.436)"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        {
                                                            showConError && 
                                                            <div>
                                                                <span className={`text-xs text-[#e95d5d] mt-1 hover:font-medium duration-200`}>{errorMessage}</span>
                                                            </div>
                                                        }
                                                        <Link className={`text-xs mt-2 hover:font-medium duration-200`} href={`#`}>{`J'ai perdu ma clé`}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                                {/*step 4*/}
                                <div className={`${step == 4 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                        <div className={`flex flex-col items-center`}>
                                                <span className="relative flex w-40 h-40">
                                                  <span
                                                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>
                                                  <span
                                                      className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>
                                                </span>
                                            <p className={`text-base mt-10 text-center text-[#707070]`}>Votre lien de paiement est généré avec succès!</p>
                                        <p className={`text-base text-center text-black`}>Envoyez le à votre destinataire pour vous faire payer {formatCFA(amount)} XOF</p>
                                        
                                        <FormItem>
                                            <FormControl>
                                                <div className={`relative`}>
                                                    <Input type={`text`} className={`font-light mt-6 px-3 text-xs min-w-[30rem] h-[2rem] border-black`}
                                                        placeholder="Écrivez votre message" disabled style={{
                                                        backgroundColor: 'white',
                                                    }} value={paymentLinkToShare}/>
                                                    <button className={`absolute top-2 right-3`} onClick={() => copyPaymentLink()}>
                                                        <Copy className={`h-[1.1rem] text-black `} />
                                                    </button>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                        
                                        </div>
                                    </div>
                                </div>


                                <div className={`flex justify-center items-center mb-3`}>
                                    <Button onClick={() => prevStep()} className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${step == 1 || step == 4 || confirmStep != 0 ? 'hidden' : 'block'}`}>
                                        Retour
                                    </Button>
                                    <Button onClick={handleSubmit((data) => addNewBeneficiary(data))} className={`mt-5 w-42 text-sm ${(step == 1 && displayBeneficiaryForm) ? 'block' : 'hidden'}`}>
                                        Ajouter destinataire
                                    </Button>
                                    <Button onClick={() => nextStep()} className={`mt-5 w-36 text-sm ${(step == 2 ) ? 'block' : 'hidden'}`}>
                                        Continuer
                                    </Button>
                                    <Button onClick={() => {
                                        sendPaymentLinkToRecipient();
                                    }} className={`mt-5 w-[30%] text-sm ${step == 3 ? 'block' : 'hidden'}`}>
                                        {`Valider`}
                                    </Button>
                                    <Button onClick={() => {setStep(1); setPercentage('w-1/4'); resetSendPaymentLink();}} className={`mt-3 w-48 text-sm ${step == 4 ? 'block' : 'hidden'}`}>
                                        {`Terminer`}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
    );
}