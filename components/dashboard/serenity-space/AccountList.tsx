"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ChevronRight, Plus, Send} from "lucide-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import Link from "next/link";
import { FlipVertical } from 'lucide-react';

interface AccountListProps {
    lang: Locale
}

export default function AccountList({lang}: AccountListProps) {

    return (
        <div className={`account-list`}>
            <div className={`grid grid-cols-3 2xl:grid-cols-4 gap-2.5 2xl:min-h-[10rem]`}>
                <div className={`bg-white flex flex-col justify-between space-y-6 2xl:space-y-8 p-4 rounded-3xl`}>
                    <div className={`flex justify-between items-start`}>
                        <div>
                            <div className={`inline-flex flex-col`}>
                                <div className={`mb-1 rounded-xl p-2 bg-[#f0f0f0] w-[2.7rem] h-[2.7rem] inline-flex justify-center items-center`}>
                                    <svg className={`h-[1.1rem] fill-[#767676] w-auto`} viewBox="0 0 19.474 17.751">
                                        <defs>
                                            <clipPath id="clipPath1">
                                                <rect width="19.474" height="17.751"/>
                                            </clipPath>
                                        </defs>
                                        <g transform="translate(0)">
                                            <g transform="translate(0)" clipPath="url(#clipPath1)">
                                                <path d="M18.422,131.245v.295c0,.477,0,.954,0,1.431a2.758,2.758,0,0,1-2.792,2.786q-6.191,0-12.381,0a4.087,4.087,0,0,1-1.4-.157A2.762,2.762,0,0,1,0,132.973c0-2.774,0-5.548,0-8.323a3.5,3.5,0,0,1,.2-1.361,2.764,2.764,0,0,1,2.566-1.728q6.432,0,12.863,0a2.743,2.743,0,0,1,2.7,2.075,2.966,2.966,0,0,1,.085.663c.012.555,0,1.109,0,1.664,0,.028,0,.057-.009.1H15.7a2.586,2.586,0,0,0-.235,5.165c.924.031,1.849.01,2.774.012h.184" transform="translate(0 -118.007)"/>
                                                <path d="M466.573,292.279c.486,0,.973,0,1.459,0a.906.906,0,0,1,.96.96q0,1.145,0,2.291a.9.9,0,0,1-.949.958c-.978,0-1.955.008-2.933,0a2.1,2.1,0,0,1-.055-4.2c.505-.018,1.012,0,1.517,0v0m-1.438,2.844v-.01c.078,0,.156,0,.233,0a.729.729,0,0,0-.034-1.458c-.141,0-.282,0-.422,0a.726.726,0,0,0-.124,1.435,3.1,3.1,0,0,0,.347.032" transform="translate(-449.52 -283.733)"/>
                                                <path d="M232.826,2.991q2.429-1.4,4.859-2.805a1.238,1.238,0,0,1,1.748.471c.1.163.189.328.295.512l-6.9,1.848,0-.027" transform="translate(-226.02 0)"/>
                                                <path d="M301.2,56.416h-6.9l-.006-.017c.036-.013.072-.029.109-.039q2.519-.675,5.039-1.349a1.292,1.292,0,0,1,1.639.937c.041.149.079.3.123.468" transform="translate(-285.691 -53.352)"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className={`text-[12px] font-light text-[#626262]`}>Salaire corporate</span>
                            </div>
                        </div>
                        <button className={`text-[#626262]`}>
                            <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="12" cy="5" r="1"/>
                                <circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                    </div>
                    <div className={`inline-flex flex-col`}>
                        <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Solde disponible</h3>
                        <span className={`text-base font-semibold`}>{formatCFA(2873456)}</span>
                    </div>
                </div>
                <div className={`bg-white flex flex-col justify-between space-y-6 2xl:space-y-8 p-4 rounded-3xl`}>
                    <div className={`flex justify-between items-start`}>
                        <div>
                            <div className={`inline-flex flex-col`}>
                                <div className={`mb-1 rounded-xl p-2 bg-[#f0f0f0] w-[2.7rem] h-[2.7rem] inline-flex justify-center items-center`}>
                                    <svg className={`h-[1.1rem] fill-[#767676] w-auto`} viewBox="0 0 19.474 17.751">
                                        <defs>
                                            <clipPath id="clipPath1">
                                                <rect width="19.474" height="17.751"/>
                                            </clipPath>
                                        </defs>
                                        <g transform="translate(0)">
                                            <g transform="translate(0)" clipPath="url(#clipPath1)">
                                                <path d="M18.422,131.245v.295c0,.477,0,.954,0,1.431a2.758,2.758,0,0,1-2.792,2.786q-6.191,0-12.381,0a4.087,4.087,0,0,1-1.4-.157A2.762,2.762,0,0,1,0,132.973c0-2.774,0-5.548,0-8.323a3.5,3.5,0,0,1,.2-1.361,2.764,2.764,0,0,1,2.566-1.728q6.432,0,12.863,0a2.743,2.743,0,0,1,2.7,2.075,2.966,2.966,0,0,1,.085.663c.012.555,0,1.109,0,1.664,0,.028,0,.057-.009.1H15.7a2.586,2.586,0,0,0-.235,5.165c.924.031,1.849.01,2.774.012h.184" transform="translate(0 -118.007)"/>
                                                <path d="M466.573,292.279c.486,0,.973,0,1.459,0a.906.906,0,0,1,.96.96q0,1.145,0,2.291a.9.9,0,0,1-.949.958c-.978,0-1.955.008-2.933,0a2.1,2.1,0,0,1-.055-4.2c.505-.018,1.012,0,1.517,0v0m-1.438,2.844v-.01c.078,0,.156,0,.233,0a.729.729,0,0,0-.034-1.458c-.141,0-.282,0-.422,0a.726.726,0,0,0-.124,1.435,3.1,3.1,0,0,0,.347.032" transform="translate(-449.52 -283.733)"/>
                                                <path d="M232.826,2.991q2.429-1.4,4.859-2.805a1.238,1.238,0,0,1,1.748.471c.1.163.189.328.295.512l-6.9,1.848,0-.027" transform="translate(-226.02 0)"/>
                                                <path d="M301.2,56.416h-6.9l-.006-.017c.036-.013.072-.029.109-.039q2.519-.675,5.039-1.349a1.292,1.292,0,0,1,1.639.937c.041.149.079.3.123.468" transform="translate(-285.691 -53.352)"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className={`text-[12px] font-light text-[#626262]`}>Salaire pompiste</span>
                            </div>
                        </div>
                        <button className={`text-[#626262]`}>
                            <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="12" cy="5" r="1"/>
                                <circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                    </div>
                    <div className={`inline-flex flex-col`}>
                        <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Solde disponible</h3>
                        <span className={`text-base font-semibold`}>{formatCFA(2873456)}</span>
                    </div>
                </div>
                <div className={`bg-white flex flex-col justify-between space-y-6 2xl:space-y-8 p-4 rounded-3xl hidden 2xl:block`}>
                    <div className={`flex justify-between items-start`}>
                        <div>
                            <div className={`inline-flex flex-col`}>
                                <div className={`mb-1 rounded-xl p-2 bg-[#f0f0f0] w-[2.7rem] h-[2.7rem] inline-flex justify-center items-center`}>
                                    <svg className={`h-[1.1rem] fill-[#767676] w-auto`} viewBox="0 0 19.474 17.751">
                                        <defs>
                                            <clipPath id="clipPath1">
                                                <rect width="19.474" height="17.751"/>
                                            </clipPath>
                                        </defs>
                                        <g transform="translate(0)">
                                            <g transform="translate(0)" clipPath="url(#clipPath1)">
                                                <path d="M18.422,131.245v.295c0,.477,0,.954,0,1.431a2.758,2.758,0,0,1-2.792,2.786q-6.191,0-12.381,0a4.087,4.087,0,0,1-1.4-.157A2.762,2.762,0,0,1,0,132.973c0-2.774,0-5.548,0-8.323a3.5,3.5,0,0,1,.2-1.361,2.764,2.764,0,0,1,2.566-1.728q6.432,0,12.863,0a2.743,2.743,0,0,1,2.7,2.075,2.966,2.966,0,0,1,.085.663c.012.555,0,1.109,0,1.664,0,.028,0,.057-.009.1H15.7a2.586,2.586,0,0,0-.235,5.165c.924.031,1.849.01,2.774.012h.184" transform="translate(0 -118.007)"/>
                                                <path d="M466.573,292.279c.486,0,.973,0,1.459,0a.906.906,0,0,1,.96.96q0,1.145,0,2.291a.9.9,0,0,1-.949.958c-.978,0-1.955.008-2.933,0a2.1,2.1,0,0,1-.055-4.2c.505-.018,1.012,0,1.517,0v0m-1.438,2.844v-.01c.078,0,.156,0,.233,0a.729.729,0,0,0-.034-1.458c-.141,0-.282,0-.422,0a.726.726,0,0,0-.124,1.435,3.1,3.1,0,0,0,.347.032" transform="translate(-449.52 -283.733)"/>
                                                <path d="M232.826,2.991q2.429-1.4,4.859-2.805a1.238,1.238,0,0,1,1.748.471c.1.163.189.328.295.512l-6.9,1.848,0-.027" transform="translate(-226.02 0)"/>
                                                <path d="M301.2,56.416h-6.9l-.006-.017c.036-.013.072-.029.109-.039q2.519-.675,5.039-1.349a1.292,1.292,0,0,1,1.639.937c.041.149.079.3.123.468" transform="translate(-285.691 -53.352)"/>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className={`text-[12px] font-light text-[#626262]`}>Factures</span>
                            </div>
                        </div>
                        <button className={`text-[#626262]`}>
                            <svg className={`h-4 w-auto`} viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="12" cy="5" r="1"/>
                                <circle cx="12" cy="19" r="1"/>
                            </svg>
                        </button>
                    </div>
                    <div className={`inline-flex flex-col`}>
                        <h3 className={`text-[10px] font-normal text-[#afafaf]`}>Solde disponible</h3>
                        <span className={`text-base font-semibold`}>{formatCFA(20873456)}</span>
                    </div>
                </div>
                <button type={"button"} className={`border border-dashed border-[#959596] flex flex-col justify-center items-center space-y-6 2xl:space-y-8 p-4 rounded-3xl text-[#767676]`}>
                    <div className={`inline-flex flex-col justify-center`}>
                        <Plus className={`h-6 w-auto`} />
                        <span className={`text-xs font-light mt-1 w-[80%] mx-auto text-center`}>Créer un nouveau compte</span>
                    </div>
                </button>
            </div>
        </div>
    );
}