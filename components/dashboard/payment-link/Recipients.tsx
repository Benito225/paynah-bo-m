"use client"

import {Locale} from "@/i18n.config";
import React, {useState, useEffect} from "react";
import {AlertTriangle, ChevronRight, ClipboardList, Plus, RotateCw, Send} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Routes from "@/components/Routes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IUser } from '@/core/interfaces/user';
import {IBeneficiary} from "@/core/interfaces/beneficiary";
import { getMerchantBeneficiaries } from "@/core/apis/beneficiary";
interface RecipientsProps {
    lang: Locale,
    merchant: IUser,
    beneficiaries: IBeneficiary[],
}

export const RANDOM_AVATAR_COLORS_CONFIG = [
    {bg: '#ffc5ae', text: '#ff723b'},
    {bg: '#aedaff', text: '#31a1ff'},
    {bg: '#e0aeff', text: '#bc51ff'},
    {bg: '#aeffba', text: '#02b71a'},
    {bg: '#ffadae', text: '#e03c3e'},
]

export default function Recipients({lang, merchant, beneficiaries}: RecipientsProps) {

    const [isLoading, setLoading] = useState(false);
    // const [beneficiaries, setBeneficiaries] = useState([]);

    const transformBeneficiaryFullNameToBeneficiaryAvatar = (beneficiaryFullName: string) => {
        const beneficiaryFullNameSplit = beneficiaryFullName.trim().length > 0 ? beneficiaryFullName.split(' ') : [];
        const beneficiaryFullNameAvatar = beneficiaryFullNameSplit.length > 0 ? ( beneficiaryFullNameSplit.length >= 2 ? `${beneficiaryFullNameSplit[0][0]}${beneficiaryFullNameSplit[1][0]}` : `${beneficiaryFullNameSplit[0][0]}`) : '';
        return beneficiaryFullNameAvatar;
    }

    function fetchMerchantBeneficiaries() {
        // @ts-ignore
        // getMerchantBeneficiaries(String(merchant.merchantsIds[0].id), String(merchant.accessToken))
        // .then(data => {
        //     setBeneficiaries(data);
        //     setLoading(false);
        // })
        // .catch(err => {
        //     setLoading(false);
        //     setBeneficiaries([]);
        // });
    }

    useEffect(() => {
        // fetchMerchantBeneficiaries();
    }, []);

    return (
        <div className={`mt-8`}>
            <div className={`flex items-center justify-between pb-1.5 border-dashed`}>
                <h2 className={`font-medium text-base 2xl:text-lg`}>Destinataires enregistrés</h2>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={Routes.dashboard.beneficiaries.replace('{lang}', lang)}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`mt-4 divide-y divide-[#f4f4f4]`}>
                {/* <div className={`py-2`}>
                    <div className={`flex justify-between items-center space-x-1`}>
                        <div className={`inline-flex space-x-2 items-center`}>
                            <Avatar className={`cursor-pointer`}>
                                <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                            </Avatar>
                            <div className={`inline-flex flex-col`}>
                                <h3 className={`text-[11px] font-medium`}>Didier Aney</h3>
                                <span className={`text-[10px] text-[#626262]`}>+225 07 09 87 35 23</span>
                                <span className={`text-[10px] -mt-[2.5px] text-[#626262]`}>didier.any@abba.com</span>
                            </div>
                        </div>
                        <div className={`inline-flex space-x-2`}>
                            <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1.5`}>
                                <Send className={`h-3.5 w-3.5`} />
                            </button>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                    <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1.5`}>
                                        <svg className={`h-3.5 w-3.5`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48 rounded-xl z-[100] shadow-md" align={"end"}>
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <ClipboardList className="mr-2 h-3.5 w-3.5" />
                                        <span className={`mt-[1.5px]`}>{`Détails de l'opération`}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <AlertTriangle className="mr-2 h-3.5 w-3.5" />
                                        <span className={`mt-[1.5px]`}>Faire une réclamation</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                        <RotateCw className="mr-2 h-3.5 w-3.5" />
                                        <span className={`mt-[1.5px]`}>{`Refaire l'opération`}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div> */}
                {
                    beneficiaries && beneficiaries.length > 0 &&
                    beneficiaries.slice(0, 5).map((beneficiary: IBeneficiary, index: number) => (
                        <div key={beneficiary.id} className={`py-2`}>
                            <div className={`flex justify-between items-center space-x-1`}>
                                <div className={`inline-flex space-x-2 items-center`}>
                                    <Avatar className={`cursor-pointer`}>
                                        <AvatarFallback className={`bg-[${RANDOM_AVATAR_COLORS_CONFIG[index].bg}] text-[${RANDOM_AVATAR_COLORS_CONFIG[index].text}]`}>
                                            {transformBeneficiaryFullNameToBeneficiaryAvatar(`${beneficiary.lastName} ${beneficiary.firstName}`)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={`inline-flex flex-col`}>
                                        <h3 className={`text-[11px] font-medium`}>{`${beneficiary.lastName} ${beneficiary.firstName}`}</h3>
                                        {/* <span className={`text-[10px] text-[#626262]`}>+225 07 09 87 35 23</span> */}
                                        <span className={`text-[10px] -mt-[2.5px] text-[#626262]`}>{beneficiary.email}</span>
                                    </div>
                                </div>
                                <div className={`inline-flex space-x-2`}>
                                    <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1.5`}>
                                        <Send className={`h-3.5 w-3.5`} />
                                    </button>
                                    {/* <DropdownMenu>
                                        <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                            <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1.5`}>
                                                <svg className={`h-3.5 w-3.5`} viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="1"/>
                                                    <circle cx="12" cy="5" r="1"/>
                                                    <circle cx="12" cy="19" r="1"/>
                                                </svg>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48 rounded-xl z-[100] shadow-md" align={"end"}>
                                            <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                <ClipboardList className="mr-2 h-3.5 w-3.5" />
                                                <span className={`mt-[1.5px]`}>{`Détails de l'opération`}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                <AlertTriangle className="mr-2 h-3.5 w-3.5" />
                                                <span className={`mt-[1.5px]`}>Faire une réclamation</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                                <RotateCw className="mr-2 h-3.5 w-3.5" />
                                                <span className={`mt-[1.5px]`}>{`Refaire l'opération`}</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu> */}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}