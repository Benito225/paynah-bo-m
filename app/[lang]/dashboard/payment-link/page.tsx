import {SearchParams} from "@/core/interfaces";
import {Locale} from "@/i18n.config";
import {searchParamsSchema} from "@/components/dashboard/send-money/validations";
import Link from "next/link";
import Routes from "@/components/Routes";
import {ChevronRight} from "lucide-react";
import SupportShortcut from "@/components/dashboard/serenity-space/SupportShortcut";
import MainActions from "@/components/dashboard/payment-link/modals/MainActions";
import Recipients from "@/components/dashboard/payment-link/Recipients";
import AccountListAndTransactions from "@/components/dashboard/payment-link/AccountListAndTransactions";
import {auth, signOut} from "@/auth";
import {IUser} from "@/core/interfaces/user";

export interface PaymentLinkProps {
    searchParams: SearchParams,
    params: { lang: Locale },
}

export default async function PaymentLinkPage({params: { lang }, searchParams}: PaymentLinkProps) {
    const searchItems = searchParamsSchema.parse(searchParams);

    const session = await auth();
    
    let merchant;
    if (session && session.user) {
        merchant = session.user as IUser;
    } else {
        merchant = {} as IUser;
    }

    return (
        <>
            <div className={`max-w-screen-2xl 2xl:max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col`}>
                <div className={`flex justify-between items-center`}>
                    <div className={`inline-flex items-center space-x-0.5`}>
                        <Link href={Routes.dashboard.home.replace('{lang}', lang)} className={`text-base text-[#767676] tracking-tight`}>Serenity Space</Link>
                        <ChevronRight className={`h-4 w-4 text-[#767676]`} />
                        <h2 className={`text-base text-black tracking-tight`}>{`Lien de paiement`}</h2>
                    </div>
                    <div className={`py-2 px-3 bg-white rounded-xl inline-flex items-center space-x-3`}>
                        <span className={`text-xs`}>Avez vous des préoccupations ?</span>
                        <SupportShortcut lang={lang} />
                    </div>
                </div>
                <div className={`flex gap-3 mt-2.5 flex-grow`}>
                    <div className={`w-[28%] 2xl:w-[26%]`}>
                        <div className={`h-full bg-white px-6 py-8 rounded-2xl`}>
                            <div className={`flex flex-col space-y-2.5`}>
                               <MainActions lang={lang} />
                            </div>
                            <Recipients lang={lang} merchant={merchant}/>
                        </div>
                    </div>
                    <div className={`w-[72%] 2xl:w-[74%]`}>
                        <AccountListAndTransactions lang={lang} searchItems={searchItems} merchant={merchant} />
                    </div>
                </div>
            </div>
        </>
    );
}