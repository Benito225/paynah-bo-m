"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {ChevronRight, Send} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCFA, formatDate, getStatusBadge} from "@/lib/utils";

interface LastTransactionsProps {
    lang: Locale
}

export enum TransactionsStatus {
    DONE = 'approved',
    PENDING = 'pending',
    REJECTED = 'rejected',
    EXPIRED = 'expired',
}

export default function LastTransactions({lang}: LastTransactionsProps) {
    const transactions = [
        {
            tId: "24553FS3AS",
            date: "2023-04-20",
            type: "Envoi d'argent",
            amount: 50000,
            status: 'approved',
        },
        {
            tId: "24553FS3AS",
            date: "2023-03-24",
            type: "Envoi d'argent",
            amount: 50000,
            status: 'approved',
        },
        {
            tId: "24553FS3AS",
            date: "2023-03-24",
            type: "Lien de paiement",
            amount: 20000,
            status: 'pending',
        },
        {
            tId: "24553FS3AS",
            date: "2023-04-20",
            type: "Envoi d'argent",
            amount: 50000,
            status: 'approved',
        },
        {
            tId: "24553FS3AS",
            date: "2023-03-24",
            type: "Lien de paiement",
            amount: 50000,
            status: 'approved',
        },
        {
            tId: "24553FS3AS",
            date: "2023-12-20",
            type: "Envoi d'argent",
            amount: 100000,
            status: 'rejected',
        },
        {
            tId: "24553FS3AS",
            date: "2023-09-05",
            type: "Envoi d'argent",
            amount: 500000,
            status: 'approved',
        },
        {
            tId: "24553FS3AS",
            date: "2023-03-09",
            type: "Lien de paiement",
            amount: 50000,
            status: 'expired',
        }
    ];

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
            <div className={`mt-5`}>
                <Table>
                    <TableHeader>
                        <TableRow className={`text-xs border-[#f4f4f4]`}>
                            <TableHead className={`text-[#afafaf] font-light h-9 min-w-[8rem]`}>ID Transaction</TableHead>
                            <TableHead className={`text-[#afafaf] font-light h-9 min-w-[7rem]`}>Date</TableHead>
                            <TableHead className={`text-[#afafaf] font-light h-9`}>Type</TableHead>
                            <TableHead className={`text-[#afafaf] font-light h-9`}>Amount</TableHead>
                            <TableHead className={`text-[#afafaf] font-light h-9`}>Statut</TableHead>
                            <TableHead className={`text-[#afafaf] font-light h-9 text-center`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow className={`border-[#f4f4f4]`} key={transaction.tId}>
                                <TableCell className="text-xs !py-3.5">{transaction.tId}</TableCell>
                                <TableCell className="text-xs !py-3.5">{formatDate(transaction.date)}</TableCell>
                                <TableCell className="text-xs !py-3.5">{transaction.type}</TableCell>
                                <TableCell className="text-xs !py-3.5">{formatCFA(transaction.amount)}</TableCell>
                                <TableCell className="text-xs !py-3.5">
                                    <div dangerouslySetInnerHTML={{__html: getStatusBadge(transaction.status)}}></div>
                                </TableCell>
                                <TableCell className="text-xs !py-3 text-center">
                                    <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1`}>
                                        <svg className={`h-3 w-auto`} viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"/>
                                            <circle cx="12" cy="5" r="1"/>
                                            <circle cx="12" cy="19" r="1"/>
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}