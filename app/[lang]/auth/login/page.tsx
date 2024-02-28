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
            <div className={`formContainer mx-auto max-w-lg`}>
                <h1 className={`font-semibold text-center text-2xl md:text-3xl mb-14`}>{page.auth.login.title}</h1>
                <AuthFormConnexion lang={lang} />
                <div className={`text-center mt-6`}>
                    <Link href={Routes.auth.signUp.replace("{lang}", lang)} className={`text-sm font-medium hover:font-semibold inline-block mt-3 duration-100`}>{`Ouvrir mon compte`}</Link>
                </div>
            </div>
        </div>
    );
}
