import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import AuthSendOtpForm from "@/components/auth/form/SendOtp";

export default async function SendOtpPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const {page} = await getDictionary(lang)

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <div className={`formContainer mx-auto max-w-lg`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`font-semibold text-center text-3xl mb-3`}>Pas de panique !</h2>
                    <p className={`text-[#626262] text-base`}>Renseignez l’adresse e-mail associée à votre compte et nous vous enverrons un code OTP pour refaire votre clé.</p>
                </div>
                <AuthSendOtpForm  lang={lang} />
            </div>
        </div>
    );
}