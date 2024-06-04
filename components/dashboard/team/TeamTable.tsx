"use client"

import React, {useState, useEffect} from "react";
import { type ColumnDef } from "@tanstack/react-table"
import {
    filterableColumns,
    getColumns,
    searchableColumns
} from "@/components/dashboard/team/team-table-columns";
import {useDataTable} from "@/hooks/use-data-table";
import {TDataTable} from "@/components/dashboard/team/data-table/DataTable";

import { DateRange } from "react-day-picker"
import { addDays, startOfYear, endOfDay, format } from "date-fns"
import {IUser} from '@/core/interfaces/user';
import {IUserAccount} from '@/core/interfaces/userAccount';
import {getUserAccounts} from '@/core/apis/user-account';
interface TeamTableProps {
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
    merchant: IUser,
}

export type TeamDataType = {
    id: string
    username: string
    role: string
    phone: string
    email: string
    date: string
}

export default function TeamTable({ searchItems, lang, merchant }: TeamTableProps) {

    const [isLoading, setLoading] = useState(false);
    const [userAccounts, setUserAccounts] = useState<IUserAccount[]>([]);
    const [userAccountsPagination, setUserAccountsPagination] = useState(1);
    const [pSearch, setPSearch] = useState(searchItems.search ?? '');
    const [pStatus, setPStatus] = useState(searchItems.status ?? '');
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: searchItems.from ? new Date(searchItems.from) : startOfYear(new Date()),
        to: searchItems.to ? new Date(searchItems.to) : endOfDay(new Date()),
    })

    const data = userAccounts;
    const pageCount = userAccountsPagination;

    const columns = React.useMemo<ColumnDef<IUserAccount, unknown>[]>(
        () => getColumns(lang),
        []
    )

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        searchableColumns,
        filterableColumns,
        // selectedAccount,
        pSearch,
        pStatus,
        date
    })

    const id = React.useId()

    useEffect(() => {
        setLoading(true);
        getUserAccounts(String(merchant.accessToken))
            .then(data => {
                console.log(data);
                setLoading(false);
                setUserAccounts(data);
            })
            .catch(err => {
                setLoading(false);
                setUserAccounts([]);
            });
    }, [pSearch]);

    return (
        <div>
            <TDataTable
                isLoading={isLoading}
                table={table}
                columns={columns}
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