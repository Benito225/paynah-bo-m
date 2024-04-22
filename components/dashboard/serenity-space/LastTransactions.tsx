"use client"

import {Locale} from "@/i18n.config";
import React, {useState, useEffect} from "react";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {
    AlertTriangle,
    ChevronRight,
    ClipboardList,
    RotateCw,
} from "lucide-react";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCFA, formatDate, getStatusBadge} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

import {IUser} from "@/core/interfaces/user";
import {ITransaction} from "@/core/interfaces/transaction";
import {getTransactions} from "@/core/apis/transaction";

interface LastTransactionsProps {
    lang: Locale,
    merchant: IUser
}

export enum TransactionsStatus {
    DONE = 'approved',
    PENDING = 'pending',
    DECLINED = 'declined',
    EXPIRED = 'expired',
}

export enum TransactionsType {
    DEBIT = 'debit',
    CREDIT = 'credit',
}

export default function LastTransactions({lang, merchant}: LastTransactionsProps) {
    // const transactions = [
    //     {
    //         tId: "24553FS3AS",
    //         date: "2024-04-20T11:00:00",
    //         description: "Envoi d'argent",
    //         type: "debit",
    //         amount: 50000,
    //         status: 'approved',
    //     },
    //     {
    //         tId: "24557FS3AS",
    //         date: "2023-03-24T14:00:00",
    //         description: "Envoi d'argent",
    //         type: "credit",
    //         amount: 50000,
    //         status: 'approved',
    //     },
    //     {
    //         tId: "24556FS3AS",
    //         date: "2024-03-24T08:00:00",
    //         description: "Lien de paiement",
    //         type: "credit",
    //         amount: 20000,
    //         status: 'pending',
    //     },
    //     {
    //         tId: "24555FS3AS",
    //         date: "2024-04-20T20:00:00",
    //         description: "Envoi d'argent",
    //         type: "debit",
    //         amount: 50000,
    //         status: 'approved',
    //     },
    //     {
    //         tId: "24554FS3AS",
    //         date: "2024-03-24T12:00:00",
    //         description: "Lien de paiement",
    //         type: "debit",
    //         amount: 50000,
    //         status: 'approved',
    //     },
    //     {
    //         tId: "24558FS3AS",
    //         date: "2024-12-20T13:00:00",
    //         description: "Envoi d'argent",
    //         type: "credit",
    //         amount: 100000,
    //         status: 'declined',
    //     },
    //     {
    //         tId: "24559FS3AS",
    //         date: "2024-09-05T06:00:00",
    //         description: "Envoi d'argent",
    //         type: "debit",
    //         amount: 500000,
    //         status: 'approved',
    //     },
    //     {
    //         tId: "24513FS3AS",
    //         date: "2024-03-09T10:00:00",
    //         description: "Lien de paiement",
    //         type: "credit",
    //         amount: 50000,
    //         status: 'expired',
    //     }
    // ];

    const [isLoading, setLoading] = useState(false);
    const [showConError, setShowConError] = useState(false);
    const [transactions, setTransactions] = useState([]);

    function fecthTransactions() {
        getTransactions(String(merchant.merchantsIds[0].id), String(merchant.accessToken))
        .then(data => {
            // console.log(data, data);
            setTransactions(data);
        })
        .catch(err => {
            setTransactions([]);
        });
    }

    useEffect(() => {
        fecthTransactions()
    }, []);


    const formSchema = z.object({
        pAccount: z.string().min(1, {
            message: 'Le champ est requis'
        }),
    })

    const selectAccount = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pAccount: "",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setLoading(true);

        setShowConError(true);
    }

    return (
        <div className={`bg-white sales-point flex-grow rounded-2xl px-6 py-5`}>
            <div className={`flex items-center justify-between pb-1.5`}>
                <div className={`inline-flex items-center space-x-3`}>
                    <h2 className={`font-medium text-base`}>Transactions récentes</h2>
                    <Form {...selectAccount}>
                        <form onSubmit={selectAccount.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={selectAccount.control}
                                name="pAccount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Select onValueChange={field.onChange} defaultValue={'cp'}>
                                                    <SelectTrigger className={`h-[2.2rem] text-xs rounded-xl border border-[#f4f4f7] pl-2.5 pr-1 font-normal`} style={{
                                                        backgroundColor: field.value ? '#f4f4f7' : '#f4f4f7',
                                                    }}>
                                                        <SelectValue  placeholder="Choisir une devise"/>
                                                    </SelectTrigger>
                                                    <SelectContent className={`bg-[#f0f0f0]`}>
                                                        <SelectItem className={`font-normal text-xs px-7 focus:bg-gray-100`} value={'cp'}>
                                                            Compte principale
                                                        </SelectItem>
                                                        <SelectItem className={`font-normal text-xs px-7 focus:bg-gray-100`} value={'sc'}>
                                                            Salaire corporate
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <div>
                    <Link className={`inline-flex text-xs text-[#909090] hover:underline duration-200 mb-1`} href={`#`}>
                        <span>Voir tout</span>
                        <ChevronRight className={`h-4 w-auto`} />
                    </Link>
                </div>
            </div>
            <div className={`mt-3`}>
                <Table>
                    <TableHeader>
                        <TableRow className={`text-xs border-[#f4f4f4]`}>
                            <TableHead className={`text-[#afafaf] font-normal h-9 min-w-[8rem]`}>ID Transactions</TableHead>
                            <TableHead className={`text-[#afafaf] font-normal h-9 min-w-[7rem]`}>Descritpion</TableHead>
                            <TableHead className={`text-[#afafaf] font-normal h-9`}>Montant</TableHead>
                            <TableHead className={`text-[#afafaf] font-normal h-9 min-w-[7rem]`}>Date</TableHead>
                            <TableHead className={`text-[#afafaf] font-normal h-9`}>Statut</TableHead>
                            <TableHead className={`text-[#afafaf] font-normal h-9 text-center`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction: ITransaction) => (
                            <TableRow className={`border-[#f4f4f4]`} key={transaction.tId}>
                                <TableCell className="text-xs font-medium !py-3.5">{transaction.tId}</TableCell>
                                <TableCell className="text-xs !py-3.5">{transaction.description}</TableCell>
                                <TableCell className="text-xs font-medium !py-3.5">
                                   <div className={`${transaction.type == TransactionsType.DEBIT ? 'text-[#ff0000]' : 'text-[#19b2a6]'}`}>{transaction.type == TransactionsType.DEBIT ? '-' : ''}{formatCFA(transaction.amount)}</div>
                                </TableCell>
                                <TableCell className="text-xs !py-3.5">{formatDate(transaction.date, lang)}</TableCell>
                                {/*<TableCell className="text-xs !py-3.5">*/}
                                {/*    <div>*/}
                                {/*        {transaction.type == "debit" ?*/}
                                {/*            <div className="inline-flex space-x-1 items-center">*/}
                                {/*                <span>Débit</span>*/}
                                {/*                <MoveUpRight className="h-4" />*/}
                                {/*            </div> : <div className="inline-flex space-x-1 items-center">*/}
                                {/*                <span>Crédit</span>*/}
                                {/*                <MoveDownLeft className="h-4" />*/}
                                {/*            </div>*/}
                                {/*        }*/}
                                {/*    </div>*/}
                                {/*</TableCell>*/}
                                <TableCell className="text-xs !py-3.5">
                                    <div dangerouslySetInnerHTML={{__html: getStatusBadge(transaction.status)}}></div>
                                </TableCell>
                                <TableCell className="text-xs !py-3 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                            <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1`}>
                                                <svg className={`h-3 w-auto`} viewBox="0 0 24 24"
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}