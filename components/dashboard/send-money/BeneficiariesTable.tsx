"use client"

import AccountListAndTransactionsProps from "@/components/dashboard/send-money/AccountListAndTransactions";
import React, {useState, useEffect} from "react";
import { type ColumnDef } from "@tanstack/react-table"
import {
    filterableColumns,
    getColumns,
    searchableColumns
} from "@/components/dashboard/send-money/beneficiaries-table-columns";
import {useDataTable} from "@/hooks/use-data-table";
import {TDataTableBeneficiary} from "@/components/dashboard/send-money/data-table/DataTableBeneficiary";

import { DateRange } from "react-day-picker"
import { addDays, startOfYear, endOfDay, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { IBeneficiary } from '@/core/interfaces/beneficiary';
import {IUser} from "@/core/interfaces/user";

interface BeneficiariesTableProps {
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
    selectedAccount: string,
    beneficiaries: IBeneficiary[],
}

// export type BeneficiariesDataType = {
//     id: string
//     reference: string
//     firstName: string
//     lastName: string
//     createdAt: string
// }

export default function BeneficiariesTable({ searchItems, lang, selectedAccount, beneficiaries }: BeneficiariesTableProps) {

    const [pSearch, setPSearch] = useState(searchItems.search ?? '');
    const [pStatus, setPStatus] = useState(searchItems.status ?? '');
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: searchItems.from ? new Date(searchItems.from) : startOfYear(new Date()),
        to: searchItems.to ? new Date(searchItems.to) : endOfDay(new Date()),
    })

    let data: IBeneficiary[] = beneficiaries as IBeneficiary[];
    const pageCount = 2;

    const columns = React.useMemo<ColumnDef<IBeneficiary, unknown>[]>(
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
            <TDataTableBeneficiary
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
                nbItems={data.length}
            />
        </div>
    );
}