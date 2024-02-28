import Image from "next/image";
import {Metadata} from "next";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import Link from "next/link";
import Routes from "@/components/Routes";
import AuthResetAccessForm from "@/components/auth/form/ResetAccess";

export const metadata: Metadata = {
    title: "Modifier les clés d'accès",
}

export default async function ResetAccessPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const { page } = await getDictionary(lang)

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <div className={`formContainer mx-auto max-w-lg`}>
                <div className={`text-center mb-10 md:mb-16`}>
                    <h2 className={`font-semibold text-center text-2xl md:text-3xl mb-3`}>Nous y sommes</h2>
                    <p className={`text-[#626262] text-sm md:text-base`}>{`Veuillez refaire une nouvelle clé pour l'accès à la sérénité financière`}</p>
                </div>
                <AuthResetAccessForm lang={lang} />
            </div>
        </div>
    );
}
