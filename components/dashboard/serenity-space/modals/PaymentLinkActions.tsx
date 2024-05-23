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
import { Banknote, ClipboardList, Goal, Pencil, Search, SquarePen, Trash2, X } from "lucide-react";
import { ScaleLoader } from "react-spinners";
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
    const [paymentLinkToShare, setPaymentLinkToShare] = useState('');
    const [isSendLoading, setIsSendLoading] = useState(false);

    const formSchema = z.object({
        lastName: z.string().min(2, {message: 'veuillez saisir votre nom'}),
        firstName: z.string().min(2, {message: 'veuillez saisir votre prénoms'}),
        email: z.string().email({message: 'veuillez saisir votre email'}),
        beneficiary: z.string(),
    })

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const paymentLinkForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            email: "",
            beneficiary: "",
        }
    });

    const { handleSubmit, formState: {errors}, setValue } = paymentLinkForm;

    function initPaymentLinkPayloadParams() {
        setAmount(paymentLink.getValues('amount'));
        setAccount(paymentLink.getValues('accountNumber'));
        setBankAccountId(paymentLink.getValues('accountNumber'));
    }

    // function updateFormValue(value: any) {
    //     if (step == 1) {
    //         initPaymentLinkPayloadParams();
    //         setBeneficiary(value)
    //         setStep(2);
    //         setPercentage('w-2/4');
    //     } else if (step == 2) {
    //         setStep(3);
    //         setPercentage('w-3/4');
    //     }
    // }

    function nextStep() {
        if (step < 3) {
            setStep(step + 1);

            if (step + 1 == 2) {
                setPercentage('w-2/3');
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
                setPercentage('w-1/3');
            } else if (step - 1 == 2) {
                setPercentage('w-2/3');
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
        paymentLink.setValue('amount', '');
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
        setPercentage('w-1/3')
        setErrorMessage('')
        setConfirmStep(0)
        setShowPassword(false)
        setAccessKey('')
        setBankAccountId('')
    }

    const sendPaymentLinkToRecipient = async () => {
        // @ts-ignore
        setIsSendLoading(true);
        const payload = {
            bankAccountId: !bankAccountId ? accounts[0].id : bankAccountId,
            firstName: beneficiary?.firstName ?? '',
            lastName: beneficiary?.lastName ?? '',
            phoneNumber: '',
            email: beneficiary.email ?? '',
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
                    setStep(3);
                    setPercentage('w-full');
                    setPaymentLinkToShare(data.data);

                    setIsSendLoading(false);
                } else {
                    setIsSendLoading(false);
                    return toast.error(data.message, {
                        className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                    });
                }
            })
            .catch(() => {
                setIsSendLoading(false);
                return toast.error('Une erreur est survénue', {
                    className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                });
            });
        } else {
            setIsSendLoading(false);
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

    }, [amount, payFees, paymentLink, step]);

    return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={() => {initPaymentLinkPayloadParams()}} className={`absolute rounded-lg p-3 top-0 right-0`} disabled={paymentLink.getValues('amount') == ''}>
                        <Send className={`h-[1.1rem] text-[#fff] `} />
                    </Button>
                </DialogTrigger>
                <DialogContent className={`sm:max-w-[40rem] overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
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
                        <Form {...paymentLinkForm}>
                            <div className={`mt-4`}>
                                {/*Step 1*/}
                                <div className={`${step == 1 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                        <div className={`flex flex-col items-center`}>
                                            <svg  className={`w-36 h-auto mt-2`} viewBox="0 0 167.276 160.226">
                                                <defs>
                                                    <clipPath id="clip-pathPLink">
                                                        <rect width="167.276" height="160.226" fill="none"/>
                                                    </clipPath>
                                                </defs>
                                                <g clipPath="url(#clip-pathPLink)">
                                                    <path
                                                          d="M93.806,134.167c.563-10.172,1.685-20.223,7.544-29.039a5.358,5.358,0,0,0,.666-1.83c1.433-6.7,4.687-12.517,8.767-17.9,9.226-12.18,21.116-21.352,33.832-29.54,1.736-1.118,2.7-2.021,1.783-4.2a12.439,12.439,0,0,1-.613-5.084c-.6-8.107,5.772-15.286,12.454-18,6.2-2.519,12.8-.725,17.98,4.815,5.815,6.222,7.265,15.393,3.571,22.25a17.686,17.686,0,0,1-20.3,8.561c-1.886-.528-1.66.66-1.718,1.64-.126,2.137-.259,4.05-2.258,5.624-3.4,2.675-6.574,5.654-9.7,8.655-5.253,5.045-10.425,10.176-14.317,16.417-.688,1.1-1.175,1.779.683,2.339a6.213,6.213,0,0,1,3.99,4.369c.325,1.031.656,1.276,1.862,1,3.189-.727,6.834,1.547,6.688,4.739-.149,3.257,1.161,4.712,3.546,6.45,2.774,2.022,2.54,2.366,5.208-.192a33.75,33.75,0,0,0,2.357-2.5c6.315-7.43,10.639-16.055,14.722-24.8,1.438-3.08,2.936-5.88,6.074-7.67,1.3-.739,2.264-1.087,3.579-.5,2.242.992,4.459,2.049,6.747,2.925s2.685,2.3,1.838,4.452c-1.288,3.265-2.378,6.609-3.7,9.86-5.341,13.133-11.266,25.951-20.752,36.745-4.712,5.361-10.145,9.767-17.094,11.889a6.808,6.808,0,0,0-3.648,2.6A52.4,52.4,0,0,1,122.6,164.733a18.771,18.771,0,0,1-12.454,1.4c-7.939-2.083-12.524-7.623-14.907-15.191-1.722-5.47-1.745-11.128-1.433-16.771m53.734-81.4c.248.458.434.823,1.094.522.62-.283.911-.6.657-1.288a17.918,17.918,0,0,1-1-4.744c-.28-3.468.54-6.757,1.479-10.112-3.163,3.323-4.289,11.829-2.229,15.623m29.792-16.507c-3.046-4.542-7.228-7.591-12.912-7.879a13.794,13.794,0,0,0-12.393,5.755,19.272,19.272,0,0,0-2.738,9.275q-.069,1.1-.141,2.2A14.813,14.813,0,0,0,161.673,61.3c7.605,1.186,14.726-4.2,17.733-11.747,2.118-5.316.627-9.271-2.073-13.3m-10.618,26.57c.312,1.175,1.331.706,2.051.5a16.682,16.682,0,0,0,9.494-6.935,12.8,12.8,0,0,0,2.387-7.974,19.815,19.815,0,0,1-7.826,11.2,21.411,21.411,0,0,1-4.643,2.184c-.546.2-1.806-.258-1.463,1.031m-1.465,1.085c.3-.092.686-.093.591-.536-.126-.587-.43-1.066-1.129-1.031a22.543,22.543,0,0,1-7.668-1.4c1.453,2.314,5.671,3.752,8.206,2.968M147.589,71.9c.432-.336.833-.614,1.2-.935,2.5-2.217,4.971-4.475,7.513-6.649.964-.824,1.031-1.426.153-2.384-2.093-2.283-4.116-4.633-6.1-7.012a1.429,1.429,0,0,0-2.259-.325c-2.833,1.923-5.718,3.77-8.571,5.664-.579.385-1.38.689-.567,1.647,2.642,3.106,5.237,6.252,7.863,9.372a5.152,5.152,0,0,0,.773.621m1.969,49.772c-.911.115-1.011.65-1.332,1.07a20.384,20.384,0,0,1-5.363,5.272c1.241-3.046,5.614-4.453,5.084-8.769,1.241.2,1.34-.759.7-2a4.593,4.593,0,0,0-3.523-2.757c-1.42-.147-2.319.833-3.111,2.072a41.381,41.381,0,0,1-7.637,9.057c-.536-1.088.36-1.41.767-1.843a52.6,52.6,0,0,0,6.4-8.047c.456-.728,1.609-1.413.532-2.528-.095-.1.058-.61.066-.61,3.085.285,1.831-2.042,1.8-3.29a4.484,4.484,0,0,0-2.917-3.929c-2.1-.97-3.578-.328-5.528,2.434a94.04,94.04,0,0,1-7.488,9.385c-.591.643-1.055,1.464-2.207,1.5,2.927-3.6,6.006-7.058,8.57-10.916.359-.54,1.049-1.508.941-1.612-1.235-1.19.866-2.666-.485-3.918a15.69,15.69,0,0,0-2.665-2.475,1.726,1.726,0,0,0-2.26.055c-3.6,3.539-7.989,6.291-10.726,10.7a16.628,16.628,0,0,0-2.276,4.851c-.8,3.37.9,5.312,4.5,5.013,1.107-.092,1.4,0,1.275,1.214-.488,4.763,2.122,7.221,6.86,6.59.31-.041.618-.1,1.258-.207-1.063,2.266-.839,3.956,1.657,4.619,1.9.5,3.7-.026,5.9-.875-1.469,3.055.26,3.877,2.384,4.49a7.843,7.843,0,0,0,3.155.257c4.9-.591,10.271-6.688,9.908-11.236-.209-2.61-1.911-3.853-4.24-3.557m35.231-26.336c1.111-2.971,2.2-5.952,3.308-8.923a1.831,1.831,0,0,0-1.134-2.72q-3.616-1.482-7.159-3.143a1.757,1.757,0,0,0-2.733.988c-1.285,2.812-2.624,5.6-3.949,8.391-.313.66-.792,1.311.244,1.789q4.99,2.3,9.974,4.612c.148.068.3.119.5.192.724-.037.767-.691.953-1.186m-24.633,41.426c7.88-7.4,13.251-16.56,17.984-26.125,1.845-3.728,3.366-7.615,5.121-11.39.577-1.239.382-1.867-.894-2.418-2.775-1.2-5.546-2.424-8.214-3.837-1.6-.849-2.337-.62-3.141,1.045a143.118,143.118,0,0,1-9.127,16.23,59.663,59.663,0,0,1-7.894,9.994c-.716.7-1.175,1.232-.287,2.194a4.922,4.922,0,0,1,1.024,3.681c-.2,6.159-8.15,12.383-14.022,10.973-1.058-.254-2.322-.53-2.766-1.425-1.075-2.166-2.77-2.222-4.784-2.083-1.36.094-3.035-.538-3.265-1.734-.482-2.5-2.214-2.492-4.033-3.052a5.8,5.8,0,0,1-4.23-5.959c.007-1.252-.327-1.4-1.441-1.51-3.321-.335-4.994-2.841-4.193-6.089a14.853,14.853,0,0,1,.839-2.3c6.475-15,15.532-28.131,28.223-38.577,1.623-1.336,1.586-2.17.225-3.638-2.334-2.516-4.466-5.22-6.643-7.878-.65-.793-1.157-1.22-2.19-.456-11.375,8.424-22.026,17.547-29.238,30.011a39.826,39.826,0,0,0-4.236,10.527c3.919-1.8,6.236-1,7.982,2.528,2.223,4.485,1.285,8.763-1.124,12.83-.742,1.254-.969,2.053.051,3.392,2.09,2.744,2.709,6.073,2.828,9.481.031.885-.114,1.786.656,2.512,7.665,7.221,16.26,12.456,27.229,12.2,7.794-.183,14.051-3.958,19.557-9.128m-41.48,28.3c10.365-2.907,18.155-9.578,25.153-18.489-7.963.967-14.526-1.019-21.084-4.634-.083,3.693,1.4,6.644,2.786,9.908-1.353-.956-1.349-.958-1.9-2.211a20.779,20.779,0,0,1-1.876-7.058,1.992,1.992,0,0,0-1.209-1.956c-.958-.359-1.19.621-1.652,1.121-.529.571-.777,1.413-1.573,1.774-.127-.226-.277-.368-.253-.468.329-1.314,2.273-2.139,1.713-3.464-.447-1.054-1.925-1.684-2.969-2.471-1.026-.774-1.761-1.919-3.1-2.471-2.086,8.854-7.211,14.582-16.336,16.382,2.011,9.964,12.432,16.8,22.3,14.036M95.311,146.864c.538,2.817,1.609,3.394,4.306,2.443,11.417-4.024,16-18.363,8.851-28-.925-1.247-.315-1.883.2-2.744,1.922-3.225,3.376-6.561,2.312-10.426a11.621,11.621,0,0,0-1.212-2.921c-1.925-3.174-4.505-3.4-6.915-.547-3.811,4.515-5.385,10.016-6.537,15.646a73.7,73.7,0,0,0-1.61,16.544,50.723,50.723,0,0,0,.607,10.01"
                                                          transform="translate(-93.652 -6.425)"/>
                                                    <path
                                                          d="M22.44,66.8c11.839-.516,22.852,9.912,22.851,20.7,0,12.305-11.588,23.769-24.046,23.791C9.479,111.31-.045,101.423,0,89.234.263,75.123,9.241,67.374,22.44,66.8M1.808,85.574a5.874,5.874,0,0,0,2.3-3.179A16.44,16.44,0,0,1,7.8,76.33c-3.829,0-7.062,5.113-5.991,9.244M8.915,72.147a9.188,9.188,0,0,0-3.367,3.338A12.453,12.453,0,0,0,11.3,73.5c4.459-3.265,9.665-4.194,15.105-4.046,1.618.044,3.246.526,4.853-.082-7.944-3.055-15.38-1.972-22.346,2.777m-4.95,28.472c6.649,11.116,22.235,13.021,32.163,3.887,5.156-4.744,8.389-10.461,8.227-17.648-.173-7.735-4.841-12.53-11.047-16.226-.688-.409-1.362-.84-2.043-1.26.09,1.6-1.012,1.353-1.959,1.2a25.738,25.738,0,0,0-9.512.264C9.067,73.06,2.6,81.583,3.964,91.616c1.322,9.73,10.529,17.011,20.9,16.541a4.05,4.05,0,0,1,2.764.3,12.463,12.463,0,0,1-6.451.381A21.094,21.094,0,0,1,5.836,99.313c-.365-.553-.355-2.1-1.758-1.2-1.174.747-.651,1.612-.113,2.512M2.656,97.858c1.439-.554,1.887-1.417,1.282-2.967a17.028,17.028,0,0,1-.974-7.2c.051-.92.412-2.124-1.317-1.553a.362.362,0,0,1-.086-.155c-1.3,2.13-.6,4.489-.434,6.728a12.185,12.185,0,0,0,1.527,5.15"
                                                          transform="translate(121.985 -15.63)"/>
                                                    <path
                                                          d="M60.734,14.859c9.859.113,17.008,6.483,17.049,15.217.046,10.072-7.866,18.643-17.242,18.676-9.559.034-16.663-7.362-16.672-17.36-.738-9.01,8.814-16.626,16.866-16.533m12.573,26.1A18.276,18.276,0,0,0,76.871,29.48c-.216-6.315-4.6-11.237-11.347-13.1-1.923-.529-3.279.627-4.873.968-6.088,1.305-10.941,4.43-13.06,10.6-3.077,8.957,4.087,17.9,14.62,17.822,1.352.021,3.121-.882,4.8-.846,3.188.067,4.771-1.826,6.3-3.963m-23.176,3.1c3.958,4.207,12.445,5.109,17.41,1.734-6.122,1.755-11.709,1.178-16.6-3.108-.381-.334-.749-.672-1.2-.07-.493.659-.008,1.026.387,1.445m-4.993-8.674A16.187,16.187,0,0,0,48.013,41.7c.218.273.453.769.924.29.294-.3.548-.687.271-1.087a16.229,16.229,0,0,1-2.823-6.186c-.083-.434-.313-.47-.686-.349-.467.151-.649.446-.561,1.017m.194-2.081c1.01-2.185.709-4.715,1.963-7.175-2.542,1.372-3.1,3.5-1.963,7.175M61.15,16.235c-5.263-1.183-12.7,3.337-14.853,9.232,4.379-4.02,8.468-8.458,14.853-9.232"
                                                          transform="translate(55.923 -3.477)"/>
                                                    <path
                                                          d="M63.093,117.222c-.879,5.952,3.579,8.3,7.535,11.2-4.391,2.112-6.82,5.453-8.539,9.608a11.993,11.993,0,0,0-7.163-9.38c5.882-2.073,6.8-6.779,8.167-11.425m-5.91,11.527a12.791,12.791,0,0,1,5.118,6.768,17.068,17.068,0,0,1,6.612-7.183c-2.393-1.815-4.815-3.405-6.14-6.392-1.577,2.63-2.664,5.423-5.591,6.807"
                                                          transform="translate(54.577 -27.435)"/>
                                                    <path
                                                          d="M86.789,0c-.61,3.843,2.486,5.146,4.814,7.153a11.687,11.687,0,0,0-5.51,6.237,8.794,8.794,0,0,0-4.681-6.149c3.579-1.3,4.219-4.3,5.376-7.241M86.3,10.894a15.42,15.42,0,0,1,3.333-3.578L86.262,3.824c-.611,1.238-2.187,2.311-2.374,3.513-.155,1,1.478,2.274,2.414,3.556"
                                                          transform="translate(13.314)"/>
                                                    <path
                                                          d="M31.989,45.577c-3.543-3.286-6.866-6.822-12-7.614,4.083-.43,10.076,3.4,12,7.614"
                                                          transform="translate(119.979 -8.877)"/>
                                                    <path
                                                          d="M75.862,78.733c-5.713.359-10.186,2.358-13.813,6.814,1.019-4.316,9.307-8.4,13.813-6.814"
                                                          transform="translate(43.887 -18.345)"/>
                                                    <path
                                                          d="M104.806,65.734a52.671,52.671,0,0,0-11.465,6.425,19.381,19.381,0,0,1,11.465-6.425"
                                                          transform="translate(-9.025 -15.384)"/>
                                                    <path
                                                          d="M156.224,33.389l.743-.324q2.127,4.849,4.254,9.7l-.79.354-4.207-9.725"
                                                          transform="translate(-113.606 -7.739)"/>
                                                    <path
                                                          d="M103.574,28.475a30.573,30.573,0,0,0-7.012,2.941,7.8,7.8,0,0,1,7.012-2.941"
                                                          transform="translate(-10.26 -6.654)"/>
                                                    <path
                                                          d="M157.939,52.5a11.746,11.746,0,0,1,6.131.9,11.624,11.624,0,0,1-6.131-.9"
                                                          transform="translate(-117.769 -12.269)"/>
                                                    <path
                                                          d="M182.348,91.22a73.8,73.8,0,0,0-15.423,19.271A45.008,45.008,0,0,1,182.348,91.22"
                                                          transform="translate(-142.929 -21.349)"/>
                                                    <path
                                                          d="M111.489,146.506a90.285,90.285,0,0,0,10.731-16.78,39.689,39.689,0,0,1-10.731,16.78"
                                                          transform="translate(-40.34 -30.361)"/>
                                                    <path
                                                          d="M190.511,100.646q-1.918,3.2-3.836,6.391a9.8,9.8,0,0,1,3.836-6.391"
                                                          transform="translate(-166.22 -23.555)"/>
                                                    <path
                                                          d="M180.321,145.185a2.634,2.634,0,0,1-2.777-2.741c-.1-1.757,1.8-4.556,3.012-4.549s3.955,2.459,3.97,3.552c.021,1.573-2.157,3.632-4.205,3.739m.159-6.413a4.593,4.593,0,0,0-2.008,3.647c-.017,1.315.858,1.884,2.1,1.809a2.905,2.905,0,0,0,2.945-2.737c-.012-1.358-1.652-2.057-3.038-2.72"
                                                          transform="translate(-153.239 -32.273)"/>
                                                    <path
                                                          d="M121.718,59c-7.247.4-13.032-5.093-13.531-12.835-.459-7.134,5.494-13.618,12.846-13.992,6.323-.321,13.165,5.889,13.625,12.365A13.777,13.777,0,0,1,121.718,59"
                                                          transform="translate(-50.261 -7.528)"/>
                                                    <path
                                                          d="M5.338,90.905c.011-8.436,7.667-15.832,16.457-15.9,8.773-.064,16.336,7.123,16.365,15.549.034,9.5-6.976,16.9-16.018,16.928a16.754,16.754,0,0,1-16.8-16.581"
                                                          transform="translate(125.028 -17.555)"/>
                                                    <path
                                                          d="M47.575,32.946a12.731,12.731,0,0,1,12.608-12.42A11.933,11.933,0,0,1,72.213,32.51c-.023,7.246-5.274,12.612-12.268,12.535-6.7-.073-12.37-5.622-12.371-12.1"
                                                          transform="translate(58.622 -4.804)"/>
                                                </g>
                                            </svg>

                                                <p className={`text-sm text-[#707070] font-light mt-6`}>{`Vous êtes sur le point de générer un lien`}</p>
                                                <p className={`text-sm font-light text-[#707070]`}>
                                                    <span>{`de paiement de `}</span>
                                                    <span
                                                        className={`text-black font-semibold font-light`}>{`${formatCFA(amount)} FCFA`}</span>{` à `}
                                                    <span>{`créditer `}</span>
                                                </p>
                                                <p className={`text-sm font-light text-[#707070]`}>
                                                    <span>{`sur le compte `}</span>
                                                    <span
                                                        className={`text-black font-semibold`}>{`${!paymentLink.getValues('accountCoreBankId') ? (!accounts[0].name || accounts[0].name == 'Main' ? "Compte principal" : `${accounts[0].name}`) : (paymentLink.getValues('accountCoreBankId') == 'Main' ? "Compte principal" : `${paymentLink.getValues('accountCoreBankId')}`)}`}</span>
                                                </p>
                                            </div>
                                    </div>
                                </div>

                                {/*step 2*/}
                                <div className={`${step == 2 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                        <div className={`flex flex-col items-center`}>
                                            <svg className={`w-[8.5rem] h-auto mt-2`} viewBox="0 0 136.22 124.183">
                                                <defs>
                                                    <clipPath id="clip-pathConfirm">
                                                        <rect width="136.22" height="124.183" fill="none"/>
                                                    </clipPath>
                                                </defs>
                                                <g clipPath="url(#clip-pathConfirm)">
                                                    <path
                                                        d="M97.532,86.1c-1.421,4.278-2.629,8.42-4.166,12.437A69.633,69.633,0,0,1,80.3,119.66a10.445,10.445,0,0,1-3.626,2.162c-1.081.485-2.349.549-3.438,1.021-6.519,2.83-12.716.578-18.852-1.291-19.568-5.962-33.239-18.8-42.27-36.849C5.49,71.459,2.122,57.253.061,42.682c-.342-2.421.761-3.845,2.78-4.979,6.792-3.813,12.242-8.948,15.4-16.215A32.587,32.587,0,0,0,20.928,8.079c-.031-3.848.755-4.684,4.434-5.64A68.7,68.7,0,0,1,45.475.1c5.989.235,12,.01,18-.1a4.649,4.649,0,0,1,4.843,3.015c3.7,8.112,9.23,14.388,17.859,17.6a5.214,5.214,0,0,1,2.592,3c2.585,7.822,4.977,15.707,7.431,23.572.149.477.3.954.48,1.544,2.9-3.754,3.743-4.1,8.212-3.526a38.344,38.344,0,0,1-2.337-4.068c-.717-1.662-.816-3.436.717-4.791,1.517-1.341,3.266-.873,4.641.069,3.678,2.517,7.366,5.059,10.774,7.919,7.571,6.353,13.717,13.8,16.451,23.545,1.661,5.919,1.727,11.763-2.024,17.032-3.858,5.419-9.537,6.733-15.731,6.357A52.841,52.841,0,0,1,97.532,86.1M87.267,35.012c-.9-2.5-1.864-5.388-3.017-8.2a3.812,3.812,0,0,0-1.829-1.725A38.266,38.266,0,0,1,65.337,8.818,4.607,4.607,0,0,0,60.775,6.28c-4.931.11-9.863.119-14.8.154-3.3.024-4.06.616-4.584,3.942a39.056,39.056,0,0,1-16.661,26.67c-2.548,1.808-3.325,3.6-2.748,6.673,2.468,13.161,6.031,25.912,12.873,37.56Q48.5,104.5,74.763,110.486c1.818.418,3.353.351,4.61-1.338A66.781,66.781,0,0,0,90.8,85.813c.753-2.929.731-2.934-2.382-4.1-3.124,4.041-7.654,5.7-12.455,6.861-1.812.44-3.634.862-5.406,1.429-6.711,2.149-12.741.669-18.316-3.326-13.734-9.84-20.005-31.82-13.5-47.4,2.494-5.979,6.386-10.6,12.832-12.527,3.251-.969,6.577-1.686,9.835-2.635a18.112,18.112,0,0,1,16.015,2.541c3.563,2.478,6.667,5.616,9.852,8.355m1.765,44.542c.972-1.472,2.8-2.4,1.307-3.877a15.451,15.451,0,0,0-4.269-2.885,2.208,2.208,0,0,0-2.645,3.157,8.82,8.82,0,0,0,2.6,2.89c9.006,6.231,18.841,10.458,29.806,11.638,4.916.529,9.8.156,13.892-3.073,5.444-4.3,6.569-10.224,5.313-16.576C132.165,56.31,122,47.259,111.076,39.234c-.3,1.075-.285,2.382-.931,2.983-.817.763-4.615-1.028-5.142-2.613-.268-.8.677-2.01,1.07-3.028-1.868-.683-3.346.27-3.193,2.609a7.926,7.926,0,0,0,3.935,6.408A38.249,38.249,0,0,1,118.912,57a10.059,10.059,0,0,0,1.795,1.515L119.17,60.5a10.139,10.139,0,0,0-.726-2.79,28.755,28.755,0,0,0-9.688-9.908,18.17,18.17,0,0,0-7.133-1.943c-2.161-.219-3.428,1.342-3.644,3.481,1.578.731,3.174,1.4,4.707,2.192,4.588,2.365,8.543,5.357,10.706,10.306a1.774,1.774,0,0,1-.655,2.545,18.641,18.641,0,0,0-.753-3.663,11.725,11.725,0,0,0-2.029-2.942c-3.408-3.97-8.084-5.967-12.74-7.937a6.747,6.747,0,0,0-3.776-.673,3.551,3.551,0,0,0-2.075,2.413c-.186.918.312,2.64,1,2.963a37.926,37.926,0,0,1,13.1,10.251,8,8,0,0,0,1.878,1.17l-1.178,1.517a14.7,14.7,0,0,0-1.113-2.018,35.9,35.9,0,0,0-10.921-9.212c-.407-.224-1.039-.683-1.232-.549-1.35.932-1.762-.413-2.468-.941C88.764,53.509,87.139,52.2,85.5,50.92c.247,1.047.928,1.769,1.1,2.6a3.33,3.33,0,0,1-.389,2.528,2.59,2.59,0,0,1-2.349.429C80.14,55,79.746,54.057,82,51.053l.664-.882-.351-.646c-1.113.5-2.654.713-3.223,1.571a4.361,4.361,0,0,0-.32,3.673,12.161,12.161,0,0,0,3.366,4.1c5.415,4.318,11.089,8.319,16.4,12.76,2.944,2.463,6.133,2.876,9.649,2.727a11.056,11.056,0,0,1,1.34.1,3.212,3.212,0,0,1-2.105.623A37.621,37.621,0,0,1,88,69.2c-1.429-.887-2.926-1.779-4.585-.446a4.859,4.859,0,0,0-1.238,5.252c2.062-2.629,3.292-2.792,6.147-.811.6.418,1.211.828,1.785,1.281,2.151,1.7,1.918,3.553-1.072,5.075M32.1,1.765c-2.489.518-4.7.954-6.895,1.44-2.909.645-3.551,1.408-3.538,4.365.056,12.879-5.484,22.8-16.4,29.379-3.791,2.285-4.834,4.561-4.1,8.806,2.458,14.24,5.984,28.1,12.881,40.915,5.814,10.8,13.589,19.858,23.974,26.545.522.336,1.276.841,1.717.687,2.714-.951,5.37-2.07,8.322-3.243C31.585,99.879,22.507,84.1,16.614,66.107l-7.2,2.178c-.057-.178-.113-.356-.17-.534l6.783-2.307c-1.87-8.755-3.708-17.358-5.547-25.973L3.028,40q-.019-.309-.037-.62c2.094-.189,4.19-.348,6.278-.589.533-.061,1.416-.29,1.49-.6.5-2.053,2.25-2.683,3.77-3.6,8.539-5.154,14.581-12.212,16.484-22.224.641-3.37.72-6.848,1.088-10.6m53.289,77.5c-2.384.942-4.4,2.117-6.55,2.513-5.4.991-9.778-1.423-13.516-5-6.6-6.308-9.827-14.282-10.841-23.2-.745-6.552-.091-12.914,3.527-18.653,3.874-6.146,10.495-8.011,17.035-4.855A21.823,21.823,0,0,1,84.4,38.556c2.361,3.94,4.217,8.183,6.173,12.055l1.746-2.356A37.786,37.786,0,0,0,80.459,29.627c-4.633-3.877-9.867-6.521-16.117-5.539-7.932,1.247-12.464,6.659-14.933,13.743-4.028,11.559-2.157,22.731,3.383,33.373,3.368,6.469,8.09,11.719,14.949,14.693,7.3,3.165,15.664,1.19,20.1-4.787l-2.454-1.846m-26.944.974A43.559,43.559,0,0,1,48.9,64.394l-7.763,1.56c-.037-.185-.075-.369-.113-.555l7.643-1.8a44.15,44.15,0,0,1-.909-23.183c-2.807.545-5.266,1.064-7.741,1.484a2.226,2.226,0,0,0-2.023,2.007,39,39,0,0,0-.7,14.475C38.553,67.6,42.047,75.8,48.561,82.574c.4.413,1.171.942,1.562.809,2.688-.912,5.322-1.986,8.324-3.144m7.583-35.711a7.062,7.062,0,0,0,2.617,5.877,4.649,4.649,0,0,1,1.454,2.4c.989,5.22,1.846,10.466,2.733,15.705.215,1.27.759,2.267,2.212,1.893,2.507-.647,5-1.393,7.432-2.262A1.943,1.943,0,0,0,83.41,66.5c-1.124-2.964-2.033-6.12-3.764-8.715a11.9,11.9,0,0,1-1.814-10.2,6.2,6.2,0,0,0-1.95-6.5,5.773,5.773,0,0,0-6.662-1.13,5.152,5.152,0,0,0-3.193,4.58M40.114,114.435c.792.475,1.283.789,1.793,1.072a70.788,70.788,0,0,0,21.182,7.5,13.121,13.121,0,0,0,4.508.5c2.863-.5,5.65-1.446,8.468-2.208-9.736-1.928-18.963-5.015-27.142-10.131l-8.808,3.262M73.271,88.343c-.045-.186-.091-.372-.137-.557L67.41,89.38l-.127-.338L69.6,87.916c-3.149-2.038-6.46-4.194-9.791-6.318-.407-.26-1.007-.609-1.372-.485-2.666.907-5.294,1.925-8.04,2.947,6.748,6.434,14.49,7.741,22.878,4.284M38.746,41.432c3-.589,5.66-1.083,8.3-1.661a1.892,1.892,0,0,0,1.161-.874c1.465-3.008,2.857-6.052,4.269-9.08l-3.938.9c2.5-1.833,6.167-1.3,7.934-4.36-9.057,1.118-14.753,6.242-17.731,15.08m43.883,9.39c-.4,1.282-1.354,2.819-.947,3.4.638.9,2.175,1.228,3.387,1.625.2.066.982-.734,1-1.151.07-1.944-1.245-2.914-3.438-3.871m22.644-12.374.013.854c1.221.748,2.41,1.56,3.688,2.2.3.148.891-.306,1.349-.483a20.677,20.677,0,0,0-2.783-3.177c-.367-.29-1.489.379-2.267.609M92.98,70.963c1.476-2.419-.494-2.969-1.857-3.93-.913,2.826-.913,2.826,1.857,3.93"
                                                        transform="translate(0 0)"/>
                                                    <path
                                                        d="M150.994,31.111l-3.911,7.936a7.439,7.439,0,0,0-5.867-4.952c3.253-2.251,3.46-5.377,3.479-8.788.685,3.719,3.544,4.87,6.3,5.8m-5.607-2.14-2.117,4.743,3.789,3.095,2.828-5.126-4.5-2.712"
                                                        transform="translate(-37.908 -6.794)"/>
                                                    <path
                                                        d="M128.129,151.191a61.57,61.57,0,0,0,6.226-19.981,37.772,37.772,0,0,1-6.226,19.981"
                                                        transform="translate(-34.395 -35.222)"/>
                                                    <path
                                                        d="M175.386,54.476l-2.266,4.549L169.7,55.96c.6-1.7,1.249-3.541,1.777-5.039l3.909,3.555m-3.5-1.484-1.258,2.735,2.179,1.693,1.707-2.933-2.629-1.5"
                                                        transform="translate(-45.554 -13.669)"/>
                                                    <path
                                                        d="M157.765,144.113c-3.28-1.177-8.892-8.958-8.782-13.153A73.223,73.223,0,0,0,152.9,138.3a62.58,62.58,0,0,0,4.868,5.812"
                                                        transform="translate(-39.992 -35.155)"/>
                                                    <path d="M136.707,31.968l-3.727-4.724.48-.388,3.779,4.662-.532.451"
                                                          transform="translate(-35.697 -7.209)"/>
                                                    <path d="M153.935,24.877l2.8-5.16.568.3-2.8,5.153-.571-.293"
                                                          transform="translate(-41.322 -5.293)"/>
                                                    <path
                                                        d="M108.126,132.169l6.725-9.686a23.116,23.116,0,0,1-6.725,9.686"
                                                        transform="translate(-29.025 -32.879)"/>
                                                    <path d="M87.743,23l-5.684-7.922.552-.394,5.67,7.932L87.743,23"
                                                          transform="translate(-22.028 -3.94)"/>
                                                    <path
                                                        d="M37.865,129.158l-6.983,2.165c-.067-.213-.135-.427-.2-.64l6.978-2.182q.1.328.208.656"
                                                        transform="translate(-8.236 -34.495)"/>
                                                </g>
                                            </svg>
                                            <p className={`text-sm text-[#707070] mt-3`}>{`Entrez votre clé d'accès pour valider l'envoi`}</p>

                                            <div className={`w-full mt-12`}>
                                                <div className={`relative`}>
                                                    <Input
                                                        className={`font-normal text-sm ${showConError && "border-[#e95d5d]"}`}
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Clé d'accès" onChange={(e) => {
                                                        setAccessKey(e.target.value)
                                                    }} style={{
                                                        backgroundColor: accessKey != '' ? '#fff' : '#f0f0f0',
                                                    }}/>
                                                    <svg onClick={handleTogglePassword}
                                                         className={`h-6 w-6 cursor-pointer ${showPassword ? 'fill-[#414141]' : 'fill-[#c1c1c1]'}  absolute top-4 right-4`}
                                                         viewBox="0 0 28.065 19.104">
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

                                {/*step 3*/}
                                <div className={`${step == 3 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`w-[70%] mx-auto`}>
                                        <div className={`flex flex-col items-center`}>
                                                <span className="relative flex w-40 h-40">
                                                  <span
                                                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>
                                                  <span
                                                      className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>
                                                </span>
                                            <p className={`text-sm mt-10 text-center text-[#707070]`}>Votre lien de paiement est généré avec succès!</p>
                                        <p className={`text-sm text-center text-black font-medium`}>Envoyez le à votre destinataire pour vous faire payer {formatCFA(amount)} FCFA</p>
                                        
                                        <FormItem>
                                            <FormControl>
                                                <div className={`flex space-x-1 mt-6`}>
                                                    <Input type={`text`} className={`grow font-light px-3 text-xs rounded-md min-w-[25rem] h-[2rem] border-black`}
                                                        placeholder="Écrivez votre message" disabled style={{
                                                        backgroundColor: 'white',
                                                    }} value={paymentLinkToShare}/>
                                                    <Button className={`flex-none rounded-md px-1 h-[2rem]`} onClick={() => copyPaymentLink()}>
                                                        <Copy className={`h-[1rem] text-white `} />
                                                    </Button>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                        
                                        </div>
                                    </div>
                                </div>


                                <div className={`flex justify-center items-center mb-3`}>
                                    <Button onClick={() => prevStep()} className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${step == 1 || step == 2 || step == 3 || confirmStep != 0 ? 'hidden' : 'block'}`} disabled={isSendLoading}>
                                        Retour
                                    </Button>
                                    {/*<Button onClick={handleSubmit((data) => addNewBeneficiary(data))} className={`mt-5 w-42 text-sm ${(step == 1 && displayBeneficiaryForm) ? 'block' : 'hidden'}`}>*/}
                                    {/*    Ajouter destinataire*/}
                                    {/*</Button>*/}
                                    <Button onClick={() => nextStep()} className={`mt-5 w-36 text-sm ${(step == 1) ? 'block' : 'hidden'}`}>
                                        Continuer
                                    </Button>
                                    <Button onClick={() => {
                                        sendPaymentLinkToRecipient();
                                    }} className={`mt-5 w-[30%] text-sm ${step == 2 ? 'block' : 'hidden'}`} disabled={isSendLoading}>
                                        {isSendLoading ? <ScaleLoader color="#fff" height={15} width={3} /> : `Valider`}
                                    </Button>
                                    <DialogClose asChild>
                                        <Button onClick={() => {setStep(1); setPercentage('w-1/3'); resetSendPaymentLink();}} className={`mt-4 w-48 text-sm ${step == 3 ? 'block' : 'hidden'}`}>
                                            {`Terminer`}
                                        </Button>
                                    </DialogClose>
                                </div>
                            </div>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
    );
}