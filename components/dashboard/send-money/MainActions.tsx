"use client"

import { Locale } from "@/i18n.config";
import SupportShortcut from "@/components/dashboard/serenity-space/SupportShortcut";
import {ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import Beneficiary from "@/components/dashboard/send-money/Beneficiary";
import AccountListAndTransactions from "@/components/dashboard/send-money/AccountListAndTransactions";
import {SearchParams} from "@/core/interfaces";
import {searchParamsSchema} from "@/components/dashboard/send-money/validations";
import MainActions from "@/components/dashboard/send-money/modals/MainActions";
import Link from "next/link";
import Routes from "@/components/Routes";
import {auth, signOut} from "@/auth";
import {IUser} from "@/core/interfaces/user";
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import {ICountry} from "@/core/interfaces/country";
import {getMerchantBeneficiaries} from "@/core/apis/beneficiary";
import {getCountries, getCountryOperators} from "@/core/apis/country";
import { useState, useEffect } from "react";

export interface IndexPageProps {
    // params: { lang: Locale },
    lang: Locale,
    merchant: IUser,
}


export default function SendMoneyMainActions({ lang, merchant }: IndexPageProps) {

    const [beneficiaries, setBeneficiaries] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setLoading] = useState(false);

    function fetchMerchantBeneficiaries() {
        // @ts-ignore
        getMerchantBeneficiaries(String(merchant.merchantsIds[0].id), String(merchant.accessToken))
        .then(data => {
            setBeneficiaries(data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            setBeneficiaries([]);
        });
    }

    function fetchCountries() {
        // @ts-ignore
        getCountries(String(merchant.accessToken))
        .then(data => {
            setCountries(data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            setCountries([]);
        });
    }

    useEffect(() => {
        fetchCountries();
        fetchMerchantBeneficiaries();
    }, []);

    console.log(countries);
    console.log(beneficiaries);

    return (
        <>
            <div className={`w-[28%] 2xl:w-[26%]`}>
                <div className={`h-full bg-white px-6 py-8 rounded-2xl`}>
                    <div className={`flex flex-col space-y-2.5 ${isLoading && 'hidden'}`}>
                       <MainActions lang={lang} merchant={merchant} countries={countries} beneficiaries={beneficiaries}/>
                    </div>
                       <Beneficiary lang={lang} merchant={merchant} beneficiaries={beneficiaries}/>
                </div>
            </div>
        </>
    );
}