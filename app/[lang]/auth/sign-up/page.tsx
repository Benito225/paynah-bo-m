import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import AuthSendOtpForm from "@/components/auth/form/SendOtp";
import AuthSignUpForm from "@/components/auth/form/SignUp";

export default async function SendOtpPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const {page} = await getDictionary(lang)

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <AuthSignUpForm lang={lang} />
        </div>
    );
}