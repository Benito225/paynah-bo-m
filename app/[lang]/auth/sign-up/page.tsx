import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import AuthSendOtpForm from "@/components/auth/form/SendOtp";
import AuthSignUpForm from "@/components/auth/form/SignUp";
import {fetchData} from "@/lib/api";

export default async function SendOtpPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const {page} = await getDictionary(lang)
    const countriesRes = await fetchData('/countries?all=true');
    const countries = countriesRes.data;

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <AuthSignUpForm lang={lang} countries={countries} />
        </div>
    );
}