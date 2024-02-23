"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Routes from "@/components/Routes";
import {useRouter} from "next13-progressbar";
import SignUpCountryChoice from "@/components/auth/form/SignUpCountryChoice";

interface AuthSignUpFormProps {
    lang: Locale
}

const formSchema = z.object({
    country: z.string().min(1, {
        message: "Le champ pays est requis"
    }),
})

export default function AuthSignUpForm({ lang }: AuthSignUpFormProps) {

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const router = useRouter();

    const stepOne = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "",
        }
    });

    const errorsArray = Object.values(stepOne.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);

        setShowConError(true);

        setStep(2);

        // router.push(Routes.auth.validateOtp.replace('{lang}', lang));

        // if (errorsArray.length > 0) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);
        // }
    }

    return (
        <div>
            <div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpCountryChoice onSubmit={onSubmit} lang={lang} showError={showError} errorsArray={errorsArray} stepOne={stepOne} showConError={showConError} />
            </div>
            <div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>
                Etape 2
            </div>
        </div>
    );
}