"use client"

import {IUser} from "@/core/interfaces/user";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {PlusCircle, SquarePen, X} from "lucide-react";
import * as React from "react";
import {useState, useEffect} from "react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {isPhoneValid} from "@/components/auth/form/AddMerchant";
import {PhoneInput} from "react-international-phone";
import Link from "next/link";
import { ScaleLoader } from "react-spinners";
import { IProfile } from '@/core/interfaces/profile';
import { addMerchantUser } from '@/core/apis/merchant-user';
import { login } from '@/core/apis/login';

interface AddMemberProps {
    lang: string,
    merchant: IUser,
    profiles: IProfile[],
    children: React.ReactNode
}

export default function AddMember({lang, merchant, profiles, children}: AddMemberProps) {
    const [showErrorPhone, setShowErrorPhone] = useState(false);
    const [step, setStep] = useState(1);
    const [percentage, setPercentage] = useState('w-1/4');

    const [selectedRole, setSelectedRole] = useState(''); // viewer, initiator, validator, administrator

    const [errorMessage, setErrorMessage] = useState('');
    const [showConError, setShowConError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [accessKey, setAccessKey] = useState('');
    const [merchantUser, setMerchantUser] = useState({});
    const [isAddMerchantUserLoading, setIsAddMerchantUserLoading] = useState(false);

    const [isEndStep, setIsEndStep] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    function getRoleLabel(key: string) {
        const roles: any = {
            viewer: 'Visualiseur',
            initiator: 'Initiateur',
            validator: 'Validateur',
            administrator: 'Administrateur',
        }

        return roles[key] ?? '-';
    }

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

    function goToStep(step: number) {
        setStep(step);

        if (step == 4) {
            setPercentage('w-full');
        } else if (step == 3) {
            setPercentage('w-3/4');
        }  else if (step == 2) {
            setPercentage('w-2/4');
        } else {
            setPercentage('w-1/4');
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
        phoneNumber: z.string(),
    })

    const addMemberForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            email: "",
            phoneNumber: ""
        }
    });

    async function onSubmitAddMember(values: z.infer<typeof formSchema>) {
        const isValidPhone = isPhoneValid(values.phoneNumber);

        if (!isValidPhone) {
            setShowErrorPhone(true);

            console.log('valid fail ok')

            return toast.error("Numéro de téléphone non valide !", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }

        setShowErrorPhone(false);

        console.log(values);
        setMerchantUser(values);

        nextStep();
    }

    function resetModal() {
        setStep(1);
        setIsEndStep(false);
        addMemberForm.reset();
        setSelectedRole('');
        setAccessKey('');
        setIsAddMerchantUserLoading(false);
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

    async function createMerchantUser() {
        setIsAddMerchantUserLoading(true);
        const role = { role: selectedRole };
        const payload = { ...merchantUser, ...role };
        console.log(payload);
        const isAuthenticate = await authenticateMerchant(accessKey);
        if(isAuthenticate){
            addMerchantUser(payload, String(merchant?.merchantsIds[0]?.id), String(merchant.accessToken))
            .then(data => {
                setIsAddMerchantUserLoading(false);
                console.log(data);
                if (data.success) {
                    setErrorMessage('');
                    setStep(0);
                    setIsEndStep(true);
                } else {
                    return toast.error(data.message, {
                        className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                    });
                }
            })
            .catch(() => {
                setIsAddMerchantUserLoading(false);
                return toast.error('Une erreur est survénue', {
                    className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
                });
            });
        }
        setIsAddMerchantUserLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className={` ${step == 2 ? "sm:max-w-[46rem] xl:max-w-[50rem] 2xl:max-w-[53rem]" : (step == 4 || isEndStep ? "sm:max-w-[40rem]" : "sm:max-w-[42rem] xl:max-w-[46rem] 2xl:max-w-[49rem]")} overflow-y-hidden overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                <div>
                    <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                        <div className={`flex justify-between items-center space-x-3`}>
                            <h2 className={`text-base text-[#626262] font-medium`}>{`Ajouter un membre`}</h2>
                            <DialogClose onClick={() => {
                                resetModal()
                            }}>
                                <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`}/>
                            </DialogClose>
                        </div>
                    </div>
                    <div className={`h-1 bg-[#cfcfcf]`}>
                        <div className={`h-full ${percentage} duration-200 bg-black`}></div>
                    </div>
                </div>
                <div className={`min-h-[6rem] pt-2 pb-5 px-8`}>
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
                                                                   placeholder="Entrez le nom" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#EAEAEA',
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
                                                                   placeholder="Entrez les prénoms" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#EAEAEA',
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
                                                                   placeholder="membre@mail.com" {...field}
                                                                   style={{
                                                                       backgroundColor: field.value ? '#fff' : '#EAEAEA',
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
                                            name="phoneNumber"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <PhoneInput
                                                            {...field}
                                                            className={`font-light ${showErrorPhone && "!border-[#e95d5d]"}`}
                                                            style={
                                                                {
                                                                    '--react-international-phone-text-color': '#000',
                                                                    '--react-international-phone-border-color': showErrorPhone ? '#e95d5d' : '#EAEAEA',
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

                        <div className={`grid grid-cols-4 gap-4`}>
                            {
                                profiles && profiles.map((profile: IProfile, index: number) => (
                                    <div key={index} onClick={() => setSelectedRole(profile.name)}
                                        className={`cursor-pointer ${selectedRole == profile.name && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} bg-white rounded-2xl min-h-[10rem] flex items-center justify-center`}>
                                        <h2 className={`text-base font-semibold`}>{profile.name}</h2>
                                    </div>
                                ))
                            }
                            {/* <div onClick={() => setSelectedRole('viewer')}
                                 className={`cursor-pointer ${selectedRole == 'viewer' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} bg-white rounded-2xl min-h-[10rem] flex items-center justify-center`}>
                                <h2 className={`text-base font-semibold`}>Visualiseur</h2>
                            </div>
                            <div onClick={() => setSelectedRole('initiator')}
                                 className={`cursor-pointer ${selectedRole == 'initiator' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} bg-white rounded-2xl min-h-[10rem] flex items-center justify-center`}>
                                <h2 className={`text-base font-semibold`}>Initiateur</h2>
                            </div>
                            <div onClick={() => setSelectedRole('validator')}
                                 className={`cursor-pointer ${selectedRole == 'validator' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} bg-white rounded-2xl min-h-[10rem] flex items-center justify-center`}>
                                <h2 className={`text-base font-semibold`}>Validateur</h2>
                            </div>
                            <div onClick={() => setSelectedRole('administrator')}
                                 className={`cursor-pointer ${selectedRole == 'administrator' && 'outline outline-offset-2 outline-2 outline-[#3c3c3c]'} bg-white rounded-2xl min-h-[10rem] flex items-center justify-center`}>
                                <h2 className={`text-base font-semibold`}>Administrateur</h2>
                            </div> */}
                        </div>

                        <div className={`flex justify-center items-center mt-8`}>
                            <Button onClick={() => prevStep()}
                                    className={`w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3`}>
                                Retour
                            </Button>
                            <Button onClick={() => nextStep()}
                                    className={`w-36 text-sm`} disabled={selectedRole == ''}>
                                {`Continuer`}
                            </Button>
                        </div>
                    </div>

                    <div className={`step-3 ${step == 3 ? 'block' : 'hidden'}`}>
                        <h3 className={`mb-6 mt-4 text-xl font-semibold`}>Récapitulatif</h3>

                        <div className={`bg-[#F0F0F0] rounded-xl px-6 py-3 mb-6`}>
                            <div className={`flex items-start space-x-3`}>
                                <svg className={`h-6 w-6`} viewBox="0 0 19.201 19.201">
                                    <path
                                        d="M10,.4A9.6,9.6,0,1,0,19.6,10,9.6,9.6,0,0,0,10,.4Zm.9,3.466A1.057,1.057,0,0,1,12.107,5.03a1.544,1.544,0,0,1-1.679,1.492c-.886,0-1.308-.445-1.282-1.182A1.584,1.584,0,0,1,10.9,3.866ZM8.5,15.75c-.64,0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678,0-.678a4.863,4.863,0,0,0-1.512.664l-.319-.523a8.506,8.506,0,0,1,4.108-2.061c.64,0,.746.756.427,1.92l-.84,3.18c-.149.562-.085.756.064.756a3.3,3.3,0,0,0,1.438-.719l.362.486A6.683,6.683,0,0,1,8.5,15.75Z"
                                        transform="translate(-0.399 -0.4)"/>
                                </svg>
                                <p className={`text-sm`}>
                                    Une fois confirmée, l’invitation sera envoyée par e-mail. Le membre invité n’aura
                                    plus qu’à cliquer sur le lien et
                                    se laisser guider pour l’inscription.
                                </p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-2 gap-x-7 gap-y-4`}>
                            <div>
                                <div className={`inline-flex space-x-3 mb-2`}>
                                    <span className={`text-sm font-medium`}>Nom</span>
                                    <button onClick={() => goToStep(1)}>
                                        <SquarePen className={`text-[#626262] h-4 w-4`}/>
                                    </button>
                                </div>
                                <div
                                    className={`h-[3.3rem] break-all flex items-center bg-white text-sm rounded-xl px-5 py-2 border border-[#EAEAEA]`}>
                                    {addMemberForm && addMemberForm.getValues('lastName')}
                                </div>
                            </div>
                            <div>
                                <div className={`inline-flex space-x-3 mb-2`}>
                                    <span className={`text-sm font-medium`}>Prénoms</span>
                                    <button onClick={() => goToStep(1)}>
                                        <SquarePen className={`text-[#626262] h-4 w-4`}/>
                                    </button>
                                </div>
                                <div
                                    className={`h-[3.3rem] break-all flex items-center bg-white text-sm rounded-xl px-5 py-2 border border-[#EAEAEA]`}>
                                    {addMemberForm && addMemberForm.getValues('firstName')}
                                </div>
                            </div>
                            <div>
                                <div className={`inline-flex space-x-3 mb-2`}>
                                    <span className={`text-sm font-medium`}>Email</span>
                                    <button onClick={() => goToStep(1)}>
                                        <SquarePen className={`text-[#626262] h-4 w-4`}/>
                                    </button>
                                </div>
                                <div
                                    className={`h-[3.3rem] break-all flex items-center bg-white text-sm rounded-xl px-5 py-2 border border-[#EAEAEA]`}>
                                    {addMemberForm && addMemberForm.getValues('email')}
                                </div>
                            </div>
                            <div>
                                <div className={`inline-flex space-x-3 mb-2`}>
                                    <span className={`text-sm font-medium`}>Rôle</span>
                                    <button onClick={() => goToStep(1)}>
                                        <SquarePen className={`text-[#626262] h-4 w-4`}/>
                                    </button>
                                </div>
                                <div
                                    className={`h-[3.3rem] break-all flex items-center bg-white text-sm rounded-xl px-5 py-2 border border-[#EAEAEA]`}>
                                    {/* {getRoleLabel(selectedRole)} */}
                                    {selectedRole}
                                </div>
                            </div>
                        </div>

                        <div className={`flex justify-center items-center mt-8`}>
                            <Button onClick={() => prevStep()}
                                    className={`w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3`}>
                                Retour
                            </Button>
                            <Button onClick={() => nextStep()}
                                    className={`w-36 text-sm`}>
                                {`Continuer`}
                            </Button>
                        </div>
                    </div>

                    <div className={`step-4 ${step == 4 ? 'block' : 'hidden'}`}>
                        <div className={`w-[70%] mx-auto`}>
                            <div className={`flex flex-col items-center`}>
                                <svg className={`w-32 h-auto`} viewBox="0 0 136.22 124.183">
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
                                        <path d="M108.126,132.169l6.725-9.686a23.116,23.116,0,0,1-6.725,9.686"
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
                                    <Form {...addMemberForm}>
                                        <form onSubmit={addMemberForm.handleSubmit(onSubmitAddMember)}>
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
                                                        <path d="M0,0H18.622V18.622H0Z" transform="translate(0.539)"
                                                              fill="none"/>
                                                        <g transform="matrix(1, -0.017, 0.017, 1, 5.314, 18.08)">
                                                            <path d="M0,0H0Z" transform="translate(0 -3.249)"
                                                                  fill="none"/>
                                                            <path
                                                                d="M12.917,15.748a5.622,5.622,0,1,0,0,3.748h4.076v3.748h3.748V19.5h1.874V15.748ZM7.622,19.5A1.874,1.874,0,1,1,9.5,17.622,1.874,1.874,0,0,1,7.622,19.5Z"
                                                                transform="translate(-7.063 -26.436)"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                                {
                                                    showConError &&
                                                    <div>
                                                <span
                                                    className={`text-xs text-[#e95d5d] mt-1 hover:font-medium duration-200`}>{errorMessage}</span>
                                                    </div>
                                                }
                                                <Link className={`text-xs mt-1 hover:font-medium duration-200`}
                                                      href={`#`}>{`J'ai perdu ma clé`}</Link>
                                            </div>
                                        </form>
                                    </Form>
                                </div>

                                <div className={`flex justify-center items-center mt-8`}>
                                    <Button onClick={() => prevStep()}
                                            className={`w-32 text-sm text-black border border-black bg-transparent hover:text-white mr-3 mt-3`} disabled={isAddMerchantUserLoading}>
                                        Retour
                                    </Button>
                                    <Button onClick={() => {
                                        // setStep(0);
                                        // setIsEndStep(true);
                                        createMerchantUser();
                                    }}
                                            className={`mt-3 w-[10rem] text-sm`} disabled={isAddMerchantUserLoading}>
                                        {isAddMerchantUserLoading ? <ScaleLoader color="#fff" height={15} width={3} /> : `Déverouiller`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`end-step ${isEndStep ? 'block' : 'hidden'}`}>
                        <div className={`flex flex-col mb-4 mt-3`}>
                            <div className={`w-[70%] mx-auto`}>
                                <div className={`flex flex-col items-center`}>
                                                <span className="relative flex w-40 h-40">
                                                  <span
                                                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#caebe4]"></span>
                                                  <span
                                                      className="relative inline-flex rounded-full w-40 h-40 bg-[#41a38c]"></span>
                                                </span>
                                    <h3 className={`text-base font-medium mt-10`}>Votre invitation a été envoyé avec succès !</h3>
                                    <p className={`text-sm text-center mt-2 text-[#626262]`}>{`Ben Ismael va recevoir un e-mail pour rejoindre votre compte Paynah`}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center items-center mt-8`}>
                            <DialogClose onClick={() => {
                                goToStep(1); setIsEndStep(false); resetModal();
                            }}>
                                <Button className={`mt-3 w-36 text-sm mr-3`}>
                                    Terminer
                                </Button>
                            </DialogClose>
                    </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}