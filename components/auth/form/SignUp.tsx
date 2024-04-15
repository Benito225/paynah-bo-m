"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next13-progressbar";
import SignUpCountryChoice from "@/components/auth/form/SignUpCountryChoice";
import { PhoneNumberUtil } from 'google-libphonenumber';
import SignUpCreateAccess from "@/components/auth/form/SignUpCreateAccess";
import VerifyEmail from "@/components/auth/form/VerifyEmail";
import ValidateEmail from "@/components/auth/form/ValidateEmail";
import SignUpOK from "@/components/auth/form/SignUpOK";
import {createPassword, createUserAccount} from "@/core/apis/signup";
import toast from "react-hot-toast";
import {useCookies} from "react-cookie";
import {resetPassword, sendOtp, validateOtp} from "@/core/apis/login";
import Routes from "@/components/Routes";
import {signIn} from "next-auth/react";

interface AuthSignUpFormProps {
    lang: Locale,
    countries: {id: string, name: string, code: string, distributorId: string}[]
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

const formSchemaFour = z.object({
    password: z.string().min(1, {
        message: "Le champ clé d'accès est requis"
    }),
    password_confirmation: z.string().min(1, {
        message: "Le champ confirmation clé d'accès est requis"
    })
}).refine(data => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
});

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function AuthSignUpForm({ lang, countries }: AuthSignUpFormProps) {

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);

    const [countValue, setCountValue] = useState(0);

    const [showErrorTwo, setShowErrorTwo] = useState(false);
    const [showConErrorTwo, setShowConErrorTwo] = useState(false);

    const [showErrorVerifyEmail, setShowErrorVerifyEmail] = useState(false);
    const [showConErrorVerifyEmail, setShowConErrorVerifyEmail] = useState(false);

    const [showErrorValidateEmail, setShowErrorValidateEmail] = useState(false);
    const [showConErrorValidateEmail, setShowConErrorValidateEmail] = useState(false);

    // Step 4
    const [showErrorCreateAccess, setShowErrorCreateAccess] = useState(false);
    const [showConErrorCreateAccess, setShowConErrorCreateAccess] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['userID', 'newUserToken']);


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
    const errorsArrayCreateAccess = Object.values(stepFour.formState.errors);

    const newUserToken = cookies["newUserToken"];
    const userID = cookies["userID"];

    useEffect(() => {
        if (userID) {
            setStep(3);
        }

        if (newUserToken) {
            setStep(4);
        }
    }, []);



    async function onSubmit(values: z.infer<typeof formSchema>) {
        // setLoading(true);

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
        setLoading(true);
        const data = {
            login: values.email,
            country: stepOne.getValues('country')
        };
        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const createAccountRes = await createUserAccount(data);


        console.log(createAccountRes);

        if (!createAccountRes.success) {
            setLoading(false);
            setShowConErrorVerifyEmail(true);
            toast.dismiss(toastLoading);

            return toast.error(createAccountRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setLoading(false);
            toast.dismiss(toastLoading);
            setCookie('userID', createAccountRes.data);

            toast.success("Compte ajouté ! Veuillez confirmer votre email SVP !", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            setCountValue(300);
            setStep(3);
        }
    }

    async function onSubmitValidateEmail(values: z.infer<typeof formSchemaValidateEmail>) {
        setLoading(true);

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const validateOtpRes = await validateOtp(values, stepVerifyEmail.getValues('email'));


        console.log(validateOtpRes);

        if (!validateOtpRes.success) {
            setLoading(false);
            setShowConErrorVerifyEmail(true);
            toast.dismiss(toastLoading);

            return toast.error(validateOtpRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            setLoading(false);
            toast.dismiss(toastLoading);
            setCookie('newUserToken', validateOtpRes.data);

            toast.success("Email confirmé ! Créez vos accès !", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            setCountValue(300);
            setStep(4);
        }
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


    async function onSubmitStepFour(values: z.infer<typeof formSchemaFour>) {
        setLoading(true);
        setShowConErrorCreateAccess(false);

        // const newUserToken = cookies["newUserToken"];
        // const userID = cookies["userID"];

        if (!newUserToken || !userID) {
            setLoading(false);
            setStep(1);
            return;
        }

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const createPasswordRes = await createPassword(values, newUserToken.passwordToken);

        if (!createPasswordRes.success) {
            setLoading(false);
            setShowConErrorCreateAccess(true);

            toast.dismiss(toastLoading);
            return toast.error(createPasswordRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });
        } else {
            toast.dismiss(toastLoading);

            toast.success("Clé ajouté avec succès", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });

            removeCookie('userID');
            removeCookie('newUserToken');

            await signIn("merchant", {
                accessToken: createPasswordRes.data.accessToken,
                refreshToken: createPasswordRes.data.refreshToken,
                redirect: true
            });
        }
    }

    async function reSendOtp() {
        setLoading(true);
        const username = stepVerifyEmail.getValues('email');

        if (!username) {
            setStep(1);
            return;
        }

        const values = {
            username: username
        };

        const toastLoading = toast.loading('Action en cours de traitement...', {
            className: 'text-sm font-medium !max-w-xl !shadow-2xl border border-[#ededed]'
        });
        const sendOtpRes = await sendOtp(values);

        if (!sendOtpRes.success) {
            setLoading(false);
            toast.dismiss(toastLoading);

            return toast.error(sendOtpRes.message, {
                className: '!bg-red-50 !max-w-xl !text-red-600 !shadow-2xl !shadow-red-50/50 text-sm font-medium'
            });

        } else {
            setLoading(false);
            toast.dismiss(toastLoading);
            setCountValue(300);

            return toast.success("Code envoyé avec succès !", {
                className: '!bg-green-50 !max-w-xl !text-green-600 !shadow-2xl !shadow-green-50/50 text-sm font-medium'
            });
        }
    }

    return (
        <div>
            <div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpCountryChoice countries={countries} onSubmit={onSubmit} lang={lang} showError={showError} errorsArray={errorsArray} stepOne={stepOne} showConError={showConError} />
            </div>
            <div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>
                <VerifyEmail showErrorVerifyEmail={showErrorVerifyEmail} errorsArrayVerifyEmail={errorsArrayVerifyEmail} stepVerifyEmail={stepVerifyEmail} showConErrorVerifyEmail={showConErrorVerifyEmail} lang={lang} onSubmitVerifyEmail={onSubmitVerifyEmail} handleGoToBack={handleGoToBack} isLoading={isLoading} />
            </div>
            <div className={`duration-200 ${step == 3 ? 'block fade-in' : 'hidden fade-out'}`}>
                <ValidateEmail showErrorValidateEmail={showErrorValidateEmail} errorsArrayValidateEmail={errorsArrayValidateEmail} stepValidateEmail={stepValidateEmail} showConErrorValidateEmail={showConErrorValidateEmail} lang={lang} onSubmitValidateEmail={onSubmitValidateEmail} handleGoToBack={handleGoToBack} stepVerifyEmail={stepVerifyEmail} step={step} isLoading={isLoading} reSendOtp={reSendOtp}/>
            </div>
            <div className={`duration-200 ${step == 4 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpCreateAccess showErrorCreateAccess={showErrorCreateAccess} errorsArrayCreateAccess={errorsArrayCreateAccess} stepFour={stepFour} showConErrorCreateAccess={showConErrorCreateAccess} lang={lang} onSubmitStepFour={onSubmitStepFour} handleGoToBack={handleGoToBack} isLoading={isLoading} />
            </div>
            {/*<div className={`duration-200 ${step == 5 ? 'block fade-in' : 'hidden fade-out'}`}>*/}
            {/*    <SignUpOK lang={lang} />*/}
            {/*</div>*/}
        </div>
    );
}