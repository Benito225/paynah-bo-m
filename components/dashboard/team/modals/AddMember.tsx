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
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {isPhoneValid} from "@/components/auth/form/AddMerchant";
import {PhoneInput} from "react-international-phone";

interface AddMemberProps {
    lang: string,
    merchant: IUser,
    children: React.ReactNode
}

export default function AddMember({lang, merchant, children}: AddMemberProps) {
    const [showErrorPhone, setShowErrorPhone] = useState(false);
    const [step, setStep] = useState(1);
    const [percentage, setPercentage] = useState('w-1/4');

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

    const formSchema = z.object({
        lastName: z.string().min(2, { message: "Le nom doit contenir au moins deux lettres" }),
        firstName: z.string().min(2, { message: "Le prénoms doit contenir au moins deux lettres" }),
        email: z.string().email({message: "votre email doit avoir un format valide"}),
        number: z.string(),
    })

    const addMemberForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            email: "",
            number: ""
        }
    });

    async function onSubmitAddMember(values: z.infer<typeof formSchema>) {
        const isValidPhone = isPhoneValid(values.number);

        if (!isValidPhone) {
            setShowErrorPhone(true);

            console.log('valid fail ok')

            return toast.error("Numéro de téléphone non valide !", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }

        setShowErrorPhone(false);

        console.log(values);

        nextStep();
    }

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
                    <div className={`step-1 ${step == 1 ? 'block' : 'hidden'}`}>
                        <h3 className={`mb-10 mt-4 text-xl font-semibold`}>Saisissez les informations du membre</h3>
                        <Form {...addMemberForm}>
                            <form onSubmit={addMemberForm.handleSubmit(onSubmitAddMember)}
                                  className={`${step == 2 && 'hidden'} space-y-5 gap-6`}>
                                <div className={`flex items-center gap-5`}>
                                    <div className={'w-1/3'}>
                                        <FormField
                                            control={addMemberForm.control}
                                            name="lastName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Nom du membre</h3>
                                                    </div>
                                                    <FormControl className={''}>
                                                        <div>
                                                            <Input type={`text`}
                                                                   className={`font-light text-sm`}
                                                                   placeholder="Entrez le nom du membre" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                   }}/>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className={'w-2/3'}>
                                        <FormField
                                            control={addMemberForm.control}
                                            name="firstName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Prénoms du membre</h3>
                                                    </div>
                                                    <FormControl className={''}>
                                                        <div>
                                                            <Input type={`text`}
                                                                   className={`font-light text-sm`}
                                                                   placeholder="Entrez le prénoms du membre" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                   }}/>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={`gap-5`}>
                                    <div className={''}>
                                        <FormField
                                            control={addMemberForm.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div className={`inline-flex space-x-3`}>
                                                        <h3 className={`text-sm font-medium`}>Adresse E-mail du
                                                            membre</h3>
                                                    </div>
                                                    <FormControl className={''}>
                                                        <div>
                                                            <Input type={`email`}
                                                                   className={`font-light text-sm`}
                                                                   placeholder="name@mail.com" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#f0f0f0',
                                                                   }}/>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={`gap-5`}>
                                    <div className={''}>
                                        <FormField
                                            control={addMemberForm.control}
                                            name="number"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <PhoneInput
                                                            {...field}
                                                            className={`font-light ${showErrorPhone && "!border-[#e95d5d]"}`}
                                                            style={
                                                                {
                                                                    '--react-international-phone-text-color': '#000',
                                                                    '--react-international-phone-border-color': showErrorPhone ? '#e95d5d' : '#f0f0f0',
                                                                    '--react-international-phone-height': '3.3rem',
                                                                    '--react-international-phone-font-size': '14px',
                                                                    '--react-international-phone-border-radius': '0.75rem',
                                                                } as React.CSSProperties
                                                            }
                                                            defaultCountry="ci"
                                                            placeholder="Téléphone du membre"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={`flex justify-center items-center`}>
                                    <Button type={"submit"}
                                            className={`mt-3 w-48 text-sm`}>
                                        {`Continuer`}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className={`step-2 ${step == 2 ? 'block' : 'hidden'}`}>
                        <h3 className={`mb-10 mt-4 text-xl font-semibold`}>Ajouter ce membre en tant que…</h3>

                        <div className={`flex justify-center items-center`}>
                            <Button onClick={() => prevStep()} className={`mt-5 w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3`}>
                                Retour
                            </Button>
                            <Button onClick={() => nextStep()}
                                    className={`mt-3 w-36 text-sm`}>
                                {`Continuer`}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}