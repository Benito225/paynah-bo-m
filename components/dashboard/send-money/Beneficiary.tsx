"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import {ChevronRight, Plus, Send} from "lucide-react";
import Link from "next/link";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

interface BeneficiaryProps {
    lang: Locale
}

export default function Beneficiary({lang}: BeneficiaryProps) {

    return (
        <div className={`mt-8`}>
            <div className={`flex items-center justify-between pb-1.5 border-dashed`}>
                <h2 className={`font-medium text-base 2xl:text-lg`}>Bénéficiaires enregistrés</h2>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={`#`}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`mt-4`}>
                <h3 className={`text-xs font-light text-gray-400`}>Bénéficiaires individuels</h3>
                <div className={`inline-flex space-x-1 mt-2`}>
                    <Avatar className={`cursor-pointer`}>
                        <AvatarFallback className={`bg-[#ffc5ae] text-[#ff723b]`}>AD</AvatarFallback>
                    </Avatar>
                    <Avatar className={`cursor-pointer`}>
                        <AvatarFallback className={`bg-[#aedaff] text-[#31a1ff]`}>DB</AvatarFallback>
                    </Avatar>
                    <Avatar className={`cursor-pointer`}>
                        <AvatarFallback className={`bg-[#e0aeff] text-[#bc51ff]`}>JK</AvatarFallback>
                    </Avatar>
                    <Avatar className={`cursor-pointer`}>
                        <AvatarFallback className={`bg-[#aeffba] text-[#02b71a]`}>RA</AvatarFallback>
                    </Avatar>
                    <Avatar className={`cursor-pointer`}>
                        <AvatarFallback className={`bg-[#ffadae] text-[#e03c3e]`}>YA</AvatarFallback>
                    </Avatar>
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