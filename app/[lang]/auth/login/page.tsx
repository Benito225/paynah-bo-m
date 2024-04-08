import Image from "next/image";
import {Metadata} from "next";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import AuthFormConnexion from "@/components/auth/form/Connexion";
import Link from "next/link";
import Routes from "@/components/Routes";

export const metadata: Metadata = {
    title: "Connexion",
}

export default async function LoginPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const { page } = await getDictionary(lang)

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <AuthFormConnexion lang={lang} page={page} />
        </div>
    );
}
