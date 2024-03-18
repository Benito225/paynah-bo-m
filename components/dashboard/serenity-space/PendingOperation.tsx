"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Check, ChevronRight, Send, X} from "lucide-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import Link from "next/link";

interface PendingOperationProps {
    lang: Locale
}

export default function PendingOperation({lang}: PendingOperationProps) {

    return (
        <div className={`bg-white sales-point flex-grow rounded-2xl px-4 2xl:px-6 py-5`}>
            <div className={`flex items-center justify-between border-b border-[#f1f1f1] pb-1.5 border-dashed`}>
                <h2 className={`font-medium text-base 2xl:text-base`}>Approbations</h2>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={`#`}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`mt-5`}>
                <ul className={`flex flex-col divide-y divide-[#f4f4f4]`}>
                    <li className={`py-2`}>
                        <div className={`flex justify-between items-center space-x-3 2xl:space-x-4`}>
                            <div className={`inline-flex flex-col`}>
                                <p className={`text-[13px] leading-4 2xl:leading-normal font-medium`}>Transfert de <span>{formatCFA(10000)}</span> vers <span>+225 07 77 40 41 36</span></p>
                                <p className={`font-light text-[#767676] text-[11px]`}>Initié par <span>Ben Ismaël</span></p>
                            </div>
                            <div className={`inline-flex space-x-2`}>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#19b2a6] border-[#19b2a6] hover:bg-[#dbfcef] duration-200`}>
                                    <Check strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#ff0000] border-[#ff0000] hover:bg-[#ffe8e8] duration-200`}>
                                    <X strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className={`py-2`}>
                        <div className={`flex justify-between items-center space-x-3 2xl:space-x-4`}>
                            <div className={`inline-flex flex-col`}>
                                <p className={`text-[13px] leading-4 2xl:leading-normal font-medium`}>Transfert de <span>{formatCFA(5000)}</span> vers <span>+225 07 77 40 41 36</span></p>
                                <p className={`font-light text-[#767676] text-[11px]`}>Initié par <span>Ben Ismaël</span></p>
                            </div>
                            <div className={`inline-flex space-x-2`}>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#19b2a6] border-[#19b2a6] hover:bg-[#dbfcef] duration-200`}>
                                    <Check strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#ff0000] border-[#ff0000] hover:bg-[#ffe8e8] duration-200`}>
                                    <X strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                            </div>
                        </div>
                    </li>
                    <li className={`py-2`}>
                        <div className={`flex justify-between items-center space-x-3 2xl:space-x-4`}>
                            <div className={`inline-flex flex-col`}>
                                <p className={`text-[13px] leading-4 2xl:leading-normal font-medium`}>Transfert de <span>{formatCFA(105000)}</span> vers <span>NPA32453SA</span></p>
                                <p className={`font-light text-[#767676] text-[11px]`}>Initié par <span>Jolivet Kouadio</span></p>
                            </div>
                            <div className={`inline-flex space-x-2`}>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#19b2a6] border-[#19b2a6] hover:bg-[#dbfcef] duration-200`}>
                                    <Check strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                                <button className={`rounded-full p-1.5 border-[1px] text-[#ff0000] border-[#ff0000] hover:bg-[#ffe8e8] duration-200`}>
                                    <X strokeWidth={3} className={`h-3.5 w-3.5`} />
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                {/*<div className={`inline-flex flex-col justify-center`}>*/}
                {/*    <span className={`text-xs text-[#7d7d7d] mt-1`}>Aucune opération en attente</span>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}