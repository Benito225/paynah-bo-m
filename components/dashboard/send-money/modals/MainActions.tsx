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
import {ClipboardList, Pencil, Search, SquarePen, Trash2, X} from "lucide-react";
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

interface MainActionsProps {
    lang: string
}

export default function MainActions({lang}: MainActionsProps) {

    const [step, setStep] = useState(1);
    const [account, setAccount] = useState<{id: string, name: string}>({id: '', name: ''});
    const [beneficiary, setBeneficiary] = useState<{id: string, name: string}>({id: '', name: ''});
    const [existBenef, setExistBenef] = useState(true);
    const [amount, setAmount] = useState('50000');
    const [totalAmount, setTotalAmount] = useState('');
    const [reason, setReason] = useState('');
    const [percentage, setPercentage] = useState('w-1/4');

    const formSchema = z.object({
        beneficiary: z.string(),
    })

    const sendMoneyForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiary: "",
        }
    });

    function updateFormValue(value: any) {
        if (step == 1) {
            setAccount(value);
            setStep(2);
            setPercentage('w-2/4');
        } else if (step == 2) {
            setBeneficiary(value)
            setStep(3);
            setPercentage('w-3/4');
        }
    }

    // console.log(account);

    function nextStep() {
        if (step < 4) {
            setStep(step + 1);

            if (step + 1 == 4) {
                setPercentage('w-full');
            } else if (step + 1 == 3) {
                setPercentage('w-3/4');
            } else {
                setPercentage('w-2/4');
            }
        }
    }

    function prevStep() {
        if (step > 1) {
            setStep(step - 1);

            if (step - 1 == 1) {
                setPercentage('w-1/4');
            } else if (step - 1 == 2) {
                setPercentage('w-2/4');
            } else {
                setPercentage('w-3/4');
            }
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={`w-full py-6`}>
                        {`Envoyez de l'argent`}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[52rem] xl:max-w-[56rem] overflow-x-hidden 2xl:max-w-[59rem] !rounded-3xl bg-[#f4f4f7] px-3 py-3">
                    <div>
                        <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                            <div className={`flex justify-between items-center space-x-3`}>
                                <h2 className={`text-base text-[#626262] font-medium`}>{`Envoi d'argent`}</h2>
                                <DialogClose>
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
                                <h3 className={`text-sm font-medium`}>1- Choisissez le compte à débiter</h3>
                                <div className={`relative`}>
                                    <Input type={`text`} className={`font-normal pl-9 bg-white text-xs rounded-full h-[2.8rem] w-[15rem]`}
                                           placeholder="Recherchez un compte" onChange={(e) => console.log(e.target.value) }/>
                                    <Search className={`absolute h-4 w-4 top-3.5 left-3`} />
                                </div>
                            </div>

                            {/*Step 2*/}
                            <div className={`${step == 2 ? 'flex' : 'hidden'} items-center justify-between space-x-3`}>
                                <h3 className={`text-sm font-medium`}>2- Choisissez le bénéficiaire</h3>
                                <div className={`relative`}>
                                    <Input type={`text`} className={`font-normal pl-9 bg-white text-xs rounded-full h-[2.8rem] w-[15rem]`}
                                           placeholder="Recherchez un bénéficiaire" onChange={(e) => console.log(e.target.value) }/>
                                    <Search className={`absolute h-4 w-4 top-3.5 left-3`} />
                                </div>
                            </div>
                            <div className={`mt-4`}>
                                {/*Step 1*/}
                                <div className={`p-1 space-x-2.5 2xl:min-h-[10rem] snap-x snap-mandatory overflow-x-auto ${step == 1 ? 'flex' : 'hidden'}`}>
                                    <div onClick={() => updateFormValue({
                                        id: "1",
                                        name: "good",
                                    })}
                                         className={`snap-end shrink-0 w-[40%] 2xl:w-[35%] bg-white flex flex-col justify-between cursor-pointer ${account.id == '1' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} space-y-6 2xl:space-y-6 p-4 rounded-3xl`}>
                                        <div className={`flex justify-between items-start`}>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <div
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
                                                    </div>
                                                    <span className={`text-[12px] font-normal text-[#626262] -mb-0.5`}>Compte principal</span>
                                                    <span
                                                        className={`text-[11px] font-light text-[#afafaf]`}>PA48939CI</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    actuel</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(30000)}</span>
                                            </div>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    disponible</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(3245544)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => updateFormValue({
                                        id: "2",
                                        name: "good 2",
                                    })}
                                         className={`snap-end shrink-0 w-[40%] 2xl:w-[35%] bg-white flex flex-col justify-between cursor-pointer ${account.id == '2' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} space-y-6 2xl:space-y-6 p-4 rounded-3xl`}>
                                        <div className={`flex justify-between items-start`}>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <div
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
                                                    </div>
                                                    <span className={`text-[12px] font-normal text-[#626262] -mb-0.5`}>Compte principal</span>
                                                    <span
                                                        className={`text-[11px] font-light text-[#afafaf]`}>PA48939CI</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    actuel</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(30000)}</span>
                                            </div>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    disponible</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(3245544)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => updateFormValue({
                                        id: "3",
                                        name: "good 3",
                                    })}
                                         className={`snap-end shrink-0 w-[40%] 2xl:w-[35%] bg-white flex flex-col justify-between cursor-pointer ${account.id == '3' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} space-y-6 2xl:space-y-6 p-4 rounded-3xl`}>
                                        <div className={`flex justify-between items-start`}>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <div
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
                                                    </div>
                                                    <span className={`text-[12px] font-normal text-[#626262] -mb-0.5`}>Compte principal</span>
                                                    <span
                                                        className={`text-[11px] font-light text-[#afafaf]`}>PA48939CI</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex justify-between items-center space-x-3 border-t border-[#d0d0d0] pt-1`}>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    actuel</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(30000)}</span>
                                            </div>
                                            <div className={`inline-flex flex-col`}>
                                                <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                    disponible</h3>
                                                <span className={`text-sm font-semibold`}>{formatCFA(3245544)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-0.5 snap-end`}></div>
                                </div>

                                {/*Step 2*/}
                                <div className={`${step == 2 ? 'flex' : 'hidden'} flex-col`}>
                                    <div className={`mb-3`}>
                                        <div className={`inline-flex text-sm font-normal space-x-1 rounded-lg py-1 px-1 bg-[#f0f0f0]`}>
                                            <button type={"button"} className={`bg-white px-3 py-1.5 rounded-lg`}>
                                                Bénéficiaires enregistrés
                                            </button>
                                            <button type={"button"}  className={`px-3 py-1.5`}>
                                                Nouveau bénéficiaire
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`mt-1`}>
                                        <div className={`grid grid-cols-3 gap-3`}>
                                            <div onClick={() => updateFormValue({
                                                id: "1",
                                                name: "good",
                                            })} className={`bg-white inline-flex items-center cursor-pointer space-x-2 rounded-lg p-2 ${beneficiary.id == '1' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}>
                                                <Avatar className={`cursor-pointer`}>
                                                    <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                </Avatar>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`text-xs font-medium`}>Didier Aney</h3>
                                                    <span className={`text-xs text-[#626262]`}>+225 07 09 87 35 23</span>
                                                    <span className={`text-xs -mt-[1px] text-[#626262]`}>didier.any@abba.com</span>
                                                </div>
                                            </div>
                                            <div onClick={() => updateFormValue({
                                                id: "2",
                                                name: "good 2",
                                            })} className={`bg-white inline-flex items-center cursor-pointer space-x-2 rounded-lg p-2 ${beneficiary.id == '2' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}>
                                                <Avatar className={`cursor-pointer`}>
                                                    <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                </Avatar>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`text-xs font-medium`}>Didier Aney</h3>
                                                    <span className={`text-xs text-[#626262]`}>+225 07 09 87 35 23</span>
                                                    <span className={`text-xs -mt-[1px] text-[#626262]`}>didier.any@abba.com</span>
                                                </div>
                                            </div>
                                            <div onClick={() => updateFormValue({
                                                id: "3",
                                                name: "good",
                                            })} className={`bg-white inline-flex items-center cursor-pointer space-x-2 rounded-lg p-2 ${beneficiary.id == '3' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}>
                                                <Avatar className={`cursor-pointer`}>
                                                    <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                </Avatar>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`text-xs font-medium`}>Didier Aney</h3>
                                                    <span className={`text-xs text-[#626262]`}>+225 07 09 87 35 23</span>
                                                    <span className={`text-xs -mt-[1px] text-[#626262]`}>didier.any@abba.com</span>
                                                </div>
                                            </div>
                                            <div onClick={() => updateFormValue({
                                                id: "4",
                                                name: "good",
                                            })} className={`bg-white inline-flex items-center cursor-pointer space-x-2 rounded-lg p-2 ${beneficiary.id == '4' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'}`}>
                                                <Avatar className={`cursor-pointer`}>
                                                    <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                </Avatar>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`text-xs font-medium`}>Didier Aney</h3>
                                                    <span className={`text-xs text-[#626262]`}>+225 07 09 87 35 23</span>
                                                    <span className={`text-xs -mt-[1px] text-[#626262]`}>didier.any@abba.com</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*Step 3*/}
                                <div className={`${step == 3 ? 'flex' : 'hidden'} flex-col mb-4 -mt-3`}>
                                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4`}>
                                        <div>
                                            <div className={`inline-flex space-x-3`}>
                                                <h3 className={`text-sm font-medium`}>1- Choisissez le compte à débiter</h3>
                                                <button onClick={() => setStep(1)}>
                                                    <SquarePen className={`h-4 w-4`} />
                                                </button>
                                            </div>
                                            <div className={`mt-2.5`}>
                                                <div className={`snap-end shrink-0 w-[100%] bg-white flex flex-row items-end justify-between space-x-3 2xl:space-y-6 px-2 py-2.5 rounded-xl`}>
                                                    <div className={`flex justify-between items-start`}>
                                                        <div>
                                                            <div className={`inline-flex flex-row items-center space-x-2`}>
                                                                <div
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
                                                                </div>
                                                                <div>
                                                                    <span className={`block text-[12px] font-normal text-[#626262] -mb-0.5`}>Compte principal</span>
                                                                    <span
                                                                        className={`block text-[11px] font-light text-[#afafaf]`}>PA48939CI</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`flex flex-row justify-between items-start space-x-2`}>
                                                        <div className={`inline-flex flex-col`}>
                                                            <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde
                                                                actuel</h3>
                                                            <span className={`text-xs font-semibold`}>{formatCFA(30000)}</span>
                                                        </div>
                                                        <div className={`inline-flex flex-col`}>
                                                            <h3 className={`text-[10px] font-light text-[#afafaf] -mb-0.5`}>Solde disponible</h3>
                                                            <span className={`text-xs font-semibold`}>{formatCFA(3245544)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`inline-flex space-x-3`}>
                                                <h3 className={`text-sm font-medium`}>2- Bénéficiaire</h3>
                                                <button onClick={() => setStep(2)}>
                                                    <SquarePen className={`h-4 w-4`} />
                                                </button>
                                            </div>
                                            <div className={`w-full mt-2.5`}>
                                                <div className={`bg-white w-full inline-flex items-center space-x-2 rounded-lg p-2.5`}>
                                                    <Avatar className={`cursor-pointer`}>
                                                        <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                                                    </Avatar>
                                                    <div className={`inline-flex flex-col`}>
                                                        <h3 className={`text-xs font-medium`}>Didier Aney</h3>
                                                        <span className={`text-xs text-[#626262]`}>+225 07 09 87 35 23</span>
                                                        <span className={`text-xs -mt-[1px] text-[#626262]`}>didier.any@abba.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`inline-flex space-x-3`}>
                                                <h3 className={`text-sm font-medium`}>3- Montant</h3>
                                            </div>
                                            <div className={`relative mt-2`}>
                                                <NumericFormat value={amount}
                                                    className={`primary-form-input !pr-[12rem] !pt-2 h-[2.8rem] peer !bg-white focus:border focus:border-[#e4e4e4] focus:!bg-white`} placeholder=" "
                                                    thousandSeparator=" " prefix="FCFA " onChange={(e) => setAmount(e.target.value) } />

                                                <div className={`absolute right-1 top-[4.4px]`}>
                                                    <div className={`inline-flex text-xs font-normal space-x-1 rounded-lg py-1 px-1 bg-[#f0f0f0]`}>
                                                        <button onClick={() => setAmount('FCFA 100 000')} type={"button"} className={`${amount == "FCFA 100 000" && 'bg-white text-center rounded-lg'} px-1 py-1.5`}>
                                                            100.000
                                                        </button>
                                                        <button onClick={() => setAmount('FCFA 300 000')} type={"button"} className={`${amount == "FCFA 300 000" && 'bg-white text-center rounded-lg'} px-1 py-1.5`}>
                                                            300.000
                                                        </button>
                                                        <button onClick={() => setAmount('FCFA 500 000')} type={"button"}  className={`${amount == "FCFA 500 000" && 'bg-white text-center rounded-lg'} px-1 py-1.5`}>
                                                            500.000
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`w-full`}>
                                                <div className={`inline-flex space-x-3`}>
                                                    <h3 className={`text-sm font-medium`}>4- Motif</h3>
                                                </div>
                                                <div className={`relative mt-2 w-full`}>
                                                    <Input type={`text`} className={`font-normal bg-white text-xs w-full rounded-lg h-[2.8rem]`}
                                                           placeholder="Entrez une raison" onChange={(e) => setReason(e.target.value) }/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className={`flex justify-center items-center mb-1`}>
                                    <Button onClick={() => prevStep()} className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 ${step == 1 ? 'hidden' : 'block'}`}>
                                        Retour
                                    </Button>
                                    <Button onClick={() => nextStep()} className={`mt-5 w-36 text-sm ${step < 4 && step > 2  ? 'block' : 'hidden'}`}>
                                        Continuer
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
            <Button className={`w-full text-black border border-black bg-transparent py-6 hover:text-white `}>
                {`Ajouter un bénéficiaire`}
            </Button>
        </>
    );
}