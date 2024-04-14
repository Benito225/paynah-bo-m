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

interface AddMerchantKycProps {
    lang: Locale,
}

const formSchema = z.object({
    country: z.string().min(1, {
        message: "Veuillez choisir un pays SVP"
    }),
})

const formSchemaVerifyEmail = z.object({
    email: z.string().min(1, {
        message: "Veuillez entrez une adresse email SVP"
    }).email({message: 'Veuillez entrez une adresse email Correcte'}),
})

const formSchemaValidateEmail = z.object({
    otp: z.string().min(6, {
        message: "Votre code doit être de 6 Caractères"
    })
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
    // email: z.string({
    //     required_error: "Veuillez renseigner un email SVP"
    // }).min(1, {
    //     message: "Veuillez renseigner un email SVP"
    // }).email(),
    companyStatus: z.enum(["new-company", "existing-company"], {
        required_error: "Veuillez choisir le status de votre entreprise",
    }),
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

const formSchemaFour = z.object({
    password: z.string().min(1, {
        message: "Le champ clé d'accès est requis"
    }),
    password_confirmation: z.string().min(1, {
        message: "Le champ confirmation clé d'accès est requis"
    })
})

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function AddMerchantKyc({ lang }: AddMerchantKycProps) {

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [stepThreeForm, setStepThreeForm] = useState('individual');
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const [countValue, setCountValue] = useState(0);

    const [showErrorTwo, setShowErrorTwo] = useState(false);
    const [showConErrorTwo, setShowConErrorTwo] = useState(false);

    const [showErrorVerifyEmail, setShowErrorVerifyEmail] = useState(false);
    const [showConErrorVerifyEmail, setShowConErrorVerifyEmail] = useState(false);

    const [showErrorValidateEmail, setShowErrorValidateEmail] = useState(false);
    const [showConErrorValidateEmail, setShowConErrorValidateEmail] = useState(false);

    // step 3
    const [showErrorIndividualProfile, setShowErrorIndividualProfile] = useState(false);
    const [showConErrorIndividualProfile, setShowConErrorIndividualProfile] = useState(false);
    const [showErrorCompanyProfile, setShowErrorCompanyProfile] = useState(false);
    const [showConErrorCompanyProfile, setShowConErrorCompanyProfile] = useState(false);
    const [showErrorONGProfile, setShowErrorONGProfile] = useState(false);
    const [showConErrorONGProfile, setShowConErrorONGProfile] = useState(false);

    // Step 4
    const [showErrorCreateAccess, setShowErrorCreateAccess] = useState(false);
    const [showConErrorCreateAccess, setShowConErrorCreateAccess] = useState(false);

    const router = useRouter();

    const stepOne = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
        }
    });

    const stepVerifyEmail = useForm<z.infer<typeof formSchemaVerifyEmail>>({
        resolver: zodResolver(formSchemaVerifyEmail),
        defaultValues: {
            email: "",
        }
    });

    const stepValidateEmail = useForm<z.infer<typeof formSchemaValidateEmail>>({
        resolver: zodResolver(formSchemaValidateEmail),
        defaultValues: {
            otp: "",
        }
    });

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

    const stepFour = useForm<z.infer<typeof formSchemaFour>>({
        resolver: zodResolver(formSchemaFour),
        defaultValues: {
            password: "",
            password_confirmation: "",
        }

    });

    const errorsArray = Object.values(stepOne.formState.errors);
    const errorsArrayVerifyEmail = Object.values(stepVerifyEmail.formState.errors);
    const errorsArrayValidateEmail = Object.values(stepValidateEmail.formState.errors);
    const errorsArrayTwo = Object.values(stepTwo.formState.errors);
    const errorsArrayThreeIndividualProfile = Object.values(stepThreeIndividualProfile.formState.errors);
    const errorsArrayThreeCompanyProfile = Object.values(stepThreeCompanyProfile.formState.errors);
    const errorsArrayThreeONGProfile = Object.values(stepThreeONGProfile.formState.errors);
    const errorsArrayCreateAccess = Object.values(stepFour.formState.errors);

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

    async function onSubmitVerifyEmail(values: z.infer<typeof formSchemaVerifyEmail>) {
        console.log(values)
        setLoading(true);

        // setShowConError(true);

        setCountValue(300);
        setStep(3);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
        //     setShowError(true);
        //     setTimeout(() => {
        //         setShowError(false);
        //     }, 1500);
        // }
    }

    async function onSubmitValidateEmail(values: z.infer<typeof formSchemaValidateEmail>) {
        console.log(values)
        setLoading(true);

        // setShowConError(true);

        setStep(4);

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

    function handleGoToNext() {
        if (step < 9) {
            const backNumber = step + 1;
            setStep(backNumber)
        }
    }

    async function onSubmitTwo(values: z.infer<typeof formSchemaTwo>) {
        console.log(values)
        setLoading(true);

        setShowConErrorTwo(true);

        setStep(6);
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

        // setShowConErrorIndividualProfile(true);

        setStep(7);

        // if (errorsArray.length > 0) {
        // setShowErrorIndividualProfile(true);
        // setTimeout(() => {
        //     setShowError(false);
        // }, 1500);
        // }
    }

    async function onSubmitThreeCompanyProfile(values: z.infer<typeof formSchemaThreeCompanyProfile>) {
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setShowConErrorTwo(true);
            console.log('valid fail ok')
            return;
        }

        console.log(values)
        setLoading(true);

        // setShowConErrorIndividualProfile(true);

        setStep(7);

        // if (errorsArray.length > 0) {
        // setShowErrorIndividualProfile(true);
        // setTimeout(() => {
        //     setShowError(false);
        // }, 1500);
        // }
    }

    async function onSubmitThreeONGProfile(values: z.infer<typeof formSchemaThreeCompanyProfile>) {
        const isValidPhone = isPhoneValid(values.tel);

        if (!isValidPhone) {
            setShowConErrorTwo(true);
            console.log('valid fail ok')
            return;
        }

        console.log(values)
        setLoading(true);

        // setShowConErrorIndividualProfile(true);

        setStep(7);

        // if (errorsArray.length > 0) {
        // setShowErrorIndividualProfile(true);
        // setTimeout(() => {
        //     setShowError(false);
        // }, 1500);
        // }
    }

    async function onSubmitStepFour(values: z.infer<typeof formSchemaFour>) {
        console.log(values)
        setLoading(true);

        setStep(5);

        // setShowConErrorCreateAccess(true);

        // if (errorsArray.length > 0) {
        // setShowErrorCreateAccess(true);
        // setTimeout(() => {
        //     setShowErrorCreateAccess(false);
        // }, 1500);
        // }

        // const res = await signIn("client", {
        //     username: values.username,
        //     password: values.password,
        //     redirect: false
        // });

        // if (res?.error) {
        //     setLoading(false);
        //     return toast.error(res.error, {
        //         className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
        //     });
        // }

        // router.push(Routes.auth.validateAccount.replace('{lang}', lang));
    }

    return (
        <div>
            {/*<div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <SignUpCountryChoice countries={countries} onSubmit={onSubmit} lang={lang} showError={showError} errorsArray={errorsArray} stepOne={stepOne} showConError={showConError} />*/}
            {/*</div>*/}
            {/*<div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <VerifyEmail showErrorVerifyEmail={showErrorVerifyEmail} errorsArrayVerifyEmail={errorsArrayVerifyEmail} stepVerifyEmail={stepVerifyEmail} showConErrorVerifyEmail={showConErrorVerifyEmail} lang={lang} onSubmitVerifyEmail={onSubmitVerifyEmail} handleGoToBack={handleGoToBack} />*/}
            {/*</div>*/}
            {/*<div className={`duration-200 ${step == 3 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <ValidateEmail showErrorValidateEmail={showErrorValidateEmail} errorsArrayValidateEmail={errorsArrayValidateEmail} stepValidateEmail={stepValidateEmail} showConErrorValidateEmail={showConErrorValidateEmail} lang={lang} onSubmitValidateEmail={onSubmitValidateEmail} handleGoToBack={handleGoToBack} stepVerifyEmail={stepVerifyEmail} step={step} />*/}
            {/*</div>*/}
            {/*<div className={`duration-200 ${step == 4 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <SignUpCreateAccess showErrorCreateAccess={showErrorCreateAccess} errorsArrayCreateAccess={errorsArrayCreateAccess} stepFour={stepFour} showConErrorCreateAccess={showConErrorCreateAccess} lang={lang} onSubmitStepFour={onSubmitStepFour} handleGoToBack={handleGoToBack} />*/}
            {/*</div>*/}
            {/*<div className={`duration-200 ${step == 5 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <SignUpProfileChoice showErrorTwo={showErrorTwo} errorsArrayTwo={errorsArrayTwo} stepTwo={stepTwo} showConErrorTwo={showConErrorTwo} lang={lang} onSubmitTwo={onSubmitTwo} handleGoToBack={handleGoToBack} />*/}
            {/*</div>*/}
            {/*<div className={`duration-200 ${step == 6 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    {stepThreeForm == "individual" &&*/}
            {/*      <SignUpIndividualProfile showErrorIndividualProfile={showErrorIndividualProfile} errorsArrayIndividualProfile={errorsArrayThreeIndividualProfile} stepThreeIndividualProfile={stepThreeIndividualProfile} showConErrorIndividualProfile={showConErrorIndividualProfile} lang={lang} onSubmitThreeIndividualProfile={onSubmitThreeIndividualProfile} handleGoToBack={handleGoToBack} />*/}
            {/*    }*/}
            {/*    {stepThreeForm == "company" &&*/}
            {/*        <SignUpCompanyProfile showErrorCompanyProfile={showErrorCompanyProfile} errorsArrayCompanyProfile={errorsArrayThreeCompanyProfile} stepThreeCompanyProfile={stepThreeCompanyProfile} showConErrorCompanyProfile={showConErrorCompanyProfile} lang={lang} onSubmitThreeCompanyProfile={onSubmitThreeCompanyProfile} handleGoToBack={handleGoToBack} />*/}
            {/*    }*/}
            {/*    {stepThreeForm == "ong" &&*/}
            {/*        <SignUpONGProfile showErrorONGProfile={showErrorONGProfile} errorsArrayONGProfile={errorsArrayThreeONGProfile} stepThreeONGProfile={stepThreeONGProfile} showConErrorONGProfile={showConErrorONGProfile} lang={lang} onSubmitThreeONGProfile={onSubmitThreeONGProfile} handleGoToBack={handleGoToBack} />*/}
            {/*    }*/}
            {/*</div>*/}
            <div className={`duration-200 ${step == 7 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpFilesInfo lang={lang} handleGoToBack={handleGoToBack} handleGoToNext={handleGoToNext} />
            </div>
            <div className={`duration-200 ${step == 8 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpFilesUpload lang={lang} handleGoToBack={handleGoToBack} handleGoToNext={handleGoToNext} />
            </div>
            <div className={`duration-200 ${step == 9 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpOK lang={lang} />
            </div>
        </div>
    );
}