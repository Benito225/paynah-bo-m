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

interface LastTransactionsProps {
    lang: Locale
}

export default function LastTransactions({lang}: LastTransactionsProps) {

    return (
        <div className={`bg-white sales-point flex-grow rounded-2xl px-6 py-5`}>
            <div className={`flex items-center justify-between pb-1.5`}>
                <h2 className={`font-medium text-base`}>Transactions récentes</h2>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={`#`}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
        </div>
    );
}