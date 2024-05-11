"use client"

import {Locale} from "@/i18n.config";
import React, {useState, useEffect} from "react";
import {ChevronRight, Plus, Send} from "lucide-react";
import Link from "next/link";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Routes from "@/components/Routes";
import {IUser} from "@/core/interfaces/user";
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import {getMerchantBeneficiaries} from "@/core/apis/beneficiary";
interface BeneficiaryProps {
    lang: Locale,
    merchant: IUser,
}

export const RANDOM_AVATAR_COLORS_CONFIG = [
    {bg: '#ffc5ae', text: '#ff723b'},
    {bg: '#aedaff', text: '#31a1ff'},
    {bg: '#e0aeff', text: '#bc51ff'},
    {bg: '#aeffba', text: '#02b71a'},
    {bg: '#ffadae', text: '#e03c3e'},
]

export default function Beneficiary({lang, merchant}: BeneficiaryProps) {

    const [isLoading, setLoading] = useState(false);
    const [beneficiaries, setBeneficiaries] = useState([]);

    const transformBeneficiaryFullNameToBeneficiaryAvatar = (beneficiaryFullName: string) => {
        const beneficiaryFullNameSplit = beneficiaryFullName.trim().length > 0 ? beneficiaryFullName.split(' ') : [];
        const beneficiaryFullNameAvatar = beneficiaryFullNameSplit.length > 0 ? ( beneficiaryFullNameSplit.length >= 2 ? `${beneficiaryFullNameSplit[0][0]}${beneficiaryFullNameSplit[1][0]}` : `${beneficiaryFullNameSplit[0][0]}`) : '';
        return beneficiaryFullNameAvatar;
    }
    
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

    useEffect(() => {
        fetchMerchantBeneficiaries();
    }, []);


    return (
        <div className={`mt-8`}>
            <div className={`flex items-center justify-between pb-1.5 border-dashed`}>
                <h2 className={`font-medium text-base 2xl:text-lg`}>Bénéficiaires enregistrés</h2>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={Routes.dashboard.beneficiaries.replace('{lang}', lang)}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`mt-4`}>
                <h3 className={`text-xs font-light text-gray-400`}>Bénéficiaires individuels</h3>
                <div className={`inline-flex space-x-1 mt-2`}>
                {
                    beneficiaries && beneficiaries.length > 0 &&
                    beneficiaries.slice(0,5).map((beneficiary: IBeneficiary, index: number) => (
                        <Avatar key={beneficiary.id} className={`cursor-pointer`}>
                            <AvatarFallback className={`bg-[${RANDOM_AVATAR_COLORS_CONFIG[index].bg}] text-[${RANDOM_AVATAR_COLORS_CONFIG[index].text}]`}>
                            {transformBeneficiaryFullNameToBeneficiaryAvatar(`${beneficiary.lastName} ${beneficiary.firstName}`)}
                            </AvatarFallback>
                        </Avatar>
                    ))
                }
                    <button>
                        <Avatar className={`cursor-pointer border border-[#cdcdcd] border-dashed`}>
                            <AvatarFallback className={`bg-transparent text-[#cdcdcd]`}>
                                <Plus className={`h-4`} />
                            </AvatarFallback>
                        </Avatar>
                    </button>
                </div>
            </div>
            <div className={`mt-6`}>
                <h3 className={`text-xs font-light text-gray-400`}>Bénéficiaires groupés</h3>
            </div>
        </div>
    );
}