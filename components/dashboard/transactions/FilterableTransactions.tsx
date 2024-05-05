"use client"

import {Locale} from "@/i18n.config";
import React, {useState} from "react";
import TransactionsTable from "@/components/dashboard/transactions/TransactionsTable";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IUser} from "@/core/interfaces/user";

interface FilterableTransactionsProps {
    lang: Locale,
    searchItems: {
        per_page: number,
        page: number,
        search?: string,
        from?: string,
        sort?: string,
        to?: string,
        status?: string,
    },
    merchant: IUser
}

export default function FilterableTransactions({lang, searchItems, merchant}: FilterableTransactionsProps) {
    const [selectedAccount, setSelectedAccount] = useState('all');

    const formSchema = z.object({
        search: z.string()
    })

    const filterableForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        }
    });

    return (
        <div className={`flex flex-col h-full space-y-3`}>
            <div className={`account-list`}>
                <div className={`mb-4 mt-3`}>
                    <div className={`flex justify-between items-center`}>
                        <div className={`inline-flex items-center`}>
                            <h1 className={`text-2xl font-medium mr-4`}>Historique des transactions</h1>
                        </div>
                        <div>
                            <Button className={`px-6 items-center text-xs inline-flex space-x-2 items-center`}>
                                <svg className={`h-4 w-4`} viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" x2="12" y1="15" y2="3"/>
                                </svg>
                                <span>Exporter</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`h-full`}>
                <div className={`flex-grow rounded-3xl h-full`}>
                    <TransactionsTable searchItems={searchItems} lang={lang} selectedAccount={selectedAccount}  />
                </div>
            </div>
        </div>
    );
}