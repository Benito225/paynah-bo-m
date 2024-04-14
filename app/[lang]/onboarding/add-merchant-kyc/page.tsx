import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import AddMerchantKyc from "@/components/auth/form/AddMerchantKyc";

export default async function AddMerchantPage({params: { lang }}: {
    params: { lang: Locale }
}) {
    const {page} = await getDictionary(lang)

    return (
        <div className={`max-w-screen-2xl mx-auto py-5 px-4 md:px-6 lg:px-8`}>
            <AddMerchantKyc lang={lang} />
        </div>
    );
}