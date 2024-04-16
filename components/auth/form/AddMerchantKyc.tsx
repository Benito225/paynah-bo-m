"use client"
import {Locale} from "@/i18n.config";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next13-progressbar";
import SignUpFilesInfo from "@/components/auth/form/SignUpFilesInfo";
import SignUpFilesUpload from "@/components/auth/form/SignUpFilesUpload";
import SignUpOK from "@/components/auth/form/SignUpOK";
import {IUser} from "@/core/interfaces/user";

interface AddMerchantKycProps {
    lang: Locale,
    merchant: IUser,
    merchantIdsInfos: any,
    legalForm: {
        id: string;
        name: string;
        code: string;
        skaleetId: string;
        sk_document: any[];
        company_type: number
    }
}

const formSchema = z.object({
    kycFiles: z.array(
        z.object({
            title: z.string(),
            file: z.string().refine((val) => val.length > 0, {
                message: 'Le fichier est requis',
            }),
        })
    ),
})

export default function AddMerchantKyc({ lang, merchant, merchantIdsInfos, legalForm }: AddMerchantKycProps) {

    console.log(legalForm);

    const [isLoading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [stepThreeForm, setStepThreeForm] = useState('individual');
    const [showError, setShowError] = useState(false);
    const [showConError, setShowConError] = useState(false);


    const router = useRouter();

    const stepOne = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    const errorsArray = Object.values(stepOne.formState.errors);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);

        // setShowConError(true);

        setStep(3);

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

    return (
        <div>
            <div className={`duration-200 ${step == 1 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpFilesInfo lang={lang} handleGoToBack={handleGoToBack} handleGoToNext={handleGoToNext} legalForm={legalForm} />
            </div>
            <div className={`duration-200 ${step == 2 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpFilesUpload lang={lang} handleGoToBack={handleGoToBack} handleGoToNext={handleGoToNext} legalForm={legalForm} isLoading={isLoading} errorsArray={errorsArray} />
            </div>
            <div className={`duration-200 ${step == 3 ? 'block fade-in' : 'hidden fade-out'}`}>
                <SignUpOK lang={lang} />
            </div>
        </div>
    );
}