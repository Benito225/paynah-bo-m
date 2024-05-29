'use client'

import { Locale } from "@/i18n.config";
import React, { useState, useEffect } from "react";
import Beneficiary from "@/components/dashboard/send-money/Beneficiary";
import MainActions from "@/components/dashboard/send-money/modals/MainActions";
import {IUser} from '@/core/interfaces/user';
import { getMerchantBankAccounts } from "@/core/apis/bank-account";
import { getMerchantBeneficiaries } from "@/core/apis/beneficiary";
import { getOperators } from "@/core/apis/operator";
import { getTransactions } from "@/core/apis/transaction";
import {IAccount} from "@/core/interfaces/account";
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import { IOperator } from "@/core/interfaces/operator";

interface CustomOperationsProps {
    lang: Locale,
    searchItems: {
        per_page: number,
        page: number,
        search?: string,
        from?: string,
        sort?: string,
        to?: string,
        status?: string
    },
    merchant: IUser
}

export default function CustomOperations({ lang, searchItems, merchant }: CustomOperationsProps) {

    const [beneficiaries, setBeneficiaries] = useState<IBeneficiary[]>([]);
    const [operators, setOperators] = useState<IOperator[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [isBeneficiaryActionLoading, setBeneficiaryActionLoading] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fetchOperators() {
        // @ts-ignore
        getOperators(String(merchant.accessToken))
        .then(data => {
            console.log('OPERATEUR', data);
            setOperators(data);
            setLoading(false);
            setBeneficiaryActionLoading(true);
        })
        .catch(err => {
            setOperators([]);
            setLoading(false);
            setBeneficiaryActionLoading(true);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fetchMerchantBeneficiaries() {
        // @ts-ignore
        getMerchantBeneficiaries(String(merchant.merchantsIds[0].id), String(merchant.accessToken))
        .then(data => {
            console.log(data);
            setBeneficiaries(data);
            setLoading(false);
            setBeneficiaryActionLoading(true);
        })
        .catch(err => {
            setBeneficiaries([]);
            setLoading(false);
            setBeneficiaryActionLoading(true);
        });
    }

    useEffect(() => {
        if (!isBeneficiaryActionLoading) {
            fetchMerchantBeneficiaries()
            fetchOperators()
        }
    }, [fetchMerchantBeneficiaries, fetchOperators, isBeneficiaryActionLoading]);

    return (
        <div className={`h-full bg-white px-6 py-8 rounded-2xl`}>
            <div className={`flex flex-col space-y-2.5`}>
               <MainActions lang={lang} merchant={merchant} operators={operators}/>
            </div>
            <Beneficiary lang={lang} merchant={merchant} beneficiaries={beneficiaries}/>
        </div>
    )
}