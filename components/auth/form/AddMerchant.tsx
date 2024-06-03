"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {useRouter} from "next13-progressbar";
import SignUpCountryChoice from "@/components/auth/form/SignUpCountryChoice";
import SignUpProfileChoice from "@/components/auth/form/SignUpProfilChoice";
import SignUpIndividualProfile from "@/components/auth/form/SignUpIndividualProfileForm";
import { PhoneNumberUtil } from 'google-libphonenumber';
import SignUpCreateAccess from "@/components/auth/form/SignUpCreateAccess";
import SignUpCompanyProfile from "@/components/auth/form/SignUpCompanyProfileForm";
import SignUpONGProfile from "@/components/auth/form/SignUpONGProfileForm";
import VerifyEmail from "@/components/auth/form/VerifyEmail";
import ValidateEmail from "@/components/auth/form/ValidateEmail";
import SignUpFilesInfo from "@/components/auth/form/SignUpFilesInfo";
import SignUpFilesUpload from "@/components/auth/form/SignUpFilesUpload";
import SignUpOK from "@/components/auth/form/SignUpOK";
import {addMerchant} from "@/core/apis/signup";
import {IUser} from "@/core/interfaces/user";
import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";
import {generateNewToken} from "@/core/apis/login";

interface AddMerchantProps {
    lang: Locale,
    legalForms: { id: string, name: string, code: string, skaleetId: string, sk_document: any[], company_type: number }[],
    merchant: IUser
}

const formSchemaTwo = z.object({
    profileType: z.enum(["individual", "company", "ong"], {
        required_error: "Veuillez choisir un profil SVP",
    })
})

const formSchemaThreeIndividualProfile = z.object({
    position: z.string({
        required_error: "Veuillez selectionner votre type d'activité SVP"
    }).min(1, {
        message: "Veuillez selectionner votre type d'activité SVP"
    }),
    accountName: z.string({
        required_error: "Veuillez renseigner un nom de compte SVP"
    }).min(1, {
        message: "Veuillez renseigner un nom de compte SVP"
    }),
    activitySector: z.string({
        required_error: "Veuillez selectionner un secteur d'activité SVP"
    }).min(1, {
        message: "Veuillez selectionner un secteur d'activité SVP"
    }),
    lastname: z.string({
        required_error: "Veuillez renseigner votre nom de famille SVP"
    }).min(1, {
        message: "Veuillez renseigner votre nom de famille SVP"
    }),
    firstname: z.string({
        required_error: "Veuillez renseigner vos prénoms SVP"
    }).min(1, {
        message: "Veuillez renseigner vos prénoms SVP"
    }),
    tel: z.string({
        required_error: "Veuillez renseigner un numéro de Téléphone SVP"
    }).min(1, {
        message: "Veuillez renseigner un numéro de Téléphone SVP"
    }),
    // email: z.string({
    //     required_error: "Veuillez renseigner un email SVP"
    // }).min(1, {
    //     message: "Veuillez renseigner un email SVP"
    // }).email(),
    // companyStatus: z.enum(["new-company", "existing-company"], {
    //     required_error: "Veuillez choisir le status de votre entreprise",
    // }),
})

const formSchemaThreeCompanyProfile = z.object({
    position: z.string({
        required_error: "Veuillez selectionner votre type d'activité SVP"
    }).min(1, {
        message: "Veuillez selectionner votre type d'activité SVP"
    }),
    denomination: z.string({
        required_error: "Veuillez renseigner une dénomination SVP"
    }).min(1, {
        message: "Veuillez renseigner une dénomination SVP"
    }),
    occupation: z.string({
        required_error: "Veuillez selectionner une fonction SVP"
    }).min(1, {
        message: "Veuillez selectionner une fonction SVP"
    }),
    lastname: z.string({
        required_error: "Veuillez renseigner votre nom de famille SVP"
    }).min(1, {
        message: "Veuillez renseigner votre nom de famille SVP"
    }),
    firstname: z.string({
        required_error: "Veuillez renseigner vos prénoms SVP"
    }).min(1, {
        message: "Veuillez renseigner vos prénoms SVP"
    }),
    tel: z.string({
        required_error: "Veuillez renseigner un numéro de Téléphone SVP"
    }).min(1, {
        message: "Veuillez renseigner un numéro de Téléphone SVP"
    }),
    // email: z.string({
    //     required_error: "Veuillez renseigner un email SVP"
    // }).min(1, {
    //     message: "Veuillez renseigner un email SVP"
    // }).email(),
})

