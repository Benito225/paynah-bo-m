"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ChevronRight, Send} from "lucide-react";
import Image from "next/image";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatCFA, hiddeBalance} from "@/lib/utils";
import Link from "next/link";

interface PendingOperationProps {
    lang: Locale
}

export default function PendingOperation({lang}: PendingOperationProps) {

    return (
        <div className={`bg-white sales-point flex-grow min-h-[19rem] rounded-2xl px-6 py-5`}>
            <div className={`flex items-center justify-between border-b border-[#f1f1f1] pb-1.5 border-dashed`}>
                <h2 className={`font-medium text-base`}>Opération en attente</h2>
                <div>
                    <Link className={`inline-flex items-center text-sm text-[#909090] hover:underline duration-200`} href={`#`}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`flex justify-center items-center h-full`}>
                <div className={`inline-flex flex-col justify-center`}>
                    <span className={`text-xs text-[#7d7d7d] mt-1`}>Aucune opération en attente</span>
                </div>
            </div>
        </div>
    );
}