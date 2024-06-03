"use client"

import React, {useState} from "react";
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
}

export type TeamDataType = {
    id: string
    username: string
    role: string
    phone: string
    email: string
    date: string
}

export default function TeamTable({ searchItems, lang }: TeamTableProps) {

    const [pSearch, setPSearch] = useState(searchItems.search ?? '');
    const [pStatus, setPStatus] = useState(searchItems.status ?? '');
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: searchItems.from ? new Date(searchItems.from) : startOfYear(new Date()),
        to: searchItems.to ? new Date(searchItems.to) : endOfDay(new Date()),
    })

    const data: TeamDataType[] = [
        {
            id: "1",
            username: "Didier Aney",
            role: "Administrateur",
            phone: "+225 07 77 40 41 36",
            email: "ismael.diomande225@gmail.com",
            date: "2024-04-20T11:00:00",
        },
        {
            id: "2",
            username: "Didier Aney",
            role: "Administrateur",
            phone: "+225 07 77 40 41 36",
            email: "ismael.diomande225@gmail.com",
            date: "2024-04-20T11:00:00",
        },
        {
            id: "3",
            username: "Didier Aney",
            role: "Administrateur",
            phone: "+225 07 77 40 41 36",
            email: "ismael.diomande225@gmail.com",
            date: "2024-04-20T11:00:00",
        },
    ];
    const pageCount = 2;

    const columns = React.useMemo<ColumnDef<TeamDataType, unknown>[]>(
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

    return (
        <div>
            <TDataTable
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