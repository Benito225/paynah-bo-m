import {Locale} from "@/i18n.config";
import SupportShortcut from "@/components/dashboard/serenity-space/SupportShortcut";
import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import Beneficiary from "@/components/dashboard/send-money/Beneficiary";
import AccountListAndTransactions from "@/components/dashboard/send-money/AccountListAndTransactions";
import {SearchParams} from "@/core/interfaces";
import {searchParamsSchema} from "@/components/dashboard/send-money/validations";

export interface IndexPageProps {
    searchParams: SearchParams,
    params: { lang: Locale },
}

export default async function Home({params: { lang }, searchParams}: IndexPageProps) {
    const searchItems = searchParamsSchema.parse(searchParams);

    return (
        <>
            <div className={`max-w-screen-2xl 2xl:max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col`}>
                <div className={`flex justify-between items-center`}>
                    <div className={`inline-flex items-center space-x-0.5`}>
                        <h2 className={`text-base text-[#767676] tracking-tight`}>Serenity Space</h2>
                        <ChevronRight className={`h-4 w-4 text-[#767676]`} />
                        <h2 className={`text-base text-black tracking-tight`}>{`Envoi d'argent`}</h2>
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
                                <Button className={`w-full py-6`}>
                                    {`Envoyez de l'argent`}
                                </Button>
                                <Button className={`w-full text-black border border-black bg-transparent py-6 hover:text-white `}>
                                    {`Ajouter un bénéficiaire`}
                                </Button>
                            </div>
                            <Beneficiary lang={lang} />
                        </div>
                    </div>
                    <div className={`w-[72%] 2xl:w-[74%]`}>
                        <AccountListAndTransactions lang={lang} searchItems={searchItems} />
                    </div>
                </div>
            </div>
        </>
    );
}