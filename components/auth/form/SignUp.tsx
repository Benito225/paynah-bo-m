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

interface AuthSignUpFormProps {
    lang: Locale
}

const formSchema = z.object({
    country: z.string().min(1, {
        message: "Veuillez choisir un pays SVP"
    }),
})

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
    email: z.string({
        required_error: "Veuillez renseigner un email SVP"
    }).min(1, {
        message: "Veuillez renseigner un email SVP"
    }).email(),
    companyStatus: z.enum(["new-company", "existing-company"], {
        required_error: "Veuillez choisir le status de votre entreprise",
    }),
})

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function AuthSignUpForm({ lang }: AuthSignUpFormProps) {

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(3);
    const [stepThreeForm, setStepThreeForm] = useState('individual');
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const [showErrorTwo, setShowErrorTwo] = useState(false);
    const [showConErrorTwo, setShowConErrorTwo] = useState(false);

    // step 3
    const [showErrorIndividualProfile, setShowErrorIndividualProfile] = useState(false);
    const [showConErrorIndividualProfile, setShowConErrorIndividualProfile] = useState(false);

    const router = useRouter();

    const stepOne = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
        }
    });

    const stepTwo = useForm<z.infer<typeof formSchemaTwo>>({
        resolver: zodResolver(formSchemaTwo)
    });

    const stepThreeIndividualProfile = useForm<z.infer<typeof formSchemaThreeIndividualProfile>>({
        resolver: zodResolver(formSchemaThreeIndividualProfile)
    });

    const errorsArray = Object.values(stepOne.formState.errors);
    const errorsArrayTwo = Object.values(stepTwo.formState.errors);
    const errorsArrayThreeIndividualProfile = Object.values(stepThreeIndividualProfile.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);

        // setShowConError(true);

        setStep(2);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 1500);
        // }
    }

    function handleGoToBack() {
        if (step > 1) {
            const backNumber = step - 1;
            setStep(backNumber)
        }
    }

    async function onSubmitTwo(values: z.infer<typeof formSchemaTwo>) {
        console.log(values)
        setLoading(true);

        setShowConErrorTwo(true);

        setStep(3);
        setStepThreeForm(values.profileType);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
        setShowErrorTwo(true);
        setTimeout(() => {
            setShowError(false);
        }, 1500);
        // }
    }

    async function onSubmitThreeIndividualProfile(values: z.infer<typeof formSchemaThreeIndividualProfile>) {
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setShowConErrorTwo(true);
            console.log('valid fail ok')
            return;
        }

        console.log(values)
        setLoading(true);

        setShowConErrorTwo(true);

        // setStep(4);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
        setShowErrorTwo(true);
        setTimeout(() => {
            setShowError(false);
        }, 1500);
        // }
    }

    // async function triggerProfileInput(value: "individual" | "company" | "ong") {
    //     stepTwo.setValue('profileType', value);
    // }

    return (
        <div>
            <div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpCountryChoice onSubmit={onSubmit} lang={lang} showError={showError} errorsArray={errorsArray} stepOne={stepOne} showConError={showConError} />
            </div>
            <div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpProfileChoice showErrorTwo={showErrorTwo} errorsArrayTwo={errorsArrayTwo} stepTwo={stepTwo} showConErrorTwo={showConErrorTwo} lang={lang} onSubmitTwo={onSubmitTwo} handleGoToBack={handleGoToBack} />
            </div>
            <div className={`duration-200 ${step == 3 ? 'block fade-in' : 'hidden fade-out'}`}>
                {stepThreeForm == "individual" &&
                  <SignUpIndividualProfile showErrorIndividualProfile={showErrorIndividualProfile} errorsArrayIndividualProfile={errorsArrayThreeIndividualProfile} stepThreeIndividualProfile={stepThreeIndividualProfile} showConErrorIndividualProfile={showConErrorIndividualProfile} lang={lang} onSubmitThreeIndividualProfile={onSubmitThreeIndividualProfile} handleGoToBack={handleGoToBack} />
                }
                {stepThreeForm == "company" &&
                    <div>company</div>
                }
                {stepThreeForm == "ong" &&
                    <div>ong</div>
                }
            </div>
        </div>
    );
}