const formSchemaThreeONGProfile = z.object({
    position: z.string({
        required_error: "Veuillez selectionner votre type d'activité SVP"
    }).min(1, {
        message: "Veuillez selectionner votre type d'activité SVP"
    }),
    denomination: z.string({
        required_error: "Veuillez renseigner une dénomination SVP"
    }).min(1, {
        message: "Veuillez renseigner une dénomination SVP"
    }),
    occupation: z.string({
        required_error: "Veuillez selectionner une fonction SVP"
    }).min(1, {
        message: "Veuillez selectionner une fonction SVP"
    }),
    lastname: z.string({
        required_error: "Veuillez renseigner votre nom de famille SVP"
    }).min(1, {
        message: "Veuillez renseigner votre nom de famille SVP"
    }),
    firstname: z.string({
        required_error: "Veuillez renseigner vos prénoms SVP"
    }).min(1, {
        message: "Veuillez renseigner vos prénoms SVP"
    }),
    tel: z.string({
        required_error: "Veuillez renseigner un numéro de Téléphone SVP"
    }).min(1, {
        message: "Veuillez renseigner un numéro de Téléphone SVP"
    }),
    // email: z.string({
    //     required_error: "Veuillez renseigner un email SVP"
    // }).min(1, {
    //     message: "Veuillez renseigner un email SVP"
    // }).email(),
})

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function AddMerchant({ lang, legalForms, merchant }: AddMerchantProps) {

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [stepThreeForm, setStepThreeForm] = useState('individual');

    const [profilID,setProfilID] = useState(0);
    const [legalFormsData,setLegalFormsData] = useState(legalForms);

    const [showErrorTwo, setShowErrorTwo] = useState(false);
    const [showConErrorTwo, setShowConErrorTwo] = useState(false);

    // step 3
    const [showErrorIndividualProfile, setShowErrorIndividualProfile] = useState(false);
    const [showConErrorIndividualProfile, setShowConErrorIndividualProfile] = useState(false);
    const [showErrorCompanyProfile, setShowErrorCompanyProfile] = useState(false);
    const [showConErrorCompanyProfile, setShowConErrorCompanyProfile] = useState(false);
    const [showErrorONGProfile, setShowErrorONGProfile] = useState(false);
    const [showConErrorONGProfile, setShowConErrorONGProfile] = useState(false);

    const router = useRouter();


    const stepTwo = useForm<z.infer<typeof formSchemaTwo>>({
        resolver: zodResolver(formSchemaTwo)
    });

    const stepThreeIndividualProfile = useForm<z.infer<typeof formSchemaThreeIndividualProfile>>({
        resolver: zodResolver(formSchemaThreeIndividualProfile)
    });

    const stepThreeCompanyProfile = useForm<z.infer<typeof formSchemaThreeCompanyProfile>>({
        resolver: zodResolver(formSchemaThreeCompanyProfile)
    });

    const stepThreeONGProfile = useForm<z.infer<typeof formSchemaThreeONGProfile>>({
        resolver: zodResolver(formSchemaThreeONGProfile)
    });

    const errorsArrayTwo = Object.values(stepTwo.formState.errors);
    const errorsArrayThreeIndividualProfile = Object.values(stepThreeIndividualProfile.formState.errors);
    const errorsArrayThreeCompanyProfile = Object.values(stepThreeCompanyProfile.formState.errors);
    const errorsArrayThreeONGProfile = Object.values(stepThreeONGProfile.formState.errors);

    function handleGoToBack() {
        if (step > 1) {
            const backNumber = step - 1;
            setStep(backNumber)
        }
    }

    function handleGoToNext() {
        if (step < 9) {
            const backNumber = step + 1;
            setStep(backNumber)
        }
    }

    async function onSubmitTwo(values: z.infer<typeof formSchemaTwo>) {
        setStep(2);
        setStepThreeForm(values.profileType);
    }

    async function onSubmitThreeIndividualProfile(values: z.infer<typeof formSchemaThreeIndividualProfile>) {
        setLoading(true);
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setLoading(false);
            setShowConErrorIndividualProfile(true);

            console.log('valid fail ok')

            return toast.error("Numéro de téléphone non valide !", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const data = {
            country: merchant.country,
            legalForm: values.position,
            name: values.accountName,
            sector: values.activitySector,
            ownerFirstname: values.firstname,
            ownerLastname: values.lastname,
            ownerPhoneNumber: values.tel,
            ownerEmail: merchant.login
        }
        const merchantRes = await addMerchant(data, merchant);
        console.log(data);

        if (!merchantRes.success) {
            setLoading(false);
            setShowConErrorIndividualProfile(true);
            toast.dismiss(toastLoading);

            return toast.error(merchantRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setLoading(false);
            setShowConErrorIndividualProfile(false);
            toast.dismiss(toastLoading);

            toast.success("Compte marchand ajouté avec succès", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            // @ts-ignore
            const newToken = await generateNewToken(merchant.refreshToken);

            await signIn("merchant", {
                accessToken: newToken.accessToken,
                refreshToken: merchant.refreshToken,
                redirect: false
            });

            router.push(Routes.auth.onboardingKyc.replace('{lang}', lang));
        }
    }

    async function onSubmitThreeCompanyProfile(values: z.infer<typeof formSchemaThreeCompanyProfile>) {
        setLoading(true);
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setLoading(false);
            setShowConErrorCompanyProfile(true);

            console.log('valid fail ok')

            return toast.error("Numéro de téléphone non valide !", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const data = {
            country: merchant.country,
            legalForm: values.position,
            name: values.denomination,
            sector: values.occupation,
            ownerFirstname: values.firstname,
            ownerLastname: values.lastname,
            ownerPhoneNumber: values.tel,
            ownerEmail: merchant.login
        }
        const merchantRes = await addMerchant(data, merchant);

        if (!merchantRes.success) {
            setLoading(false);
            setShowConErrorCompanyProfile(true);
            toast.dismiss(toastLoading);

            // await signIn("merchant", {
            //     accessToken: merchant.accessToken,
            //     redirect: false
            // });
            //
            // router.push(Routes.auth.onboardingKyc.replace('{lang}', lang));

            return toast.error(merchantRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setLoading(false);
            setShowConErrorCompanyProfile(false);
            toast.dismiss(toastLoading);

            toast.success("Compte marchand ajouté avec succès", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            // @ts-ignore
            const newToken = await generateNewToken(merchant.refreshToken);

            await signIn("merchant", {
                accessToken: newToken.accessToken,
                refreshToken: merchant.refreshToken,
                redirect: false
            });

            router.push(Routes.auth.onboardingKyc.replace('{lang}', lang));
        }
    }

    async function onSubmitThreeONGProfile(values: z.infer<typeof formSchemaThreeCompanyProfile>) {
        setLoading(true);
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setLoading(false);
            setShowConErrorONGProfile(true);

            console.log('valid fail ok')

            return toast.error("Numéro de téléphone non valide !", {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        }

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const data = {
            country: merchant.country,
            legalForm: values.position,
            name: values.denomination,
            sector: values.occupation,
            ownerFirstname: values.firstname,
            ownerLastname: values.lastname,
            ownerPhoneNumber: values.tel,
            ownerEmail: merchant.login
        }
        const merchantRes = await addMerchant(data, merchant);
        console.log(data);

        if (!merchantRes.success) {
            setLoading(false);
            setShowConErrorONGProfile(true);
            toast.dismiss(toastLoading);

            return toast.error(merchantRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setLoading(false);
            setShowConErrorONGProfile(false);
            toast.dismiss(toastLoading);

            toast.success("Compte marchand ajouté avec succès", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            // @ts-ignore
            const newToken = await generateNewToken(merchant.refreshToken);

            await signIn("merchant", {
                accessToken: newToken.accessToken,
                refreshToken: merchant.refreshToken,
                redirect: false
            });

            router.push(Routes.auth.onboardingKyc.replace('{lang}', lang));
        }
    }

    useEffect(() => {
        const forms = legalForms.filter(element => element.company_type === profilID);
        setLegalFormsData(forms);
        console.log(forms);
    }, [profilID]);

    return (
        <div>
            <div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpProfileChoice showErrorTwo={showErrorTwo} errorsArrayTwo={errorsArrayTwo} stepTwo={stepTwo} showConErrorTwo={showConErrorTwo} lang={lang} onSubmitTwo={onSubmitTwo} handleGoToBack={handleGoToBack} isLoading={isLoading} setProfilID={setProfilID} />
            </div>
            <div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>
                {stepThreeForm == "individual" &&
                  <SignUpIndividualProfile showErrorIndividualProfile={showErrorIndividualProfile} errorsArrayIndividualProfile={errorsArrayThreeIndividualProfile} stepThreeIndividualProfile={stepThreeIndividualProfile} showConErrorIndividualProfile={showConErrorIndividualProfile} lang={lang} onSubmitThreeIndividualProfile={onSubmitThreeIndividualProfile} handleGoToBack={handleGoToBack} isLoading={isLoading} legalFormsData={legalFormsData}/>
                }
                {stepThreeForm == "company" &&
                    <SignUpCompanyProfile showErrorCompanyProfile={showErrorCompanyProfile} errorsArrayCompanyProfile={errorsArrayThreeCompanyProfile} stepThreeCompanyProfile={stepThreeCompanyProfile} showConErrorCompanyProfile={showConErrorCompanyProfile} lang={lang} onSubmitThreeCompanyProfile={onSubmitThreeCompanyProfile} handleGoToBack={handleGoToBack} isLoading={isLoading} legalFormsData={legalFormsData}/>
                }
                {stepThreeForm == "ong" &&
                    <SignUpONGProfile showErrorONGProfile={showErrorONGProfile} errorsArrayONGProfile={errorsArrayThreeONGProfile} stepThreeONGProfile={stepThreeONGProfile} showConErrorONGProfile={showConErrorONGProfile} lang={lang} onSubmitThreeONGProfile={onSubmitThreeONGProfile} handleGoToBack={handleGoToBack} isLoading={isLoading} legalFormsData={legalFormsData}/>
                }
            </div>
        </div>
    );
}