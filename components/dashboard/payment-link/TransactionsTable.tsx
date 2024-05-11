"use client"

import React, {useState} from "react";
import { type ColumnDef } from "@tanstack/react-table"
import {
    filterableColumns,
    getColumns,
    searchableColumns
} from "@/components/dashboard/payment-link/transactions-table-columns";
import {useDataTable} from "@/hooks/use-data-table";
import {TDataTable} from "@/components/dashboard/payment-link/data-table/DataTable";

import { DateRange } from "react-day-picker"
import { startOfYear, endOfDay } from "date-fns"

interface TransactionsTableProps {
    searchItems: {
        per_page: number;
        page: number;
        search?: string;
        account?: string;
        from?: string;
        sort?: string;
        to?: string;
        status?: string
    },
    lang: string,
    selectedAccount: string
}

export type TransactionsDataType = {
    id: string
    transactionId: string
    date: string
    amount: number
    beneficiary: string
    account: string
    createdAt?: string
    status: "pending" | "approved" | "declined" | "expired"
}

export default function TransactionsTable({ searchItems, lang, selectedAccount }: TransactionsTableProps) {

    const [pSearch, setPSearch] = useState(searchItems.search ?? '');
    const [pStatus, setPStatus] = useState(searchItems.status ?? '');
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: searchItems.from ? new Date(searchItems.from) : startOfYear(new Date()),
        to: searchItems.to ? new Date(searchItems.to) : endOfDay(new Date()),
    })

    const data: TransactionsDataType[] = [
        {
            id: "1",
            transactionId: "135653FS34S",
            date: "2024-04-20T11:00:00",
            amount: 349774,
            beneficiary: "Kouamé Franck",
            account: "+225 07 77 40 41 36",
            status: "approved"
        },
        {
            id: "2",
            transactionId: "295893FS34S",
            date: "2023-04-20T11:00:00",
            amount: 2493774,
            beneficiary: "Ben Ismël DIOMANDE",
            account: "CI059093873683764849837",
            status: "approved"
        },
        {
            id: "3",
            transactionId: "245653FS34S",
            date: "2024-02-20T08:00:00",
            amount: 3493774,
            beneficiary: "Didier Aney",
            account: "CI059093873683764849837",
            status: "pending"
        },
        {
            id: "4",
            transactionId: "245653FS34S",
            date: "2024-04-20T11:00:00",
            amount: 3493774,
            beneficiary: "Koffi Olivier",
            account: "+225 07 73 44 11 00",
            status: "declined"
        },
        {
            id: "5",
            transactionId: "245653FS34S",
            date: "2024-01-20T11:00:00",
            amount: 3493774,
            beneficiary: "Didier Aney",
            account: "+225 07 77 40 41 36",
            status: "declined"
        },
        {
            id: "6",
            transactionId: "245653FS34S",
            date: "2024-04-20T11:00:00",
            amount: 3493774,
            beneficiary: "Didier Aney",
            account: "+225 07 77 40 41 36",
            status: "approved"
        },
        {
            id: "7",
            transactionId: "245653FS34S",
            date: "2024-04-20T11:00:00",
            amount: 3493774,
            beneficiary: "Didier Aney",
            account: "+225 07 77 40 41 36",
            status: "approved"
        }
    ];
    const pageCount = 2;

    const columns = React.useMemo<ColumnDef<TransactionsDataType, unknown>[]>(
        () => getColumns(lang),
        []
    )

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        searchableColumns,
        filterableColumns,
        selectedAccount,
        pSearch,
        pStatus,
        date
    })

    const id = React.useId()

    return (
        <div>
            <TDataTable
                table={table}
                columns={columns}
                selectedAccount={selectedAccount}
                pSearch={pSearch}
                setPSearch={setPSearch}
                pStatus={pStatus}
                setPStatus={setPStatus}
                date={date}
                setDate={setDate}
                lang={lang}
            />
        </div>
    );
}